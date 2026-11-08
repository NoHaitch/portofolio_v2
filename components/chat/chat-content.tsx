'use client'

import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendMessage } from '@/lib/chat/firebase'
import { CHAT_STORAGE_KEY } from '@/lib/chat/browser'
import { chatMessages } from '@/lib/chat/messages'
import { MAX_MESSAGE_LENGTH, type ChatMessage, type Conversation } from '@/lib/chat/types'
import { getFirebaseServices } from '@/lib/firebase/client'
import type { Locale } from '@/lib/i18n/types'
import { signInAnonymously, type User } from 'firebase/auth'
import { useReadMessages } from './use-read-messages'
import { MessageThread, ReplyPreview } from './message-thread'
import { useThreadScroll } from './use-thread-scroll'

let guestPromise: Promise<User> | null = null

function getGuest() {
  if (!guestPromise) {
    guestPromise = (async () => {
      const { auth } = getFirebaseServices('guest')
      await auth.authStateReady()
      const guest = auth.currentUser ?? (await signInAnonymously(auth)).user
      if (!guest.isAnonymous) throw new Error('Guest authentication is not anonymous.')
      return guest
    })().catch((error) => {
      guestPromise = null
      throw error
    })
  }
  return guestPromise
}

export default function ChatContent({
  locale,
  active,
  onUnreadChange,
  onConnectionError,
}: {
  locale: Locale
  active: boolean
  onUnreadChange: (unread: boolean) => void
  onConnectionError: (failed: boolean) => void
}) {
  const copy = chatMessages[locale]
  const [user, setUser] = useState<User | null>(null)
  const [chatId, setChatId] = useState<string | null>(null)
  const [chat, setChat] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [text, setText] = useState('')
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null)
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scroll = useThreadScroll(chatId, messages[messages.length - 1]?.id, active)
  const [messagesFor, setMessagesFor] = useState<string | null>(null)
  const onReadError = useCallback(
    (cause: unknown) => {
      console.error('Could not mark chat as read:', cause)
      setError(copy.error)
    },
    [copy.error],
  )
  useReadMessages({ chat, messages, messagesFor, role: 'guest', active, onError: onReadError })

  useEffect(() => {
    let active = true
    async function connect() {
      try {
        const guest = await getGuest()
        const stored = localStorage.getItem(CHAT_STORAGE_KEY)
        if (active) {
          setUser(guest)
          setChatId(stored)
        }
      } catch (cause) {
        console.error('Guest chat initialization failed:', cause)
        onConnectionError(true)
        if (active) setError(copy.error)
      }
    }
    void connect()
    return () => {
      active = false
    }
  }, [copy.error, onConnectionError])

  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== CHAT_STORAGE_KEY) return
      setChatId(event.newValue)
      setChat(null)
      setMessages([])
      setReplyTo(null)
      setReplyTo(null)
      setMessagesFor(null)
      onUnreadChange(false)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [onUnreadChange])

  useEffect(() => {
    if (!user || !chatId) return
    const { db } = getFirebaseServices('guest')
    const stopChat = onSnapshot(
      doc(db, 'conversations', chatId),
      (snapshot) => {
        if (!snapshot.exists()) {
          localStorage.removeItem(CHAT_STORAGE_KEY)
          onUnreadChange(false)
          setChatId(null)
          setChat(null)
          setMessages([])
          return
        }
        const current = { ...snapshot.data(), id: snapshot.id } as Conversation
        setChat(current)
        onUnreadChange(current.unreadByGuest)
        onConnectionError(false)
      },
      (cause) => {
        console.error('Could not load conversation:', cause)
        onConnectionError(true)
        setError(copy.error)
      },
    )
    return stopChat
  }, [user, chatId, copy.error, onUnreadChange, onConnectionError])

  useEffect(() => {
    if (!user || !chatId || chat?.id !== chatId) return
    const { db } = getFirebaseServices('guest')
    return onSnapshot(
      query(collection(db, 'conversations', chatId, 'messages'), orderBy('createdAt')),
      (snapshot) => {
        setMessages(snapshot.docs.map((item) => ({ ...item.data(), id: item.id }) as ChatMessage))
        setMessagesFor(chatId)
      },
      (cause) => {
        console.error('Could not load messages:', cause)
        setError(copy.error)
      },
    )
  }, [user, chatId, chat?.id, copy.error])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (
      !user ||
      !text.trim() ||
      sending ||
      (chatId && chat?.id !== chatId) ||
      chat?.status === 'closed'
    )
      return
    setSending(true)
    setError('')
    try {
      const { db } = getFirebaseServices('guest')
      const id = chatId ?? doc(collection(db, 'conversations')).id
      if (!chatId) localStorage.setItem(CHAT_STORAGE_KEY, id)
      await sendMessage(db, id, user.uid, 'guest', text, !chatId, replyTo?.id)
      setChatId(id)
      setText('')
      setReplyTo(null)
    } catch (cause) {
      console.error('Could not send message:', cause)
      setError(copy.error)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div
        ref={scroll.containerRef}
        onScroll={scroll.onScroll}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
        aria-live="polite"
      >
        <p className="text-muted-foreground text-sm leading-6">{copy.intro}</p>
        <p className="bg-muted text-muted-foreground rounded-xl p-3 text-xs leading-5">
          {copy.privacy}
        </p>
        {!user && !error && <p className="text-muted-foreground text-sm">{copy.loading}</p>}
        <MessageThread
          messages={messages}
          role="guest"
          locale={locale}
          labels={{ ...copy, other: copy.owner }}
          canReply={chat?.status === 'open'}
          onReply={(message) => {
            setReplyTo(message)
            inputRef.current?.focus()
          }}
        />
        {chat?.status === 'closed' && (
          <p className="text-muted-foreground text-center text-xs">{copy.closed}</p>
        )}
        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}
      </div>
      {chat?.status === 'closed' ? (
        <div className="border-border border-t p-3">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              localStorage.removeItem(CHAT_STORAGE_KEY)
              onUnreadChange(false)
              setChatId(null)
              setChat(null)
              setMessages([])
              setReplyTo(null)
              setError('')
            }}
          >
            {copy.start}
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="border-border space-y-2 border-t p-3">
          {replyTo && (
            <ReplyPreview
              message={replyTo}
              role="guest"
              labels={{ ...copy, other: copy.owner }}
              onCancel={() => setReplyTo(null)}
            />
          )}
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              aria-label={copy.placeholder}
              placeholder={copy.placeholder}
              maxLength={MAX_MESSAGE_LENGTH}
              value={text}
              onChange={(event) => setText(event.target.value)}
              disabled={!user || sending || (!!chatId && chat?.id !== chatId)}
            />
            <Button
              type="submit"
              size="icon"
              aria-label={copy.send}
              disabled={!user || !text.trim() || sending || (!!chatId && chat?.id !== chatId)}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
