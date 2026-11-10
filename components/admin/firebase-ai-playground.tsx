'use client'

import { onAuthStateChanged, type User } from 'firebase/auth'
import { Bot, RotateCcw, Send, UserRound } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AiMarkdown } from '@/components/admin/ai-markdown'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { MAX_HISTORY, MAX_QUESTION_LENGTH, type GuardResult } from '@/lib/assistant/guardrails'
import type { RetrievedChunk } from '@/lib/assistant/retrieval'
import { getFirebaseServices } from '@/lib/firebase/client'
import { getLocalePath, isLocale } from '@/lib/i18n/shared'

type PlaygroundMessage = {
  role: 'user' | 'assistant'
  text: string
  sentAt?: number
  sources?: RetrievedChunk[]
}

const suggestedPrompts = [
  'Who is Francisco?',
  'What projects has he built with TypeScript?',
  'Where did he study and what was his GPA?',
  'What is his favorite food?',
]

export function FirebaseAiPlayground() {
  const pathname = usePathname()
  const router = useRouter()
  const segment = pathname.split('/')[1]
  const locale = isLocale(segment) ? segment : 'en'
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [messages, setMessages] = useState<PlaygroundMessage[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [stage, setStage] = useState('')
  const [error, setError] = useState('')
  const historyRef = useRef<string[]>([])
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      return onAuthStateChanged(getFirebaseServices().auth, (current) => {
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
          router.replace(getLocalePath(locale, '/admin/login'))
          return
        }
        setUser(current)
        setChecking(false)
      })
    } catch (cause) {
      console.error('Firebase AI playground authentication initialization failed:', cause)
      setError(cause instanceof Error ? cause.message : 'Could not initialize Firebase Auth.')
      setChecking(false)
    }
  }, [locale, router])

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight })
  }, [messages, busy])

  function startNewChat() {
    historyRef.current = []
    setMessages([])
    setInput('')
    setError('')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const prompt = input.trim()
    if (!user || !prompt || busy) return

    setBusy(true)
    setError('')
    setInput('')
    setMessages((current) => [...current, { role: 'user', text: prompt, sentAt: Date.now() }])
    let currentStage = 'Checking your session'

    try {
      setStage('Checking your session...')
      const token = await user.getIdToken()
      currentStage = 'Checking the question and sources'
      setStage('Checking and preparing an answer...')
      const response = await fetch('/api/admin/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ question: prompt, history: historyRef.current }),
      })
      const result: GuardResult & { error?: string } = await response.json()
      if (!response.ok) throw new Error(result.error ?? 'Assistant request failed.')
      if (!result.text || !Array.isArray(result.sources) || typeof result.accepted !== 'boolean') {
        throw new Error('Assistant returned an invalid response.')
      }
      if (result.accepted) {
        historyRef.current = [...historyRef.current, prompt].slice(-MAX_HISTORY)
      }
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: result.text, sources: result.sources },
      ])
    } catch (cause) {
      console.error('Firebase AI playground request failed:', cause)
      const message = cause instanceof Error ? cause.message : 'Request failed unexpectedly.'
      setError(`${currentStage}: ${message}`)
    } finally {
      setBusy(false)
      setStage('')
    }
  }

  if (checking) {
    return <p className="text-muted-foreground p-6 text-sm">Checking admin access...</p>
  }
  if (!user) return null

  return (
    <main className="bg-background flex min-h-dvh flex-1">
      <AdminSidebar
        locale={locale}
        activePage="ai"
        onSignOut={() => {
          void getFirebaseServices()
            .auth.signOut()
            .then(() => router.push(getLocalePath(locale, '/admin/login')))
            .catch((cause) => {
              console.error('Sign out failed:', cause)
              setError('Could not sign out. Try again.')
            })
        }}
      />
      <section className="flex min-h-dvh min-w-0 flex-1 flex-col">
        <header className="border-border flex flex-wrap items-center justify-between gap-4 border-b px-5 py-5 sm:px-7">
          <div>
            <p className="text-primary font-mono text-xs font-medium tracking-[0.16em] uppercase">
              Owner workspace
            </p>
            <h1 className="mt-1 text-xl font-semibold">AI Playground</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Chat with Gemini and evaluate responses before building the visitor assistant.
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle switchToLight="Switch to light mode" switchToDark="Switch to dark mode" />
            <Button variant="outline" onClick={startNewChat} disabled={busy}>
              <RotateCcw className="size-4" />
              New chat
            </Button>
          </div>
        </header>

        <div
          ref={transcriptRef}
          aria-live="polite"
          aria-label="Chat messages"
          className="flex-1 overflow-y-auto px-4 py-6 sm:px-7"
        >
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-end gap-5">
            {messages.length === 0 && (
              <div className="my-auto space-y-6 py-10 text-center">
                <div className="bg-primary/10 text-primary mx-auto flex size-14 items-center justify-center rounded-2xl">
                  <Bot className="size-7" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold tracking-tight">Try a conversation</h2>
                  <p className="text-muted-foreground mx-auto max-w-lg text-sm leading-6">
                    Ask about Francisco's background, projects, experience, and interests. Answers
                    are checked against his portfolio sources.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => setInput(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => {
              const own = message.role === 'user'
              return (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    own
                      ? 'ml-auto flex max-w-[90%] items-start gap-3'
                      : 'flex max-w-[90%] items-start gap-3'
                  }
                >
                  {!own && (
                    <div className="bg-primary/10 text-primary mt-1 flex size-8 shrink-0 items-center justify-center rounded-full">
                      <Bot className="size-4" />
                    </div>
                  )}
                  <div className={own ? 'flex min-w-0 flex-col items-end' : 'min-w-0'}>
                    <Card
                      className={
                        own
                          ? 'bg-primary text-primary-foreground rounded-2xl px-4 py-3'
                          : 'rounded-2xl px-4 py-3'
                      }
                    >
                      {own ? (
                        <p className="text-sm break-words whitespace-pre-wrap">{message.text}</p>
                      ) : (
                        <div className="text-sm break-words">
                          <AiMarkdown
                            content={message.text}
                            sources={message.sources}
                            locale={locale}
                          />
                          {message.sources && (
                            <p className="text-muted-foreground border-border mt-3 border-t pt-2 text-xs">
                              {message.sources.length === 0
                                ? 'No sources retrieved'
                                : 'Hover or focus a citation to preview its source.'}
                            </p>
                          )}
                        </div>
                      )}
                    </Card>
                    {own && message.sentAt !== undefined && (
                      <time
                        dateTime={new Date(message.sentAt).toISOString()}
                        className="text-muted-foreground mt-1 px-1 text-[11px] leading-none"
                      >
                        {new Intl.DateTimeFormat(undefined, {
                          hour: 'numeric',
                          minute: '2-digit',
                        }).format(message.sentAt)}
                      </time>
                    )}
                  </div>
                  {own && (
                    <div className="bg-muted text-muted-foreground mt-1 flex size-8 shrink-0 items-center justify-center rounded-full">
                      <UserRound className="size-4" />
                    </div>
                  )}
                </div>
              )
            })}

            {busy && (
              <div className="text-muted-foreground flex items-center gap-3 text-sm" role="status">
                <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-full">
                  <Bot className="size-4" />
                </div>
                {stage || 'Preparing response...'}
              </div>
            )}
          </div>
        </div>

        <div className="border-border border-t px-4 py-4 sm:px-7">
          <div className="mx-auto w-full max-w-3xl space-y-3">
            {error && (
              <p role="alert" className="text-destructive rounded-lg border p-3 text-sm">
                {error}
              </p>
            )}
            <form onSubmit={submit} className="flex items-end gap-2">
              <label className="sr-only" htmlFor="playground-prompt">
                Message Gemini
              </label>
              <textarea
                id="playground-prompt"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask Gemini something..."
                maxLength={MAX_QUESTION_LENGTH}
                rows={3}
                disabled={busy}
                className="border-input bg-input/20 placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30 min-h-20 w-full resize-y rounded-xl border px-3 py-2 text-sm outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="submit"
                size="icon"
                aria-label="Send message"
                disabled={!input.trim() || busy}
                className="size-10 shrink-0"
              >
                <Send className="size-4" />
              </Button>
            </form>
            <p className="text-muted-foreground text-center text-xs">
              Responses use the current Gemini model and may be inaccurate. Chat history is not
              saved.
            </p>
            <p className="text-muted-foreground text-center text-xs">
              Intended for Gemini free-tier use, subject to your project&apos;s billing and quota.
              Guardrails limit misuse but are not foolproof. Limit: 10 questions per hour.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
