import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Timestamp, type Firestore } from 'firebase/firestore'
import type { ChatMessage, Conversation } from '@/lib/chat/types'

const mocks = vi.hoisted(() => ({
  updates: [] as { path: string; data: object }[],
  commits: 0,
  current: {} as Record<string, unknown> | null,
  transactionUpdates: [] as object[],
  sets: [] as { path: string; data: object }[],
}))

vi.mock('firebase/firestore', async (importOriginal) => ({
  ...(await importOriginal<typeof import('firebase/firestore')>()),
  doc: (_db: unknown, ...parts: string[]) => parts.join('/'),
  collection: (...parts: string[]) => parts.join('/'),
  serverTimestamp: () => 'server-time',
  writeBatch: () => ({
    update: (path: string, data: object) => mocks.updates.push({ path, data }),
    set: (path: string, data: object) => mocks.sets.push({ path, data }),
    commit: async () => {
      mocks.commits += 1
    },
  }),
  runTransaction: async (_db: unknown, callback: (transaction: object) => Promise<void>) =>
    callback({
      get: async () => ({ exists: () => mocks.current !== null, data: () => mocks.current }),
      update: (_ref: unknown, data: object) => mocks.transactionUpdates.push(data),
    }),
}))

import { markMessagesRead, sendMessage } from '@/lib/chat/firebase'

describe('marking chat messages read', () => {
  const timestamp = new Timestamp(100, 0)
  const chat: Conversation = {
    id: 'chat',
    guestId: 'guest',
    status: 'open',
    createdAt: timestamp,
    updatedAt: timestamp,
    lastMessage: 'reply',
    lastSender: 'admin',
    unreadByGuest: true,
    unreadByAdmin: false,
  }
  const db = {} as Firestore
  const message = (id: string, sender: 'admin' | 'guest'): ChatMessage => ({
    id,
    sender,
    text: 'message',
    createdAt: timestamp,
  })

  beforeEach(() => {
    mocks.updates = []
    mocks.sets = []
    mocks.commits = 0
    mocks.transactionUpdates = []
    mocks.current = { updatedAt: timestamp, unreadByGuest: true, unreadByAdmin: false }
  })

  it('only marks the recipient’s incoming messages and clears the matching unread flag', async () => {
    await markMessagesRead(db, chat, [message('one', 'guest'), message('two', 'admin')], 'guest')
    expect(mocks.updates).toEqual([
      { path: 'conversations/chat/messages/two', data: { read: true } },
    ])
    expect(mocks.transactionUpdates).toEqual([{ unreadByGuest: false }])
  })

  it('does not clear a newer unread conversation update', async () => {
    mocks.current = { updatedAt: { isEqual: () => false }, unreadByGuest: true }
    await markMessagesRead(db, chat, [message('two', 'admin')], 'guest')
    expect(mocks.transactionUpdates).toEqual([])
  })

  it('does not clear unread when the message snapshot has not caught up', async () => {
    const older = new Timestamp(99, 0)
    await markMessagesRead(db, chat, [{ ...message('older', 'admin'), createdAt: older }], 'guest')
    expect(mocks.transactionUpdates).toEqual([])
  })

  it('marks guest messages read for the admin', async () => {
    mocks.current = { updatedAt: timestamp, unreadByGuest: false, unreadByAdmin: true }
    await markMessagesRead(db, { ...chat, unreadByAdmin: true }, [message('one', 'guest')], 'admin')
    expect(mocks.updates).toEqual([
      { path: 'conversations/chat/messages/one', data: { read: true } },
    ])
    expect(mocks.transactionUpdates).toEqual([{ unreadByAdmin: false }])
  })

  it('splits large receipt updates into batches', async () => {
    await markMessagesRead(
      db,
      chat,
      Array.from({ length: 401 }, (_, i) => message(`${i}`, 'admin')),
      'guest',
    )
    expect(mocks.updates).toHaveLength(401)
    expect(mocks.commits).toBe(2)
  })

  it('sends a reply reference without changing the message summary', async () => {
    await sendMessage(db, 'chat', 'guest', 'admin', ' response ', false, 'target')
    expect(mocks.updates[0].data).toMatchObject({ lastMessage: 'response', lastSender: 'admin' })
    expect(mocks.sets[0].data).toMatchObject({
      text: 'response',
      sender: 'admin',
      replyTo: 'target',
    })
  })

  it('rejects replies when starting a new conversation', async () => {
    await expect(
      sendMessage(db, 'chat', 'guest', 'guest', 'hello', true, 'target'),
    ).rejects.toThrow()
    expect(mocks.commits).toBe(0)
  })
})
