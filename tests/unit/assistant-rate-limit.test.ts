import { beforeEach, describe, expect, it, vi } from 'vitest'

const state = vi.hoisted(() => ({ requests: [] as number[], exists: false }))
vi.mock('server-only', () => ({}))
vi.mock('firebase-admin/app', () => ({
  getApps: () => [{ name: 'assistant-rate-limit' }],
  initializeApp: vi.fn(),
  cert: vi.fn(),
}))
vi.mock('firebase-admin/firestore', () => ({
  getFirestore: () => ({
    collection: () => ({ doc: () => ({}) }),
    runTransaction: async (callback: (transaction: unknown) => Promise<unknown>) =>
      callback({
        get: async () => ({ exists: state.exists, get: () => state.requests }),
        set: (_ref: unknown, data: { requests: number[] }) => {
          state.requests = data.requests
          state.exists = true
        },
      }),
  }),
}))

import { ASSISTANT_RATE_WINDOW_MS, consumeAssistantRateLimit } from '@/lib/assistant/rate-limit'

describe('assistant rate limit', () => {
  beforeEach(() => {
    state.requests = []
    state.exists = false
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
  })

  it('allows ten requests, blocks the eleventh, and expires the rolling window', async () => {
    for (let i = 0; i < 10; i++) {
      expect(await consumeAssistantRateLimit('test', 'owner')).toEqual({ allowed: true })
    }
    expect(await consumeAssistantRateLimit('test', 'owner')).toEqual({
      allowed: false,
      retryAfter: 3600,
    })
    vi.advanceTimersByTime(ASSISTANT_RATE_WINDOW_MS)
    expect(await consumeAssistantRateLimit('test', 'owner')).toEqual({ allowed: true })
    expect(state.requests).toHaveLength(1)
    vi.useRealTimers()
  })
})
