'use client'

import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai'
import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check'
import { getFirebaseServices } from './client'

let appCheck: AppCheck | null = null

export function getFirebaseAiModel() {
  const siteKey = process.env.NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY?.trim()
  if (!siteKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_FIREBASE_APP_CHECK_RECAPTCHA_SITE_KEY. Add the reCAPTCHA Enterprise site key and restart the app.',
    )
  }

  const { app } = getFirebaseServices()
  appCheck ??= initializeAppCheck(app, {
    provider: new ReCaptchaEnterpriseProvider(siteKey),
    isTokenAutoRefreshEnabled: true,
  })

  const ai = getAI(app, { backend: new GoogleAIBackend() })
  return getGenerativeModel(ai, {
    model: 'gemini-3.8-flash',
    generationConfig: { maxOutputTokens: 64, temperature: 0 },
  })
}
