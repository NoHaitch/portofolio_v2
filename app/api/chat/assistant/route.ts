import { getAuth } from 'firebase-admin/auth'
import { getApps, initializeApp } from 'firebase-admin/app'
import { getAssistantFirestore } from '@/lib/assistant/rate-limit'
import { processPublicChat } from '@/lib/assistant/public-chat'
import { isLocale } from '@/lib/i18n/shared'

export const runtime = 'nodejs'
export const maxDuration = 300

export async function POST(request: Request) {
  const token = /^Bearer (.+)$/.exec(request.headers.get('authorization') ?? '')?.[1]
  if (!token) return Response.json({ error: 'Authentication required.' }, { status: 401 })
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim()
  if (!projectId) {
    console.error('Public assistant is missing Firebase project configuration.')
    return Response.json({ error: 'Assistant unavailable.' }, { status: 503 })
  }

  let body: unknown
  try {
    const raw = await request.text()
    if (raw.length > 1024) return Response.json({ error: 'Request too large.' }, { status: 413 })
    body = JSON.parse(raw)
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }
  if (
    !body ||
    typeof body !== 'object' ||
    !('conversationId' in body) ||
    !('messageId' in body) ||
    !('locale' in body) ||
    !('mode' in body) ||
    typeof body.conversationId !== 'string' ||
    !/^[a-zA-Z0-9]{20}$/.test(body.conversationId) ||
    typeof body.messageId !== 'string' ||
    !/^[a-zA-Z0-9]{20}$/.test(body.messageId) ||
    typeof body.locale !== 'string' ||
    !isLocale(body.locale) ||
    (body.mode !== 'assistant' && body.mode !== 'human')
  ) {
    return Response.json({ error: 'Invalid request.' }, { status: 400 })
  }

  let uid: string
  try {
    const app =
      getApps().find((item) => item.name === 'assistant-auth') ??
      initializeApp({ projectId }, 'assistant-auth')
    const user = await getAuth(app).verifyIdToken(token)
    if (user.firebase.sign_in_provider !== 'anonymous') {
      return Response.json({ error: 'Not authorized.' }, { status: 403 })
    }
    uid = user.uid
  } catch (error) {
    console.error('Public assistant authentication failed:', error)
    const invalid =
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      typeof error.code === 'string' &&
      ['auth/argument-error', 'auth/id-token-expired', 'auth/invalid-id-token'].includes(error.code)
    return Response.json(
      { error: invalid ? 'Invalid session.' : 'Session verification unavailable.' },
      { status: invalid ? 401 : 503 },
    )
  }
  try {
    const db = getAssistantFirestore(projectId)
    const result = await processPublicChat(
      db,
      uid,
      body.conversationId,
      body.messageId,
      body.locale,
      body.mode,
    )
    return Response.json(result, {
      status: result.status === 'not-found' ? 404 : result.status === 'processing' ? 202 : 200,
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    console.error('Public assistant request failed:', error)
    return Response.json(
      { error: 'Assistant unavailable.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
