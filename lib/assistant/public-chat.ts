import 'server-only'
import { createHash } from 'node:crypto'
import { FieldValue, type Firestore } from 'firebase-admin/firestore'
import { buildKnowledgeBase } from './corpus'
import { generateAssistantContent } from './gemini-server'
import { answerWithGuardrails, MAX_HISTORY } from './guardrails'
import { ASSISTANT_RATE_WINDOW_MS } from './rate-limit'
import { chatMessages } from '@/lib/chat/messages'
import type { Locale } from '@/lib/i18n/types'

export const PUBLIC_VISITOR_LIMIT = 5
export const PUBLIC_GLOBAL_LIMIT = 30
const PROCESSING_TIMEOUT_MS = 5 * 60 * 1000

type RequestMode = 'assistant' | 'human'
type Result = { status: 'complete' | 'processing' | 'not-found'; remaining?: number }

function recentRequests(value: unknown, now: number): number[] {
  if (!Array.isArray(value) || value.some((time) => !Number.isSafeInteger(time))) {
    throw new Error('Invalid public assistant rate limit data.')
  }
  return value.filter((time: number) => time > now - ASSISTANT_RATE_WINDOW_MS)
}

export async function processPublicChat(
  db: Firestore,
  uid: string,
  conversationId: string,
  messageId: string,
  locale: Locale,
  mode: RequestMode,
): Promise<Result> {
  const conversation = db.collection('conversations').doc(conversationId)
  const message = conversation.collection('messages').doc(messageId)
  const response = conversation.collection('messages').doc()
  const hash = createHash('sha256').update(uid).digest('hex')
  const visitorLimit = db.collection('_assistant_rate_limits').doc(`public-${hash}`)
  const globalLimit = db.collection('_assistant_rate_limits').doc('public-global')
  const copy = chatMessages[locale]

  const reservation = await db.runTransaction(async (transaction) => {
    const [chat, question] = await Promise.all([
      transaction.get(conversation),
      transaction.get(message),
    ])
    if (
      !chat.exists ||
      chat.get('guestId') !== uid ||
      chat.get('status') !== 'open' ||
      !question.exists ||
      question.get('sender') !== 'guest' ||
      typeof question.get('text') !== 'string' ||
      !question.get('text').trim() ||
      question.get('text').length > 2000 ||
      typeof question.get('createdAt')?.toMillis !== 'function'
    ) {
      return { status: 'not-found' as const }
    }
    if (question.get('assistantState') === 'done') return { status: 'complete' as const }
    if (question.get('assistantState') === 'processing') {
      const started = question.get('assistantStartedAt')
      if (typeof started !== 'number' || !Number.isSafeInteger(started)) {
        throw new Error('Invalid public assistant request state.')
      }
      if (Date.now() - started < PROCESSING_TIMEOUT_MS) return { status: 'processing' as const }
      transaction.update(message, { assistantState: 'done' })
      if (
        chat.get('lastSender') === 'admin' &&
        chat.get('updatedAt')?.toMillis() >= question.get('createdAt')?.toMillis()
      )
        return { status: 'complete' as const }
      transaction.create(response, {
        text: copy.aiUnavailable,
        sender: 'assistant',
        createdAt: FieldValue.serverTimestamp(),
        replyTo: messageId,
      })
      transaction.update(conversation, {
        updatedAt: FieldValue.serverTimestamp(),
        lastMessage: copy.aiUnavailable,
        lastSender: 'assistant',
        unreadByGuest: true,
        needsHuman: true,
        unreadByAdmin: true,
      })
      return { status: 'complete' as const }
    }

    if (mode === 'human') {
      transaction.update(message, { assistantState: 'done' })
      transaction.update(conversation, { needsHuman: true, unreadByAdmin: true })
      return { status: 'complete' as const }
    }

    const [visitor, global] = await Promise.all([
      transaction.get(visitorLimit),
      transaction.get(globalLimit),
    ])
    const now = Date.now()
    const visitorRequests = recentRequests(visitor.exists ? visitor.get('requests') : [], now)
    const globalRequests = recentRequests(global.exists ? global.get('requests') : [], now)
    if (
      visitorRequests.length >= PUBLIC_VISITOR_LIMIT ||
      globalRequests.length >= PUBLIC_GLOBAL_LIMIT
    ) {
      transaction.update(message, { assistantState: 'done' })
      transaction.create(response, {
        text: copy.aiLimit,
        sender: 'assistant',
        createdAt: FieldValue.serverTimestamp(),
        replyTo: messageId,
      })
      transaction.update(conversation, {
        updatedAt: FieldValue.serverTimestamp(),
        lastMessage: copy.aiLimit,
        lastSender: 'assistant',
        unreadByGuest: true,
        needsHuman: true,
        unreadByAdmin: true,
      })
      return { status: 'complete' as const, remaining: 0 }
    }
    transaction.set(visitorLimit, { requests: [...visitorRequests, now] })
    transaction.set(globalLimit, { requests: [...globalRequests, now] })
    transaction.update(message, { assistantState: 'processing', assistantStartedAt: now })
    return {
      status: 'reserved' as const,
      question: question.get('text') as string,
      questionTime: question.get('createdAt'),
      remaining: PUBLIC_VISITOR_LIMIT - visitorRequests.length - 1,
    }
  })

  if (reservation.status !== 'reserved') return reservation

  let text: string = copy.aiUnavailable
  let needsHuman = true
  let accepted = false
  let sources: { title: string; href: string; kind: string }[] = []
  try {
    const previous = await conversation
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get()
    const history = previous.docs
      .filter(
        (item) =>
          item.id !== messageId &&
          item.get('sender') === 'guest' &&
          item.get('assistantAccepted') === true &&
          item.get('createdAt')?.toMillis() < reservation.questionTime?.toMillis() &&
          typeof item.get('text') === 'string',
      )
      .slice(0, MAX_HISTORY)
      .map((item) => item.get('text') as string)
      .reverse()
    const result = await answerWithGuardrails(
      reservation.question,
      history,
      buildKnowledgeBase(),
      generateAssistantContent,
    )
    accepted = result.accepted
    if (result.outcome === 'answered' && result.text.length <= 2000) {
      text = result.text
      needsHuman = false
      sources = result.sources.map(({ title, href, kind }) => ({ title, href, kind }))
    } else if (result.outcome === 'out-of-scope') {
      text = copy.aiOutOfScope
      needsHuman = false
    } else {
      text = copy.aiUnknown
    }
  } catch (error) {
    console.error('Public assistant guardrail or provider request failed:', error)
  }

  await db.runTransaction(async (transaction) => {
    const [chat, question] = await Promise.all([
      transaction.get(conversation),
      transaction.get(message),
    ])
    if (!chat.exists || chat.get('status') !== 'open' || !question.exists) return
    if (question.get('assistantState') !== 'processing') return
    transaction.update(message, { assistantState: 'done', assistantAccepted: accepted })
    if (
      chat.get('lastSender') === 'admin' &&
      chat.get('updatedAt')?.toMillis() >= question.get('createdAt')?.toMillis()
    )
      return
    transaction.create(response, {
      text,
      sender: 'assistant',
      createdAt: FieldValue.serverTimestamp(),
      replyTo: messageId,
      ...(sources.length ? { sources } : {}),
    })
    transaction.update(conversation, {
      updatedAt: FieldValue.serverTimestamp(),
      lastMessage: text,
      lastSender: 'assistant',
      unreadByGuest: true,
      ...(needsHuman ? { needsHuman: true, unreadByAdmin: true } : {}),
    })
  })
  return { status: 'complete', remaining: reservation.remaining }
}
