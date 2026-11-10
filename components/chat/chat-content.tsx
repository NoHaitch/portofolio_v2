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
type PendingRequest = { conversationId: string; messageId: string; mode: 'assistant' | 'human' }

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
  const [notice, setNotice] = useState('')
  const [thinking, setThinking] = useState(false)
  const [pending, setPending] = useState<PendingRequest | null>(null)
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
      setPending(null)
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

  async function requestAssistant(guest: User, request: PendingRequest) {
    setThinking(request.mode === 'assistant')
    const token = await guest.getIdToken()
    const response = await fetch('/api/chat/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...request, locale }),
    })
    if (!response.ok) throw new Error(`Assistant request failed with HTTP ${response.status}.`)
    const result: unknown = await response.json()
    if (!result || typeof result !== 'object' || !('status' in result)) {
      throw new Error('Assistant returned an invalid response.')
    }
    if (result.status === 'processing') {
      setPending(request)
      setNotice(copy.aiPending)
    } else if (result.status !== 'complete') {
      throw new Error('Assistant could not process the message.')
    } else {
      setPending(null)
      if (request.mode === 'human') {
        setNotice(copy.humanSent)
      } else if (
        'remaining' in result &&
        typeof result.remaining === 'number' &&
        result.remaining === 1
      ) {
        setNotice(copy.aiWarning)
      }
    }
  }

  async function send(textToSend: string, mode: 'assistant' | 'human') {
    if (
      !user ||
      !textToSend.trim() ||
      sending ||
      (chatId && chat?.id !== chatId) ||
      chat?.status === 'closed'
    )
      return
    setSending(true)
    setError('')
    setNotice('')
    let saved = false
    try {
      const { db } = getFirebaseServices('guest')
      const id = chatId ?? doc(collection(db, 'conversations')).id
      const messageId = await sendMessage(
        db,
        id,
        user.uid,
        'guest',
        textToSend,
        !chatId,
        replyTo?.id,
      )
      saved = true
      if (!chatId) localStorage.setItem(CHAT_STORAGE_KEY, id)
      setChatId(id)
      setText('')
      setReplyTo(null)
      const request = { conversationId: id, messageId, mode }
      setPending(request)
      await requestAssistant(user, request)
    } catch (cause) {
      console.error('Could not send message:', cause)
      setError(saved ? copy.aiError : copy.error)
    } finally {
      setThinking(false)
      setSending(false)
    }
  }

  const interrupted = messages.find(
    (message) => message.sender === 'guest' && message.assistantState === 'processing',
  )
  const retry =
    pending ??
    (chatId && interrupted
      ? { conversationId: chatId, messageId: interrupted.id, mode: 'assistant' as const }
      : null)

  async function checkResponse() {
    if (!user || !retry || sending) return
    setSending(true)
    setError('')
    setNotice('')
    try {
      await requestAssistant(user, retry)
    } catch (cause) {
      console.error('Could not check assistant response:', cause)
      setPending(retry)
      setError(copy.aiError)
    } finally {
      setThinking(false)
      setSending(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void send(text, 'assistant')
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
        <p className="border-primary/30 text-muted-foreground rounded-xl border p-3 text-xs leading-5">
          {copy.aiNotice}
        </p>
        {messages.length === 0 && (
          <div className="flex flex-wrap gap-2">
            {copy.suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                size="sm"
                className="h-auto min-h-8 py-1.5 text-left whitespace-normal"
                disabled={!user || sending || (!!chatId && chat?.id !== chatId)}
                onClick={() => void send(suggestion, 'assistant')}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}
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
        {thinking && <p className="text-muted-foreground text-xs">{copy.aiThinking}</p>}
        {notice && (
          <p role="status" className="text-muted-foreground text-xs">
            {notice}
          </p>
        )}
        {retry && chat?.status !== 'closed' && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={sending}
            onClick={checkResponse}
          >
            {copy.aiCheck}
          </Button>
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
              setPending(null)
              setError('')
            }}
          >
            {copy.start}
          </Button>
        </div>
      ) : (
        <form onSubmit={submit} className="border-border space-y-2 border-t p-3">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={!user || sending || (!!chatId && chat?.id !== chatId)}
            onClick={() => void send(copy.humanRequest, 'human')}
          >
            {copy.askOwner}
          </Button>
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
