import type { ChatMessage } from './types'

export function unreadIncomingMessages(messages: ChatMessage[], role: 'guest' | 'admin') {
  return messages.filter(
    (message) =>
      (role === 'admin' ? message.sender === 'guest' : message.sender === 'admin') &&
      message.read !== true &&
      message.createdAt,
  )
}
