import { FirebaseAiPlayground } from '@/components/admin/firebase-ai-playground'
import { buildKnowledgeBase } from '@/lib/assistant/corpus'

export default function AdminAiPlaygroundPage() {
  const debugAppCheckToken =
    process.env.NODE_ENV === 'development' ? process.env.FIREBASE_APPCHECK_DEBUG_TOKEN : undefined

  return (
    <FirebaseAiPlayground
      debugAppCheckToken={debugAppCheckToken}
      knowledge={buildKnowledgeBase()}
    />
  )
}
