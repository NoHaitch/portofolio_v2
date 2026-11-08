'use client'

import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Search,
  Send,
  Trash2,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useDeferredValue, useEffect, useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { deleteConversation, sendMessage } from '@/lib/chat/firebase'
import { useReadMessages } from '@/components/chat/use-read-messages'
import { MessageThread, ReplyPreview, type ThreadLabels } from '@/components/chat/message-thread'
import { useThreadScroll } from '@/components/chat/use-thread-scroll'
import { MAX_MESSAGE_LENGTH, type ChatMessage, type Conversation } from '@/lib/chat/types'
import { matchesConversationSearch } from '@/lib/chat/search'
import { getFirebaseServices } from '@/lib/firebase/client'
import { getLocalePath, isLocale } from '@/lib/i18n/shared'

const threadLabels: ThreadLabels = {
  you: 'You',
  other: 'Visitor',
  read: 'Read',
  unread: 'Unread',
  reply: 'Reply',
  replyingTo: 'Replying to',
  cancelReply: 'Cancel reply',
  unavailable: 'Message unavailable',
  sending: 'Sending',
}

export function AdminWorkspace({ page }: { page: 'dashboard' | 'messages' }) {
  const pathname = usePathname()
  const router = useRouter()
  const segment = pathname.split('/')[1]
  const locale = isLocale(segment) ? segment : 'en'
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [chats, setChats] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const [inboxError, setInboxError] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [messagesFor, setMessagesFor] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [replyTo, setReplyTo] = useState<ChatMessage | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [searchText, setSearchText] = useState('')
  const deferredSearch = useDeferredValue(searchText.trim())
  const [searchMatches, setSearchMatches] = useState<Set<string> | null>(null)
  const [searching, setSearching] = useState(false)
  const selected = chats.find((chat) => chat.id === selectedId)
  const scroll = useThreadScroll(
    messagesFor,
    messages[messages.length - 1]?.id,
    page === 'messages' && !!selected,
  )
  const onReadError = useCallback((cause: unknown) => {
    console.error('Could not mark conversation as read:', cause)
    setError('Could not mark the conversation as read.')
  }, [])
  useEffect(() => {
    if (!user || page !== 'messages') return
    const term = deferredSearch.toLocaleLowerCase()
    if (!term) {
      setSearchMatches(null)
      setSearching(false)
      return
    }

    let active = true
    const matches = new Set(
      chats
        .filter((chat) =>
          matchesConversationSearch({
            code: chat.id.slice(0, 6),
            lastMessage: chat.lastMessage,
            term,
          }),
        )
        .map((chat) => chat.id),
    )
    const candidates = chats.filter((chat) => !matches.has(chat.id))
    setSearching(true)
    setSearchMatches(null)

    async function searchConversation(chat: Conversation) {
      const snapshot = await getDocs(
        query(
          collection(getFirebaseServices().db, 'conversations', chat.id, 'messages'),
          orderBy('createdAt', 'desc'),
          limit(200),
        ),
      )
      if (
        snapshot.docs.some((message) => message.data().text?.toLocaleLowerCase().includes(term))
      ) {
        matches.add(chat.id)
      }
    }

    void Promise.all(candidates.map(searchConversation))
      .then(
        () => {
          if (active) setSearchMatches(matches)
        },
        (cause: unknown) => {
          console.error('Could not search conversation messages:', cause)
          if (active) {
            setSearchMatches(new Set())
            setError('Could not search messages. Check your connection and Firestore rules.')
          }
        },
      )
      .finally(() => {
        if (active) setSearching(false)
      })
    return () => {
      active = false
    }
  }, [user, page, deferredSearch, chats])
  useReadMessages({
    chat: selected,
    messages,
    messagesFor,
    role: 'admin',
    active: !!user && page === 'messages' && !!selectedId,
    onError: onReadError,
  })

  useEffect(() => {
    try {
      const { auth } = getFirebaseServices()
      return onAuthStateChanged(auth, (current) => {
        const uid = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_UID?.trim()
        const email = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL?.trim().toLowerCase()
        if (
          !uid ||
          !email ||
          !current ||
          current.uid !== uid ||
          current.email?.toLowerCase() !== email
        ) {
          setUser(null)
          setChecking(false)
          return
        }
        setUser(current)
        setChecking(false)
      })
    } catch (cause) {
      console.error('Admin authentication initialization failed:', cause)
      setError('Could not initialize Firebase. Check the deployment configuration.')
      setChecking(false)
    }
  }, [])

  useEffect(() => {
    if (!user) return
    const { db } = getFirebaseServices()
    return onSnapshot(
      query(collection(db, 'conversations'), orderBy('updatedAt', 'desc')),
      (snapshot) => {
        setChats(snapshot.docs.map((item) => ({ ...item.data(), id: item.id }) as Conversation))
        setInboxError(false)
        setLoading(false)
      },
      (cause) => {
        console.error('Could not load inbox:', cause)
        setError('Could not load conversations. Check Firestore rules and your connection.')
        setInboxError(true)
        setLoading(false)
      },
    )
  }, [user])

  useEffect(() => {
    if (!user || !selectedId) return
    setMessages([])
    setMessagesFor(null)
    setReplyTo(null)
    const { db } = getFirebaseServices()
    return onSnapshot(
      query(collection(db, 'conversations', selectedId, 'messages'), orderBy('createdAt')),
      (snapshot) => {
        setMessages(snapshot.docs.map((item) => ({ ...item.data(), id: item.id }) as ChatMessage))
        setMessagesFor(selectedId)
      },
      (cause) => {
        console.error('Could not load messages:', cause)
        setError('Could not load messages. Check your connection.')
      },
    )
  }, [user, selectedId])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected || !text.trim() || busy) return
    setBusy(true)
    setError('')
    try {
      await sendMessage(
        getFirebaseServices().db,
        selected.id,
        selected.guestId,
        'admin',
        text,
        false,
        replyTo?.id,
      )
      setText('')
      setReplyTo(null)
    } catch (cause) {
      console.error('Could not send reply:', cause)
      setError('Could not send your reply. Check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  async function closeChat() {
    if (!selected || busy) return
    setBusy(true)
    setError('')
    try {
      await updateDoc(doc(getFirebaseServices().db, 'conversations', selected.id), {
        status: 'closed',
      })
    } catch (cause) {
      console.error('Could not close conversation:', cause)
      setError('Could not close this conversation.')
    } finally {
      setBusy(false)
    }
  }

  async function removeChat() {
    if (
      !selected ||
      busy ||
      !window.confirm('Delete this conversation and all of its messages? This cannot be undone.')
    )
      return
    setBusy(true)
    setError('')
    try {
      await deleteConversation(getFirebaseServices().db, selected.id)
      setSelectedId(null)
    } catch (cause) {
      console.error('Could not delete conversation:', cause)
      setError('Could not delete the whole conversation. It is closed; try deleting it again.')
    } finally {
      setBusy(false)
    }
  }

  if (checking)
    return <main className="flex flex-1 items-center justify-center">Checking your session...</main>
  if (!user)
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-xl font-semibold">Admin access required</h1>
        <p className="text-muted-foreground text-sm">
          {error || 'Sign in with the configured owner account to continue.'}
        </p>
        <Button nativeButton={false} render={<Link href={getLocalePath(locale, '/admin/login')} />}>
          Go to sign in
        </Button>
      </main>
    )

  const active = chats.filter((chat) => chat.status === 'open').length
  const unread = chats.filter((chat) => chat.unreadByAdmin).length
  const nav = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, active: page === 'dashboard' },
    {
      href: '/admin/messages',
      label: 'Messages',
      icon: MessageCircle,
      active: page === 'messages',
    },
  ]

  return (
    <main className="bg-background flex min-h-dvh flex-1">
      <nav
        aria-label="Admin navigation"
        className="border-border bg-card flex w-16 shrink-0 flex-col items-center gap-2 border-r py-5 sm:w-20"
      >
        <Link
          href={getLocalePath(locale, '/admin')}
          className="bg-primary text-primary-foreground mb-8 flex size-10 items-center justify-center rounded-xl font-mono text-sm font-bold"
          aria-label="Admin dashboard"
        >
          FT
        </Link>
        {nav.map(({ href, label, icon: Icon, active: current }) => (
          <Link
            key={href}
            href={getLocalePath(locale, href)}
            aria-label={label}
            aria-current={current ? 'page' : undefined}
            title={label}
            className={
              current
                ? 'bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-xl'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground flex size-11 items-center justify-center rounded-xl'
            }
          >
            <Icon className="size-5" />
          </Link>
        ))}
        <div className="mt-auto flex flex-col gap-2">
          <Link
            href={getLocalePath(locale, '/')}
            aria-label="View website"
            title="View website"
            className="text-muted-foreground hover:bg-muted flex size-11 items-center justify-center rounded-xl"
          >
            <ExternalLink className="size-5" />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Sign out"
            title="Sign out"
            onClick={() => {
              void signOut(getFirebaseServices().auth)
                .then(() => router.push(getLocalePath(locale, '/admin/login')))
                .catch((cause) => {
                  console.error('Sign out failed:', cause)
                  setError('Could not sign out. Try again.')
                })
            }}
          >
            <LogOut className="size-5" />
          </Button>
        </div>
      </nav>
      <div className="min-w-0 flex-1">
        {page === 'dashboard' ? (
          <div className="mx-auto max-w-5xl px-5 py-10 sm:px-10 sm:py-14">
            <p className="text-primary font-mono text-xs font-medium tracking-[0.16em] uppercase">
              Owner workspace
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              An overview of conversations on your portfolio.
            </p>
            {error && (
              <p role="alert" className="text-destructive mt-6 text-sm">
                {error}
              </p>
            )}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ['Active chats', active],
                ['Unread chats', unread],
                ['Total chats', chats.length],
              ].map(([label, count]) => (
                <div key={label} className="border-border bg-card rounded-2xl border p-5">
                  <p className="text-muted-foreground text-sm">{label}</p>
                  <p className="mt-4 text-3xl font-semibold tabular-nums">
                    {loading ? '...' : inboxError ? '--' : count}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-border bg-card mt-8 rounded-2xl border p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">Recent conversations</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Open the inbox to read and reply.
                  </p>
                </div>
                <Button
                  variant="outline"
                  nativeButton={false}
                  render={<Link href={getLocalePath(locale, '/admin/messages')} />}
                >
                  Open messages
                </Button>
              </div>
              <div className="mt-5 divide-y">
                {!loading && !inboxError && chats.length === 0 && (
                  <p className="text-muted-foreground py-5 text-sm">No conversations yet.</p>
                )}
                {chats.slice(0, 5).map((chat) => (
                  <Link
                    key={chat.id}
                    href={getLocalePath(locale, '/admin/messages')}
                    className="hover:bg-muted/50 flex items-center justify-between gap-4 py-4"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">
                        Visitor {chat.id.slice(0, 6)}
                      </span>
                      <span className="text-muted-foreground block truncate text-sm">
                        {chat.lastMessage}
                      </span>
                    </span>
                    <span className="text-muted-foreground shrink-0 text-xs">
                      {chat.unreadByAdmin ? 'Unread' : chat.status === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-dvh flex-col">
            <header className="border-border border-b px-5 py-5 sm:px-7">
              <h1 className="text-xl font-semibold">Messages</h1>
              <p className="text-muted-foreground text-sm">Your portfolio inbox</p>
            </header>
            {error && (
              <p role="alert" className="text-destructive border-border border-b px-5 py-2 text-sm">
                {error}
              </p>
            )}
            <div className="flex min-h-0 flex-1">
              <div
                className={`${selectedId ? 'hidden md:block' : 'block'} border-border w-full shrink-0 overflow-y-auto border-r md:w-72 lg:w-80`}
              >
                <div className="border-border space-y-3 border-b p-4">
                  <label
                    className="text-muted-foreground font-mono text-xs uppercase"
                    htmlFor="conversation-search"
                  >
                    Conversations{' '}
                    {loading || inboxError ? '' : `(${searchMatches?.size ?? chats.length})`}
                  </label>
                  <div className="relative">
                    <Search
                      className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                      aria-hidden="true"
                    />
                    <Input
                      id="conversation-search"
                      type="search"
                      placeholder="Search code or messages"
                      value={searchText}
                      onChange={(event) => setSearchText(event.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
                {!loading && !inboxError && !searching && chats.length === 0 && (
                  <p className="text-muted-foreground p-5 text-sm">
                    No conversations yet. New messages will appear here.
                  </p>
                )}
                {searching && (
                  <p className="text-muted-foreground p-5 text-sm">Searching messages…</p>
                )}
                {!searching && searchMatches?.size === 0 && deferredSearch && (
                  <p className="text-muted-foreground p-5 text-sm">
                    No conversations match that search.
                  </p>
                )}
                {chats
                  .filter((chat) => !deferredSearch || searchMatches?.has(chat.id))
                  .map((chat) => (
                    <button
                      key={chat.id}
                      type="button"
                      disabled={busy}
                      onClick={() => setSelectedId(chat.id)}
                      className={`${selectedId === chat.id ? 'bg-accent' : 'hover:bg-muted/60'} border-border w-full border-b px-5 py-4 text-left`}
                    >
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold">Visitor {chat.id.slice(0, 6)}</span>
                        <span className="text-muted-foreground text-xs">
                          {chat.unreadByAdmin ? 'Unread' : chat.status === 'closed' ? 'Closed' : ''}
                        </span>
                      </span>
                      <span className="text-muted-foreground mt-1 block truncate text-sm">
                        {chat.lastMessage}
                      </span>
                      <span className="text-muted-foreground mt-1 block text-xs">
                        {chat.updatedAt
                          ? new Intl.DateTimeFormat(locale, {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            }).format(chat.updatedAt.toDate())
                          : 'Sending…'}
                      </span>
                    </button>
                  ))}
              </div>
              <div className={`${selectedId ? 'flex' : 'hidden md:flex'} min-w-0 flex-1 flex-col`}>
                {selected ? (
                  <>
                    <div className="border-border flex flex-wrap items-center gap-2 border-b px-4 py-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Back to conversations"
                        onClick={() => setSelectedId(null)}
                      >
                        <ArrowLeft />
                      </Button>
                      <div className="mr-auto">
                        <h2 className="text-sm font-semibold">Visitor {selected.id.slice(0, 6)}</h2>
                        <p className="text-muted-foreground text-xs">
                          {selected.status === 'open' ? 'Open conversation' : 'Closed conversation'}
                        </p>
                      </div>
                      {selected.status === 'open' && (
                        <Button variant="outline" size="sm" disabled={busy} onClick={closeChat}>
                          Close chat
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={busy}
                        aria-label="Delete conversation"
                        title="Delete conversation"
                        onClick={removeChat}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                    <div
                      ref={scroll.containerRef}
                      onScroll={scroll.onScroll}
                      className="min-h-0 flex-1 overflow-y-auto p-5"
                      aria-live="polite"
                    >
                      {messagesFor === selected.id && (
                        <MessageThread
                          messages={messages}
                          role="admin"
                          locale={locale}
                          labels={threadLabels}
                          canReply={selected.status === 'open'}
                          onReply={(message) => {
                            setReplyTo(message)
                            inputRef.current?.focus()
                          }}
                        />
                      )}
                    </div>
                    {selected.status === 'open' ? (
                      <form onSubmit={submit} className="border-border space-y-2 border-t p-4">
                        {replyTo && (
                          <ReplyPreview
                            message={replyTo}
                            role="admin"
                            labels={threadLabels}
                            onCancel={() => setReplyTo(null)}
                          />
                        )}
                        <div className="flex gap-2">
                          <Input
                            ref={inputRef}
                            aria-label="Write a reply"
                            placeholder="Write a reply"
                            maxLength={MAX_MESSAGE_LENGTH}
                            value={text}
                            onChange={(event) => setText(event.target.value)}
                            disabled={busy}
                          />
                          <Button type="submit" disabled={busy || !text.trim()}>
                            <Send className="size-4" /> Send
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-muted-foreground border-border border-t p-4 text-center text-sm">
                        This conversation is closed.
                      </p>
                    )}
                  </>
                ) : (
                  <div className="text-muted-foreground flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                    <MessageCircle className="size-8" />
                    <p>Select a conversation to view its messages.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
