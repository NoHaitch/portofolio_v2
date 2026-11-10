import { getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { buildKnowledgeBase } from '@/lib/assistant/corpus'
import { generateAssistantContent } from '@/lib/assistant/gemini-server'
import { answerWithGuardrails, MAX_HISTORY, MAX_QUESTION_LENGTH } from '@/lib/assistant/guardrails'
import { consumeAssistantRateLimit } from '@/lib/assistant/rate-limit'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const token = /^Bearer (.+)$/.exec(request.headers.get('authorization') ?? '')?.[1]
  if (!token) return Response.json({ error: 'Sign in to use the assistant.' }, { status: 401 })
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim()
  const uid = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID?.trim()
  const email = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL?.trim().toLowerCase()
  if (!projectId || !uid || !email) {
    console.error('Assistant server is missing Firebase owner configuration.')
    return Response.json({ error: 'Assistant server is not configured.' }, { status: 503 })
  }

  try {
    const app =
      getApps().find((item) => item.name === 'assistant-auth') ??
      initializeApp({ projectId }, 'assistant-auth')
    const user = await getAuth(app).verifyIdToken(token)
    if (user.uid !== uid || user.email?.toLowerCase() !== email) {
      return Response.json({ error: 'Not authorized.' }, { status: 403 })
    }
  } catch (error) {
    console.error('Assistant authentication failed:', error)
    const invalidToken =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof error.code === 'string' &&
      ['auth/argument-error', 'auth/id-token-expired', 'auth/invalid-id-token'].includes(error.code)
    if (invalidToken) {
      return Response.json(
        { error: 'Could not verify your session. Sign in again.' },
        { status: 401 },
      )
    }
    return Response.json({ error: 'Session verification is unavailable.' }, { status: 503 })
  }

  let body: unknown
  try {
    const text = await request.text()
    if (text.length > 20000)
      return Response.json({ error: 'Request is too large.' }, { status: 413 })
    body = JSON.parse(text)
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (!body || typeof body !== 'object' || !('question' in body) || !('history' in body)) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  const { question, history } = body
  if (
    typeof question !== 'string' ||
    !question.trim() ||
    question.length > MAX_QUESTION_LENGTH ||
    !Array.isArray(history) ||
    history.length > MAX_HISTORY ||
    history.some(
      (item) => typeof item !== 'string' || !item.trim() || item.length > MAX_QUESTION_LENGTH,
    )
  ) {
    return Response.json({ error: 'Invalid question or conversation history.' }, { status: 400 })
  }

  if (!process.env.GEMINI_API_KEY?.trim()) {
    console.error('Assistant server is missing GEMINI_API_KEY.')
    return Response.json({ error: 'Assistant server is missing GEMINI_API_KEY.' }, { status: 503 })
  }

  try {
    const limit = await consumeAssistantRateLimit(projectId, uid)
    if (!limit.allowed) {
      return Response.json(
        { error: 'Rate limit reached. Try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': String(limit.retryAfter), 'Cache-Control': 'no-store' },
        },
      )
    }
  } catch (error) {
    console.error('Assistant rate limit check failed:', error)
    return Response.json(
      { error: 'Assistant rate limit is unavailable. Check server Firestore credentials.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  try {
    const result = await answerWithGuardrails(
      question.trim(),
      history,
      buildKnowledgeBase(),
      generateAssistantContent,
    )
    return Response.json(result, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('Assistant guardrail or model request failed:', error)
    return Response.json(
      { error: 'The assistant could not safely complete this request. Please try again.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
