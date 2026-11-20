import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  verify: vi.fn(),
  firestore: vi.fn(),
  transactionGet: vi.fn(),
  transactionUpdate: vi.fn(),
  snapshotExists: true,
  conversationData: {} as Record<string, unknown>,
}))

vi.mock('firebase-admin/app', () => ({
  getApps: () => [{ name: 'assistant-auth' }],
  initializeApp: vi.fn(),
}))
vi.mock('firebase-admin/auth', () => ({ getAuth: () => ({ verifyIdToken: mocks.verify }) }))
vi.mock('firebase-admin/firestore', () => ({
  FieldValue: { serverTimestamp: () => 'server-time' },
}))
vi.mock('@/lib/assistant/rate-limit', () => ({ getAssistantFirestore: mocks.firestore }))

import { POST } from '@/app/api/chat/close/route'

const conversationId = 'A'.repeat(20)

function request(body: unknown, token = 'token') {
  return new Request('http://localhost/api/chat/close', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(body),
  })
}

describe('chat close route', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'test-project')
    mocks.verify.mockReset()
    mocks.firestore.mockReset()
    mocks.transactionGet.mockReset()
    mocks.transactionUpdate.mockReset()
    mocks.snapshotExists = true
    mocks.conversationData = { guestId: 'guest', status: 'open' }
    mocks.verify.mockResolvedValue({
      uid: 'guest',
      firebase: { sign_in_provider: 'anonymous' },
    })
    mocks.transactionGet.mockImplementation(async () => ({
      exists: mocks.snapshotExists,
      get: (field: string) => mocks.conversationData[field],
    }))
    mocks.firestore.mockReturnValue({
      collection: () => ({ doc: () => ({ id: conversationId }) }),
      runTransaction: async (callback: (transaction: object) => Promise<unknown>) =>
        callback({
          get: mocks.transactionGet,
          update: mocks.transactionUpdate,
        }),
    })
  })

  it('rejects missing credentials, malformed IDs, and non-anonymous users', async () => {
    expect((await POST(request({ conversationId }, ''))).status).toBe(401)
    expect((await POST(request({ conversationId: '../other' }))).status).toBe(400)
    mocks.verify.mockResolvedValue({
      uid: 'owner',
      firebase: { sign_in_provider: 'password' },
    })
    expect((await POST(request({ conversationId }))).status).toBe(403)
    expect(mocks.firestore).not.toHaveBeenCalled()
  })

  it('closes only the authenticated guest’s open conversation', async () => {
    const response = await POST(request({ conversationId }))

    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(await response.json()).toEqual({ status: 'closed' })
    expect(mocks.transactionUpdate).toHaveBeenCalledWith(
      { id: conversationId },
      { status: 'closed', updatedAt: 'server-time' },
    )
  })

  it('does not reveal or modify another guest’s conversation', async () => {
    mocks.conversationData.guestId = 'another-guest'

    const response = await POST(request({ conversationId }))

    expect(response.status).toBe(404)
    expect(mocks.transactionUpdate).not.toHaveBeenCalled()
  })

  it('treats an already closed conversation as a successful retry', async () => {
    mocks.conversationData.status = 'closed'

    const response = await POST(request({ conversationId }))

    expect(response.status).toBe(200)
    expect(mocks.transactionUpdate).not.toHaveBeenCalled()
  })

  it('fails closed when the server Firestore is unavailable', async () => {
    mocks.firestore.mockImplementation(() => {
      throw new Error('database unavailable')
    })
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect((await POST(request({ conversationId }))).status).toBe(503)

    log.mockRestore()
  })
})
