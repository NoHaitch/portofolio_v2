import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({ verify: vi.fn(), process: vi.fn(), firestore: vi.fn() }))
vi.mock('firebase-admin/app', () => ({
  getApps: () => [{ name: 'assistant-auth' }],
  initializeApp: vi.fn(),
}))
vi.mock('firebase-admin/auth', () => ({ getAuth: () => ({ verifyIdToken: mocks.verify }) }))
vi.mock('@/lib/assistant/rate-limit', () => ({ getAssistantFirestore: mocks.firestore }))
vi.mock('@/lib/assistant/public-chat', () => ({ processPublicChat: mocks.process }))

import { POST } from '@/app/api/chat/assistant/route'

const body = {
  conversationId: 'A'.repeat(20),
  messageId: 'B'.repeat(20),
  locale: 'en',
  mode: 'assistant',
}
function request(payload: unknown, token = 'token') {
  return new Request('http://localhost/api/chat/assistant', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(payload),
  })
}

describe('public assistant route', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'test')
    mocks.verify.mockReset()
    mocks.process.mockReset()
    mocks.firestore.mockReset()
    mocks.firestore.mockReturnValue({})
    mocks.verify.mockResolvedValue({ uid: 'guest', firebase: { sign_in_provider: 'anonymous' } })
    mocks.process.mockResolvedValue({ status: 'complete', remaining: 4 })
  })

  it('rejects missing credentials, malformed IDs and non-anonymous users', async () => {
    expect((await POST(request(body, ''))).status).toBe(401)
    expect((await POST(request({ ...body, messageId: '../other' }))).status).toBe(400)
    mocks.verify.mockResolvedValue({ uid: 'owner', firebase: { sign_in_provider: 'password' } })
    expect((await POST(request(body))).status).toBe(403)
    expect(mocks.process).not.toHaveBeenCalled()
  })

  it('passes only verified identity and persisted message identifiers to the workflow', async () => {
    const response = await POST(request(body))
    expect(response.status).toBe(200)
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(mocks.process).toHaveBeenCalledWith(
      {},
      'guest',
      body.conversationId,
      body.messageId,
      'en',
      'assistant',
    )
  })

  it('reports ownership failures and fails closed on store errors', async () => {
    mocks.process.mockResolvedValueOnce({ status: 'not-found' })
    expect((await POST(request(body))).status).toBe(404)
    mocks.process.mockRejectedValueOnce(new Error('database unavailable'))
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect((await POST(request(body))).status).toBe(503)
    log.mockRestore()
  })
})
