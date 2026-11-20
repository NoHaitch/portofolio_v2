import { getApps, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { FieldValue } from 'firebase-admin/firestore'
import { getAssistantFirestore } from '@/lib/assistant/rate-limit'

export const runtime = 'nodejs'

const responseHeaders = { 'Cache-Control': 'no-store' }

function json(body: object, status: number) {
  return Response.json(body, { status, headers: responseHeaders })
}

function isInvalidToken(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string' &&
    ['auth/argument-error', 'auth/id-token-expired', 'auth/invalid-id-token'].includes(error.code)
  )
}

export async function POST(request: Request) {
  const token = /^Bearer (.+)$/.exec(request.headers.get('authorization') ?? '')?.[1]
  if (!token) return json({ error: 'Authentication required.' }, 401)

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim()
  if (!projectId) {
    console.error('Chat close route is missing Firebase project configuration.')
    return json({ error: 'Chat close is unavailable.' }, 503)
  }

  let body: unknown
  try {
    const raw = await request.text()
    if (raw.length > 1024) return json({ error: 'Request too large.' }, 413)
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }
  if (
    !body ||
    typeof body !== 'object' ||
    !('conversationId' in body) ||
    typeof body.conversationId !== 'string' ||
    !/^[a-zA-Z0-9]{20}$/.test(body.conversationId)
  ) {
    return json({ error: 'Invalid request.' }, 400)
  }

  let uid: string
  try {
    const app =
      getApps().find((item) => item.name === 'assistant-auth') ??
      initializeApp({ projectId }, 'assistant-auth')
    const user = await getAuth(app).verifyIdToken(token)
    if (user.firebase.sign_in_provider !== 'anonymous') {
      return json({ error: 'Not authorized.' }, 403)
    }
    uid = user.uid
  } catch (error) {
    if (!isInvalidToken(error)) {
      console.error('Chat close authentication failed:', error)
    }
    return json(
      { error: isInvalidToken(error) ? 'Invalid session.' : 'Session verification unavailable.' },
      isInvalidToken(error) ? 401 : 503,
    )
  }

  try {
    const db = getAssistantFirestore(projectId)
    const conversation = db.collection('conversations').doc(body.conversationId)
    const result = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(conversation)
      if (!snapshot.exists || snapshot.get('guestId') !== uid) return 'not-found'
      if (snapshot.get('status') === 'closed') return 'closed'
      if (snapshot.get('status') !== 'open') return 'not-found'

      transaction.update(conversation, {
        status: 'closed',
        updatedAt: FieldValue.serverTimestamp(),
      })
      return 'closed'
    })
    return json({ status: result }, result === 'not-found' ? 404 : 200)
  } catch (error) {
    console.error('Could not close guest conversation:', error)
    return json({ error: 'Chat close is unavailable.' }, 503)
  }
}
