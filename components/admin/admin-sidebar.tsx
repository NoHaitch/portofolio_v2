'use client'

import { Bot, ExternalLink, LayoutDashboard, LogOut, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getLocalePath } from '@/lib/i18n/shared'
import type { Locale } from '@/lib/i18n/types'

const navigation = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
  { href: '/admin/messages', label: 'Messages', icon: MessageCircle, page: 'messages' },
  { href: '/admin/ai-test', label: 'AI Playground', icon: Bot, page: 'ai' },
] as const

export function AdminSidebar({
  locale,
  activePage,
  onSignOut,
}: {
  locale: Locale
  activePage: 'dashboard' | 'messages' | 'ai'
  onSignOut: () => void
}) {
  return (
    <nav
      aria-label="Admin navigation"
      className="border-border bg-card sticky top-0 flex h-dvh max-h-dvh w-16 shrink-0 flex-col items-center gap-2 self-start overflow-y-auto border-r py-5 sm:w-20"
    >
      <Link
        href={getLocalePath(locale, '/admin')}
        className="bg-primary text-primary-foreground mb-8 flex size-10 items-center justify-center rounded-xl font-mono text-sm font-bold"
        aria-label="Admin dashboard"
      >
        FT
      </Link>
      {navigation.map(({ href, label, icon: Icon, page }) => {
        const active = activePage === page
        return (
          <Link
            key={href}
            href={getLocalePath(locale, href)}
            aria-label={label}
            aria-current={active ? 'page' : undefined}
            title={label}
            className={
              active
                ? 'bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-xl'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground flex size-11 items-center justify-center rounded-xl'
            }
          >
            <Icon className="size-5" />
          </Link>
        )
      })}
      <div className="mt-auto flex flex-col gap-2">
        <Link
          href={getLocalePath(locale, '/')}
          aria-label="View website"
          title="View website"
          className="text-muted-foreground hover:bg-muted flex size-11 items-center justify-center rounded-xl"
        >
          <ExternalLink className="size-5" />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Sign out"
          title="Sign out"
          onClick={onSignOut}
        >
          <LogOut className="size-5" />
        </Button>
      </div>
    </nav>
  )
}
