import 'server-only'
import { createHash } from 'node:crypto'
import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export const ASSISTANT_RATE_LIMIT = 10
export const ASSISTANT_RATE_WINDOW_MS = 60 * 60 * 1000

export async function consumeAssistantRateLimit(projectId: string, uid: string) {
  let app = getApps().find((item) => item.name === 'assistant-rate-limit')
  if (!app) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON?.trim()
    let credential
    if (raw) {
      const account: unknown = JSON.parse(raw)
      if (!account || typeof account !== 'object' || Array.isArray(account)) {
        throw new Error('Invalid Firebase service account JSON.')
      }
      const fields = account as Record<string, unknown>
      const accountProject = fields.project_id ?? fields.projectId
      const clientEmail = fields.client_email ?? fields.clientEmail
      const privateKey = fields.private_key ?? fields.privateKey
      if (
        typeof accountProject !== 'string' ||
        typeof clientEmail !== 'string' ||
        typeof privateKey !== 'string'
      ) {
        throw new Error('Firebase service account is missing required fields.')
      }
      if (accountProject !== projectId) {
        throw new Error('Firebase service account project does not match the configured project.')
      }
      credential = cert({ projectId: accountProject, clientEmail, privateKey })
    }
    app = initializeApp(
      { projectId, ...(credential ? { credential } : {}) },
      'assistant-rate-limit',
    )
  }

  const db = getFirestore(app)
  const id = createHash('sha256').update(uid).digest('hex')
  const ref = db.collection('_assistant_rate_limits').doc(id)
  return db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(ref)
    const stored: unknown = snapshot.exists ? snapshot.get('requests') : []
    if (!Array.isArray(stored) || stored.some((value) => !Number.isSafeInteger(value))) {
      throw new Error('Invalid assistant rate limit data.')
    }
    const now = Date.now()
    const recent: number[] = stored.filter((time: number) => time > now - ASSISTANT_RATE_WINDOW_MS)
    if (recent.length >= ASSISTANT_RATE_LIMIT) {
      const retryAfter = Math.max(
        1,
        Math.ceil((Math.min(...recent) + ASSISTANT_RATE_WINDOW_MS - now) / 1000),
      )
      return { allowed: false as const, retryAfter }
    }
    transaction.set(ref, { requests: [...recent, now] })
    return { allowed: true as const }
  })
}
