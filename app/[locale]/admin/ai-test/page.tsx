import { FirebaseAiTest } from '@/components/admin/firebase-ai-test'

export default function AdminFirebaseAiTestPage() {
  const debugAppCheckToken =
    process.env.NODE_ENV === 'development' ? process.env.FIREBASE_APPCHECK_DEBUG_TOKEN : undefined

  return <FirebaseAiTest debugAppCheckToken={debugAppCheckToken} />
}
