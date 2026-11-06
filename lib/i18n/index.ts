import en from '@/lib/i18n/messages/en'
import id from '@/lib/i18n/messages/id'
import ja from '@/lib/i18n/messages/ja'
import zh from '@/lib/i18n/messages/zh'
import { type Locale, type Messages } from '@/lib/i18n/types'

const messages: Record<Locale, Messages> = { en, id, ja, zh }

export function getMessages(locale: Locale) {
  return messages[locale]
}

export { getLocalePath, isLocale, languageOptions } from '@/lib/i18n/shared'
export { locales, type Locale, type Messages } from '@/lib/i18n/types'
