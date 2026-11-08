'use client'

import { useEffect, useState, type FormEvent } from 'react'
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth'
import { Eye, EyeOff } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { getFirebaseServices } from '@/lib/firebase/client'

export function AdminLogin() {
  const [services, setServices] = useState<ReturnType<typeof getFirebaseServices> | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'error' | 'success'>('error')
  const authorizedEmail = process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL?.trim().toLowerCase()

  useEffect(() => {
    try {
      setServices(getFirebaseServices())
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : 'Firebase could not be initialized. Check the app configuration.',
      )
    }
  }, [])

  async function verifyAdmin(user: User) {
    if (!services) throw new Error('Firebase is still initializing. Try again in a moment.')

    if (!authorizedEmail || user.email?.toLowerCase() !== authorizedEmail) {
      await signOut(services.auth)
      throw new Error(
        authorizedEmail
          ? 'This account is not authorized to access the admin area.'
          : 'Admin sign-in is not configured. Set the admin email in the deployment environment.',
      )
    }
  }

  async function handleGoogleSignIn() {
    if (!services) return

    setIsSubmitting(true)
    setMessage('')
    try {
      const credential = await signInWithPopup(services.auth, new GoogleAuthProvider())
      await verifyAdmin(credential.user)
      setMessageType('success')
      setMessage(
        'Signed in successfully. The admin inbox will be available here when chat is enabled.',
      )
    } catch (error) {
      setMessageType('error')
      setMessage(getAuthErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleEmailSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!services) return

    setIsSubmitting(true)
    setMessage('')
    try {
      const credential = await signInWithEmailAndPassword(services.auth, email.trim(), password)
      await verifyAdmin(credential.user)
      setMessageType('success')
      setMessage(
        'Signed in successfully. The admin inbox will be available here when chat is enabled.',
      )
    } catch (error) {
      setMessageType('error')
      setMessage(getAuthErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handlePasswordReset() {
    if (!services || !email.trim()) {
      setMessageType('error')
      setMessage('Enter your email address first, then request a password reset.')
      return
    }

    setIsSubmitting(true)
    setMessage('')
    try {
      await sendPasswordResetEmail(services.auth, email.trim())
      setMessageType('success')
      setMessage('If an account exists for that email, a password reset link is on its way.')
    } catch (error) {
      setMessageType('error')
      setMessage(getAuthErrorMessage(error))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-5 py-12 sm:px-8 sm:py-16">
      <Card className="border-border/80 bg-card/90 w-full max-w-md rounded-2xl shadow-sm">
        <CardHeader className="gap-2 px-6 pt-7 sm:px-8 sm:pt-8">
          <p className="text-primary font-mono text-xs font-medium tracking-[0.16em] uppercase">
            Owner access
          </p>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground text-sm leading-6">
            Sign in to continue to the admin area.
          </p>
        </CardHeader>
        <CardContent className="space-y-5 px-6 pb-7 sm:px-8 sm:pb-8">
          <Button
            type="button"
            variant="outline"
            className="bg-background h-11 w-full rounded-lg text-sm font-medium"
            onClick={handleGoogleSignIn}
            disabled={!services || isSubmitting}
          >
            <FcGoogle aria-hidden="true" className="size-5" />
            Continue with Google
          </Button>

          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="bg-border h-px flex-1" />
            <span className="text-muted-foreground text-xs">or sign in with email</span>
            <span className="bg-border h-px flex-1" />
          </div>

          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="admin-email" className="text-sm font-medium">
                Email address
              </label>
              <Input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="bg-background placeholder:text-muted-foreground h-11 rounded-lg px-3 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="admin-password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="bg-background placeholder:text-muted-foreground h-11 rounded-lg px-3 pr-11 text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground absolute top-1/2 right-1 size-9 -translate-y-1/2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword((visible) => !visible)}
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="size-4" />
                  ) : (
                    <Eye aria-hidden="true" className="size-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                variant="link"
                className="text-primary h-auto px-0 text-sm"
                onClick={handlePasswordReset}
                disabled={!services || isSubmitting}
              >
                Forgot password?
              </Button>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-lg text-sm"
              disabled={!services || isSubmitting}
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>

          <p
            aria-live="polite"
            role={message ? (messageType === 'error' ? 'alert' : 'status') : undefined}
            className={
              messageType === 'error'
                ? 'text-destructive min-h-5 text-sm'
                : 'text-muted-foreground min-h-5 text-sm'
            }
          >
            {message}
          </p>
        </CardContent>
      </Card>
    </main>
  )
}

function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return 'Sign-in could not be completed. Try again.'

  if ('code' in error && typeof error.code === 'string') {
    switch (error.code) {
      case 'auth/invalid-credential':
        return 'The email or password is incorrect.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Wait a little before trying again.'
      case 'auth/popup-closed-by-user':
        return 'The Google sign-in window was closed before finishing.'
      case 'auth/popup-blocked':
        return 'Your browser blocked the sign-in window. Allow pop-ups and try again.'
      case 'auth/network-request-failed':
        return 'A network error interrupted sign-in. Check your connection and try again.'
    }
  }

  return error.message
}
