import { beforeEach, describe, expect, it, vi } from 'vitest'

const { verifyIdToken, model, consumeRateLimit } = vi.hoisted(() => ({
  verifyIdToken: vi.fn(),
  model: vi.fn(),
  consumeRateLimit: vi.fn(),
}))

vi.mock('firebase-admin/app', () => ({
  getApps: () => [{ name: 'assistant-auth' }],
  initializeApp: vi.fn(),
}))
vi.mock('firebase-admin/auth', () => ({ getAuth: () => ({ verifyIdToken }) }))
vi.mock('@/lib/assistant/gemini-server', () => ({ generateAssistantContent: model }))
vi.mock('@/lib/assistant/rate-limit', () => ({ consumeAssistantRateLimit: consumeRateLimit }))

import { POST } from '@/app/api/admin/assistant/route'

function request(body: unknown, token?: string) {
  return new Request('http://localhost/api/admin/assistant', {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: JSON.stringify(body),
  })
}

describe('admin assistant route', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'test-project')
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_ADMIN_UID', 'owner')
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL', 'owner@example.test')
    vi.stubEnv('GEMINI_API_KEY', 'test-key')
    verifyIdToken.mockReset()
    model.mockReset()
    consumeRateLimit.mockReset()
    consumeRateLimit.mockResolvedValue({ allowed: true })
  })

  it('rejects unauthenticated and non-owner callers before any model calls', async () => {
    expect((await POST(request({ question: 'Who is Francisco?', history: [] }))).status).toBe(401)
    verifyIdToken.mockResolvedValue({ uid: 'other', email: 'owner@example.test' })
    expect(
      (await POST(request({ question: 'Who is Francisco?', history: [] }, 'token'))).status,
    ).toBe(403)
    expect(model).not.toHaveBeenCalled()
  })

  it('rejects invalid conversation input before any model calls', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner', email: 'owner@example.test' })
    const response = await POST(request({ question: 'hi', history: ['a', 'b', 'c', 'd'] }, 'token'))
    expect(response.status).toBe(400)
    expect(model).not.toHaveBeenCalled()
  })

  it('returns a refusal without generating an answer for an off-topic request', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner', email: 'owner@example.test' })
    model.mockResolvedValue('{"allowed":false,"retrievalQuery":""}')
    const response = await POST(
      request({ question: 'Write a Python script', history: [] }, 'token'),
    )
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ accepted: false, sources: [] })
    expect(model).toHaveBeenCalledTimes(1)
  })

  it('returns a verified answer with server-retrieved sources for the owner', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner', email: 'owner@example.test' })
    model
      .mockResolvedValueOnce('{"allowed":true,"retrievalQuery":"favorite food carbonara"}')
      .mockResolvedValueOnce('{"relevant":true}')
      .mockResolvedValueOnce('His current favorite food is carbonara. [1]')
      .mockResolvedValueOnce('{"approved":true}')
    const response = await POST(
      request({ question: 'What is his favorite food?', history: [] }, 'token'),
    )
    expect(response.status).toBe(200)
    const result = await response.json()
    expect(result.text).toBe('His current favorite food is carbonara. [1]')
    expect(result.sources[0].text).toContain('carbonara')
    expect(model).toHaveBeenCalledTimes(4)
  })

  it('does not return an unchecked answer when a guard fails', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner', email: 'owner@example.test' })
    model.mockResolvedValue('invalid json')
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await POST(request({ question: 'Who is Francisco?', history: [] }, 'token'))
    expect(response.status).toBe(502)
    expect(await response.json()).not.toHaveProperty('text')
    log.mockRestore()
  })

  it('reports a missing server key without calling the model', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner', email: 'owner@example.test' })
    vi.stubEnv('GEMINI_API_KEY', '')
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await POST(request({ question: 'Who is Francisco?', history: [] }, 'token'))
    expect(response.status).toBe(503)
    expect(await response.json()).toEqual({ error: 'Assistant server is missing GEMINI_API_KEY.' })
    expect(model).not.toHaveBeenCalled()
    log.mockRestore()
  })

  it('rejects a rate-limited request before the model call', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner', email: 'owner@example.test' })
    consumeRateLimit.mockResolvedValue({ allowed: false, retryAfter: 240 })
    const response = await POST(request({ question: 'Who is Francisco?', history: [] }, 'token'))
    expect(response.status).toBe(429)
    expect(response.headers.get('Retry-After')).toBe('240')
    expect(model).not.toHaveBeenCalled()
  })

  it('fails closed if the rate limit store is unavailable', async () => {
    verifyIdToken.mockResolvedValue({ uid: 'owner', email: 'owner@example.test' })
    consumeRateLimit.mockRejectedValue(new Error('database unavailable'))
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const response = await POST(request({ question: 'Who is Francisco?', history: [] }, 'token'))
    expect(response.status).toBe(503)
    expect(model).not.toHaveBeenCalled()
    log.mockRestore()
  })
})
