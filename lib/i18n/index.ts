import en from '@/lib/i18n/messages/en'
import id from '@/lib/i18n/messages/id'
import ja from '@/lib/i18n/messages/ja'
import zh from '@/lib/i18n/messages/zh'
import { locales, type Locale, type Messages } from '@/lib/i18n/types'

const messages: Record<Locale, Messages> = { en, id, ja, zh }

export const languageOptions: {
  locale: Locale
  code: string
}[] = [
  { locale: 'en', code: 'EN' },
  { locale: 'id', code: 'ID' },
  { locale: 'ja', code: 'JA' },
  { locale: 'zh', code: 'ZH' },
]

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value)
}

export function getMessages(locale: Locale) {
  return messages[locale]
}

export function getLocalePath(locale: Locale, pathname: string) {
  const pathWithoutLocale = pathname.replace(/^\/(en|id|ja|zh)(?=\/|$)/, '') || '/'

  if (locale === 'en') {
    return pathWithoutLocale
  }

  return pathWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathWithoutLocale}`
}

export { locales, type Locale, type Messages }
