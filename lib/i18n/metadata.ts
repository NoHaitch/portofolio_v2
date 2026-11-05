import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/types'
import { getMessages } from '@/lib/i18n'

export function pageMetadata(locale: Locale, title: string): Metadata {
  const suffix = ' | Francisco Trianto'
  return {
    title: title.endsWith(suffix) ? title : `${title}${suffix}`,
    description: getMessages(locale).metadataDescription,
  }
}
