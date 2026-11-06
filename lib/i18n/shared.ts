import { locales, type Locale } from '@/lib/i18n/types'

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

export function getLocalePath(locale: Locale, pathname: string) {
  const pathWithoutLocale = pathname.replace(/^\/(en|id|ja|zh)(?=\/|$)/, '') || '/'

  if (locale === 'en') {
    return pathWithoutLocale
  }

  return pathWithoutLocale === '/' ? `/${locale}` : `/${locale}${pathWithoutLocale}`
}
