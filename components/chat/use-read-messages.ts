'use client'

import { useEffect, useRef, useState } from 'react'
import { markMessagesRead } from '@/lib/chat/firebase'
import { unreadIncomingMessages } from '@/lib/chat/read-status'
import type { ChatMessage, Conversation } from '@/lib/chat/types'
import { getFirebaseServices } from '@/lib/firebase/client'
import { usePageVisible } from './use-page-visible'

export function useReadMessages({
  chat,
  messages,
  messagesFor,
  role,
  active,
  onError,
}: {
  chat: Conversation | undefined | null
  messages: ChatMessage[]
  messagesFor: string | null
  role: 'guest' | 'admin'
  active: boolean
  onError: (error: unknown) => void
}) {
  const visible = usePageVisible()
  const reading = useRef(false)
  const queued = useRef(false)
  const [revision, setRevision] = useState(0)

  useEffect(() => {
    if (!active || !visible || !chat || messagesFor !== chat.id) return
    const unread = role === 'guest' ? chat.unreadByGuest : chat.unreadByAdmin
    if (!unread && unreadIncomingMessages(messages, role).length === 0) return
    if (reading.current) {
      queued.current = true
      return
    }
    reading.current = true
    void markMessagesRead(
      getFirebaseServices(role === 'guest' ? 'guest' : undefined).db,
      chat,
      messages,
      role,
    )
      .catch(onError)
      .finally(() => {
        reading.current = false
        if (queued.current) {
          queued.current = false
          setRevision((value) => value + 1)
        }
      })
  }, [active, visible, chat, messages, messagesFor, role, onError, revision])
}
