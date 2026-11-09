'use client'

import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai'
import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check'
import { getFirebaseServices } from './client'

declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN?: boolean | string
  }
}

let appCheck: AppCheck | null = null

const playgroundInstruction =
  'You are a helpful assistant being evaluated in a private admin playground. Be accurate, clear, and honest about uncertainty. Do not claim access to information that was not provided in this conversation.'

export function getFirebaseAiClient(
  debugToken?: string,
  systemInstruction = playgroundInstruction,
) {
  const siteKey = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY?.trim()
  if (!siteKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY. Add the reCAPTCHA Enterprise site key and restart the app.',
    )
  }

  const { app } = getFirebaseServices()
  if (process.env.NODE_ENV === 'development' && debugToken) {
    window.FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken
  }
  appCheck ??= initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(siteKey),
    isTokenAutoRefreshEnabled: true,
  })

  const ai = getAI(app, { backend: new GoogleAIBackend() })
  return {
    appCheck,
    model: getGenerativeModel(
      ai,
      {
        model: 'gemini-3.5-flash-lite',
        generationConfig: { maxOutputTokens: 1024 },
        systemInstruction,
      },
      { timeout: 60_000 },
    ),
  }
}
