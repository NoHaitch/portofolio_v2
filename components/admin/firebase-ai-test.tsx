'use client'

import { onAuthStateChanged, type User } from 'firebase/auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getFirebaseAiModel } from '@/lib/firebase/ai'
import { getFirebaseServices } from '@/lib/firebase/client'
import { getLocalePath, isLocale } from '@/lib/i18n/shared'

export function FirebaseAiTest() {
  const pathname = usePathname()
  const router = useRouter()
  const segment = pathname.split('/')[1]
  const locale = isLocale(segment) ? segment : 'en'
  const [user, setUser] = useState<User | null>(null)
  const [checking, setChecking] = useState(true)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')

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
      console.error('Firebase AI test authentication initialization failed:', cause)
      setError(cause instanceof Error ? cause.message : 'Could not initialize Firebase Auth.')
      setChecking(false)
    }
  }, [locale, router])

  async function runTest() {
    if (!user || running) return
    setRunning(true)
    setError('')
    setResult('')

    try {
      const model = getFirebaseAiModel()
      const response = await model.generateContent(
        'Reply with exactly this sentence and nothing else: Firebase AI is connected.',
      )
      const text = response.response.text().trim()
      if (!text) throw new Error('Gemini returned an empty response.')
      setResult(text)
    } catch (cause) {
      console.error('Firebase AI connectivity test failed:', cause)
      setError(cause instanceof Error ? cause.message : 'Firebase AI request failed.')
    } finally {
      setRunning(false)
    }
  }

  if (checking) {
    return <p className="text-muted-foreground text-sm">Checking admin access...</p>
  }
  if (!user) return null

  return (
    <main className="mx-auto w-full max-w-2xl space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Firebase AI connection test</h1>
        <p className="text-muted-foreground text-sm leading-6">
          Sends one short test prompt to Gemini using Firebase AI Logic and App Check. It does not
          save the prompt or response.
        </p>
      </div>
      <Button onClick={runTest} disabled={running}>
        {running ? 'Testing connection...' : 'Send test prompt'}
      </Button>
      {result && (
        <p role="status" className="rounded-lg border p-4 text-sm">
          {result}
        </p>
      )}
      {error && (
        <p role="alert" className="text-destructive rounded-lg border p-4 text-sm">
          {error}
        </p>
      )}
    </main>
  )
}
