'use client'

import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  writeBatch,
  type Firestore,
} from 'firebase/firestore'
import { MAX_MESSAGE_LENGTH, type ChatMessage, type Conversation } from './types'
import { unreadIncomingMessages } from './read-status'

export function validateMessage(text: string) {
  const trimmed = text.trim()
  if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) {
    throw new Error(`Messages must be between 1 and ${MAX_MESSAGE_LENGTH} characters.`)
  }
  return trimmed
}

export async function sendMessage(
  db: Firestore,
  id: string,
  guestId: string,
  sender: 'guest' | 'admin',
  text: string,
  isNew = false,
  replyTo?: string,
  clearHumanRequest = false,
) {
  const message = validateMessage(text)
  if (isNew && replyTo) throw new Error('A new conversation cannot reply to a message.')
  const conversation = doc(db, 'conversations', id)
  const batch = writeBatch(db)
  const summary = {
    updatedAt: serverTimestamp(),
    lastMessage: message,
    lastSender: sender,
    ...(sender === 'guest'
      ? { unreadByAdmin: true }
      : { unreadByGuest: true, ...(clearHumanRequest ? { needsHuman: false } : {}) }),
  }
  if (isNew) {
    if (sender !== 'guest') throw new Error('Only visitors can start a conversation.')
    batch.set(conversation, {
      ...summary,
      guestId,
      status: 'open',
      createdAt: serverTimestamp(),
      unreadByGuest: false,
    })
  } else {
    batch.update(conversation, summary)
  }
  const messageRef = doc(collection(conversation, 'messages'))
  batch.set(messageRef, {
    text: message,
    sender,
    createdAt: serverTimestamp(),
    ...(replyTo ? { replyTo } : {}),
  })
  await batch.commit()
  return messageRef.id
}

export async function markRead(db: Firestore, chat: Conversation, role: 'guest' | 'admin') {
  if (!chat.updatedAt) return
  const ref = doc(db, 'conversations', chat.id)
  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(ref)
    if (!snapshot.exists()) return
    const current = snapshot.data()
    if (!current.updatedAt?.isEqual(chat.updatedAt)) return
    if (role === 'admin' && current.unreadByAdmin) {
      transaction.update(ref, { unreadByAdmin: false })
    } else if (role === 'guest' && current.unreadByGuest) {
      transaction.update(ref, { unreadByGuest: false })
    }
  })
}

export async function markMessagesRead(
  db: Firestore,
  chat: Conversation,
  messages: ChatMessage[],
  role: 'guest' | 'admin',
) {
  const unread = unreadIncomingMessages(messages, role)
  for (let index = 0; index < unread.length; index += 400) {
    const batch = writeBatch(db)
    for (const message of unread.slice(index, index + 400)) {
      batch.update(doc(db, 'conversations', chat.id, 'messages', message.id), { read: true })
    }
    await batch.commit()
  }

  const latest = messages[messages.length - 1]
  if (latest?.createdAt && chat.updatedAt?.isEqual(latest.createdAt)) {
    await markRead(db, chat, role)
  }
}

export async function deleteConversation(db: Firestore, id: string) {
  const conversation = doc(db, 'conversations', id)
  await updateDoc(conversation, { status: 'closed' })
  const messages = collection(conversation, 'messages')
  while (true) {
    const snapshot = await getDocs(query(messages, limit(400)))
    if (snapshot.empty) break
    const batch = writeBatch(db)
    snapshot.docs.forEach((message) => batch.delete(message.ref))
    await batch.commit()
  }
  await deleteDoc(conversation)
}
