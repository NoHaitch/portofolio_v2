import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { Timestamp } from 'firebase/firestore'
import { describe, expect, it, vi } from 'vitest'
import { MessageThread, ReplyPreview, type ThreadLabels } from '@/components/chat/message-thread'
import { groupMessages } from '@/lib/chat/group-messages'
import { getReplyPreview, MAX_REPLY_PREVIEW_LENGTH } from '@/lib/chat/reply-preview'
import { matchesConversationSearch } from '@/lib/chat/search'
import type { ChatMessage } from '@/lib/chat/types'

const labels: ThreadLabels = {
  you: 'You',
  other: 'Visitor',
  read: 'Read',
  unread: 'Unread',
  reply: 'Reply',
  replyingTo: 'Replying to',
  cancelReply: 'Cancel reply',
  unavailable: 'Message unavailable',
  sending: 'Sending',
  assistant: 'AI assistant',
}

function message(id: string, sender: 'admin' | 'guest', seconds: number): ChatMessage {
  return { id, sender, text: id, createdAt: new Timestamp(seconds, 0) }
}

describe('chat message grouping', () => {
  it('groups the same sender within five minutes and separates later messages and other senders', () => {
    const messages = [
      message('one', 'admin', 100),
      message('two', 'admin', 400),
      message('three', 'admin', 701),
      message('four', 'guest', 702),
    ]
    expect(groupMessages(messages).map((group) => group.map((item) => item.id))).toEqual([
      ['one', 'two'],
      ['three'],
      ['four'],
    ])
  })

  describe('reply previews', () => {
    it('limits previews to 100 Unicode characters including the ellipsis', () => {
      expect(getReplyPreview('a'.repeat(100))).toBe('a'.repeat(100))
      expect(getReplyPreview('😀'.repeat(101))).toBe(`${'😀'.repeat(99)}…`)
      expect(Array.from(getReplyPreview('a'.repeat(101)))).toHaveLength(MAX_REPLY_PREVIEW_LENGTH)
    })

    it('normalizes whitespace in quoted text', () => {
      expect(getReplyPreview('  First\n\n second\tline ')).toBe('First second line')
    })

    it('shortens the quote in the thread and composer without changing the message', () => {
      const text = 'X'.repeat(150)
      const original = { ...message('original', 'guest', 100), text }
      const reply = { ...message('reply', 'admin', 200), replyTo: original.id }
      const thread = renderToStaticMarkup(
        createElement(MessageThread, {
          messages: [original, reply],
          role: 'admin',
          locale: 'en',
          labels,
          canReply: true,
          onReply: vi.fn(),
        }),
      )
      const preview = renderToStaticMarkup(
        createElement(ReplyPreview, {
          message: original,
          role: 'admin',
          labels,
          onCancel: vi.fn(),
        }),
      )
      expect(thread).toContain(text)
      expect(thread).toContain(`${'X'.repeat(99)}…`)
      expect(preview).toContain(`${'X'.repeat(99)}…`)
      expect(preview).not.toContain(text)
    })
  })

  describe('conversation search', () => {
    it('matches visitor codes and message content case-insensitively', () => {
      expect(
        matchesConversationSearch({ code: 'Ab12cd', lastMessage: 'latest', term: 'B12' }),
      ).toBe(true)
      expect(
        matchesConversationSearch({
          code: 'Ab12cd',
          lastMessage: 'latest',
          messages: [message('Secret phrase', 'guest', 100)],
          term: 'SECRET',
        }),
      ).toBe(true)
      expect(
        matchesConversationSearch({ code: 'Ab12cd', lastMessage: 'latest', term: 'missing' }),
      ).toBe(false)
    })
  })

  it('does not group pending or out-of-order messages', () => {
    const messages = [
      message('one', 'admin', 100),
      { ...message('pending', 'admin', 100), createdAt: null },
      message('old', 'admin', 99),
    ]
    expect(groupMessages(messages)).toHaveLength(3)
  })

  it('renders timestamps, one label and receipt per group, and reply context', () => {
    const messages = [
      message('original', 'guest', 100),
      { ...message('first reply', 'admin', 200), replyTo: 'original' },
      { ...message('second reply', 'admin', 250), read: true },
    ]
    const markup = renderToStaticMarkup(
      createElement(MessageThread, {
        messages,
        role: 'admin',
        locale: 'en',
        labels,
        canReply: true,
        onReply: vi.fn(),
      }),
    )
    expect(markup.match(/datetime=/gi)).toHaveLength(4)
    expect(markup.match(/>You<\/p>/g)).toHaveLength(1)
    expect(markup.match(/>Read<\/p>/g)).toHaveLength(1)
    expect(markup).toContain('>original</p>')
    expect(markup).toContain('aria-label="Reply: original"')
  })

  it('identifies AI messages and renders compact source links without a human read receipt', () => {
    const ai: ChatMessage = {
      id: 'ai',
      sender: 'assistant',
      text: 'Francisco builds software. [1]',
      createdAt: new Timestamp(200, 0),
      sources: [{ title: 'Profile', href: '/about', kind: 'profile' }],
    }
    const markup = renderToStaticMarkup(
      createElement(MessageThread, {
        messages: [ai],
        role: 'guest',
        locale: 'en',
        labels,
        canReply: true,
        onReply: vi.fn(),
      }),
    )
    expect(markup).toContain('AI assistant')
    expect(markup).toContain('href="/about"')
    expect(markup).toContain('aria-label="View source: Profile"')
    expect(markup).toContain('lucide-external-link')
    expect(markup).not.toContain('>Unread</p>')
    expect(markup).not.toContain('>[1]<')
  })
})
