'use client'

import { CN, ID, JP, US } from 'country-flag-icons/react/3x2'
import { Menu, Moon, Sun, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getLocalePath, getMessages, isLocale, languageOptions, type Locale } from '@/lib/i18n'

const flags: Record<Locale, typeof US> = { en: US, id: ID, ja: JP, zh: CN }

function LanguageSelect({ locale, className }: { locale: Locale; className?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const messages = getMessages(locale)

  return (
    <Select
      value={locale}
      onValueChange={(value) => {
        if (!value || !isLocale(value)) return
        router.push(getLocalePath(value, pathname))
      }}
    >
      <SelectTrigger
        aria-label={messages.languageLabel}
        className={`border-border bg-background hover:bg-accent h-9 w-[84px] rounded-full px-2 text-sm data-[size=default]:h-9 ${className ?? ''}`}
      >
        <SelectValue>
          {(value: string | null) => {
            const option = languageOptions.find((item) => item.locale === value)
            const Flag = option ? flags[option.locale] : null

            return option && Flag ? (
              <>
                <Flag
                  aria-hidden="true"
                  className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover"
                />
                <span>{option.code}</span>
              </>
            ) : null
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="end" className="w-[96px]">
        {languageOptions.map((option) => {
          const Flag = flags[option.locale]

          return (
            <SelectItem key={option.locale} value={option.locale} className="h-9 rounded-full">
              <Flag aria-hidden="true" className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover" />
              <span>{option.code}</span>
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  // The menu is open only for the path it was opened on, so navigating closes it.
  const [openFor, setOpenFor] = useState<string | null>(null)
  const headerRef = useRef<HTMLElement>(null)
  const messages = getMessages(locale)
  const navItems = [
    { href: '/', label: messages.navigation.home },
    { href: '/about', label: messages.navigation.about },
    { href: '/projects', label: messages.navigation.projects },
    { href: '/experience', label: messages.navigation.experience },
    { href: '/education', label: messages.navigation.education },
    { href: '/contact', label: messages.navigation.contact },
  ]
  const currentPath = pathname.replace(/^\/(en|id|ja|zh)(?=\/|$)/, '') || '/'
  const isDark = mounted && theme === 'dark'
  const menuOpen = openFor === pathname

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenFor(null)
    }
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node
      const insidePortal = (target as Element).closest?.('[data-slot^="select"]')
      if (!headerRef.current?.contains(target) && !insidePortal) setOpenFor(null)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setOpenFor(null)
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
    }
  }, [menuOpen])

  return (
    <header
      ref={headerRef}
      className="border-border bg-background/90 sticky top-0 z-10 border-b backdrop-blur select-none [&_a]:[-webkit-user-drag:none] [&_img]:[-webkit-user-drag:none]"
    >
      <nav
        aria-label={messages.navigation.label}
        className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-3 sm:gap-5 sm:px-8 lg:py-4"
      >
        <Link
          href={getLocalePath(locale, '/')}
          className="flex min-w-0 shrink-0 items-center gap-2 text-sm font-semibold tracking-tight sm:gap-3"
        >
          <Avatar className="border-border size-8 border sm:size-9">
            <AvatarImage src="/Avatar512.jpg" alt="Francisco Trianto avatar" />
            <AvatarFallback>FT</AvatarFallback>
          </Avatar>
          <span>Francisco Trianto</span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1 text-sm lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={getLocalePath(locale, item.href)}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={`hover:bg-accent hover:text-accent-foreground block rounded-full px-3 py-2 transition-colors ${
                  currentPath === item.href
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <LanguageSelect locale={locale} className="hidden lg:flex" />

        <div className="ml-auto flex items-center gap-1 lg:ml-0">
          <Button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            variant="ghost"
            size="icon"
            className="size-10"
            aria-label={isDark ? messages.switchToLight : messages.switchToDark}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button
            type="button"
            onClick={() => setOpenFor(menuOpen ? null : pathname)}
            variant="ghost"
            size="icon"
            className="size-10 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? messages.navigation.closeMenu : messages.navigation.openMenu}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-border bg-background absolute inset-x-0 top-full border-b shadow-lg lg:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-3 py-3 sm:px-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={getLocalePath(locale, item.href)}
                aria-current={currentPath === item.href ? 'page' : undefined}
                className={`hover:bg-accent hover:text-accent-foreground flex min-h-12 items-center rounded-xl px-4 text-base transition-colors ${
                  currentPath === item.href
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-border mt-2 flex items-center justify-between border-t px-4 pt-4">
              <span className="text-muted-foreground text-sm">{messages.languageLabel}</span>
              <LanguageSelect locale={locale} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
