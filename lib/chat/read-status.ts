import type { ChatMessage } from './types'

export function unreadIncomingMessages(messages: ChatMessage[], role: 'guest' | 'admin') {
  return messages.filter(
    (message) => message.sender !== role && message.read !== true && message.createdAt,
  )
}
