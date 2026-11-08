import type { Timestamp } from 'firebase/firestore'

export type Conversation = {
  id: string
  guestId: string
  status: 'open' | 'closed'
  createdAt: Timestamp | null
  updatedAt: Timestamp | null
  lastMessage: string
  lastSender: 'guest' | 'admin'
  unreadByAdmin: boolean
  unreadByGuest: boolean
}

export type ChatMessage = {
  id: string
  text: string
  sender: 'guest' | 'admin'
  createdAt: Timestamp | null
  read?: boolean
  replyTo?: string
}

export const MAX_MESSAGE_LENGTH = 2000
