'use client'

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

type Services = { app: FirebaseApp; auth: Auth; db: Firestore }
const services = new Map<string, Services>()

export function getFirebaseServices(name = '[DEFAULT]') {
  const existing = services.get(name)
  if (existing) return existing

  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  }
  const missingValues = Object.entries(config)
    .filter(([key, value]) => key !== 'measurementId' && !value)
    .map(([key]) => key)

  if (missingValues.length > 0) {
    throw new Error(`Missing Firebase environment variables: ${missingValues.join(', ')}`)
  }

  const app = getApps().some((item) => item.name === name)
    ? getApp(name)
    : name === '[DEFAULT]'
      ? initializeApp(config)
      : initializeApp(config, name)
  const result = { app, auth: getAuth(app), db: getFirestore(app) }
  services.set(name, result)
  return result
}
