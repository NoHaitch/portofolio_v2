import { describe, expect, it } from 'vitest'
import { validateMessage } from '@/lib/chat/firebase'
import { MAX_MESSAGE_LENGTH } from '@/lib/chat/types'
import type { ChatMessage } from '@/lib/chat/types'
import { unreadIncomingMessages } from '@/lib/chat/read-status'
import { Timestamp } from 'firebase/firestore'

describe('chat message validation', () => {
  it('trims a message before sending', () => {
    expect(validateMessage('  Hello there  ')).toBe('Hello there')
  })

  describe('read receipts', () => {
    const messages: ChatMessage[] = [
      { id: 'guest', sender: 'guest', text: 'hello', createdAt: Timestamp.now() },
      { id: 'admin', sender: 'admin', text: 'reply', createdAt: Timestamp.now() },
      { id: 'read', sender: 'admin', text: 'seen', createdAt: Timestamp.now(), read: true },
      { id: 'pending', sender: 'admin', text: 'pending', createdAt: null },
      { id: 'assistant', sender: 'assistant', text: 'AI reply', createdAt: Timestamp.now() },
    ]

    it('only marks confirmed incoming unread messages for the recipient', () => {
      expect(unreadIncomingMessages(messages, 'guest').map((message) => message.id)).toEqual([
        'admin',
      ])
      expect(unreadIncomingMessages(messages, 'admin').map((message) => message.id)).toEqual([
        'guest',
      ])
    })
  })

  it('rejects empty and whitespace-only messages', () => {
    expect(() => validateMessage('')).toThrow()
    expect(() => validateMessage(' \n ')).toThrow()
  })

  it('accepts the maximum length and rejects longer messages', () => {
    expect(validateMessage('a'.repeat(MAX_MESSAGE_LENGTH))).toHaveLength(MAX_MESSAGE_LENGTH)
    expect(() => validateMessage('a'.repeat(MAX_MESSAGE_LENGTH + 1))).toThrow()
  })
})
