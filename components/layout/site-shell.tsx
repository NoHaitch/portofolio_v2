'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import { ChatWidget } from '@/components/chat/chat-widget'
import type { Locale } from '@/lib/i18n/types'

export function SiteShell({
  children,
  header,
  footer,
  locale,
}: {
  children: ReactNode
  header: ReactNode
  footer: ReactNode
  locale: Locale
}) {
  const pathname = usePathname()
  const isAdmin = /^\/(?:(?:en|id|ja|zh)\/)?admin(?:\/|$)/.test(pathname)
  return (
    <>
      {!isAdmin && header}
      {children}
      {!isAdmin && footer}
      {!isAdmin && <ChatWidget locale={locale} />}
    </>
  )
}
