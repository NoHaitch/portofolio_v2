import type { Timestamp } from 'firebase/firestore'

export type Conversation = {
  id: string
  guestId: string
  status: 'open' | 'closed'
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
  lastMessage: string
  lastSender: 'guest' | 'admin' | 'assistant'
  unreadByAdmin: boolean
  unreadByGuest: boolean
  needsHuman?: boolean
}

export type ChatMessage = {
  id: string
  text: string
  sender: 'guest' | 'admin' | 'assistant'
  createdAt: Timestamp | null
  read?: boolean
  replyTo?: string
  sources?: { title: string; href: string; kind: string }[]
  assistantState?: 'processing' | 'done'
}

export const MAX_MESSAGE_LENGTH = 2000
