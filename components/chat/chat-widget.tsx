'use client'

import { lazy, Suspense, useEffect, useState } from 'react'
import { MessageCircle, Minus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { chatMessages } from '@/lib/chat/messages'
import { CHAT_STORAGE_KEY } from '@/lib/chat/browser'
import type { Locale } from '@/lib/i18n/types'

const ChatContent = lazy(() => import('./chat-content'))

export function ChatWidget({ locale }: { locale: Locale }) {
  const [state, setState] = useState<'closed' | 'open' | 'minimized'>('closed')
  const [hasOpened, setHasOpened] = useState(false)
  const [unread, setUnread] = useState(false)
  const [connectionError, setConnectionError] = useState(false)
  const copy = chatMessages[locale]
  useEffect(() => {
    try {
      if (localStorage.getItem(CHAT_STORAGE_KEY)) setHasOpened(true)
    } catch (error) {
      console.error('Could not access chat storage:', error)
      setConnectionError(true)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === CHAT_STORAGE_KEY && event.newValue) setHasOpened(true)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])
  return (
    <aside className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6" aria-label={copy.title}>
      {state === 'closed' && (
        <Button
          size="icon"
          className="relative size-14 rounded-full shadow-lg"
          aria-label={unread ? `${copy.open}: ${copy.newMessage}` : copy.open}
          onClick={() => {
            setHasOpened(true)
            setState('open')
          }}
        >
          <MessageCircle className="size-6" />
          {unread && (
            <span
              aria-hidden="true"
              className="bg-destructive border-background absolute top-0 right-0 size-3.5 rounded-full border-2"
            />
          )}
        </Button>
      )}
      <section
        className={
          state === 'closed'
            ? 'hidden'
            : 'border-border bg-card flex w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border shadow-xl'
        }
      >
        <div className="bg-primary text-primary-foreground flex items-center gap-3 p-3">
          <MessageCircle className="ml-1 size-5" />
          <button
            type="button"
            className="flex-1 text-left text-sm font-semibold"
            onClick={() => {
              if (state !== 'open') setHasOpened(true)
              setState(state === 'open' ? 'minimized' : 'open')
            }}
            aria-expanded={state === 'open'}
          >
            {copy.title}
            {state === 'minimized' && unread && (
              <span className="bg-background text-foreground ml-2 rounded-full px-2 py-0.5 text-xs">
                {copy.newMessage}
              </span>
            )}
          </button>
          {state === 'open' && (
            <Button
              size="icon"
              variant="ghost"
              className="size-8 text-inherit hover:bg-white/15 hover:text-inherit"
              aria-label={copy.minimize}
              onClick={() => setState('minimized')}
            >
              <Minus />
            </Button>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="size-8 text-inherit hover:bg-white/15 hover:text-inherit"
            aria-label={copy.close}
            onClick={() => {
              setState('closed')
            }}
          >
            <X />
          </Button>
        </div>
        <div
          className={state === 'open' ? 'flex h-[min(30rem,calc(100dvh-8rem))] flex-col' : 'hidden'}
        >
          {hasOpened && (
            <Suspense
              fallback={<p className="text-muted-foreground p-4 text-sm">{copy.loading}</p>}
            >
              <ChatContent
                locale={locale}
                active={state === 'open'}
                onUnreadChange={setUnread}
                onConnectionError={setConnectionError}
              />
            </Suspense>
          )}
        </div>
      </section>
      {connectionError && state !== 'open' && (
        <p
          role="status"
          className="bg-card text-destructive mt-2 max-w-60 rounded-lg border p-2 text-xs shadow-sm"
        >
          {copy.error}
        </p>
      )}
      <span className="sr-only" role="status">
        {unread && state !== 'open' ? copy.newMessage : ''}
      </span>
    </aside>
  )
}
