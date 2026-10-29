'use client'

import { CN, ID, JP, US } from 'country-flag-icons/react/3x2'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const messages = getMessages(locale)
  const navItems = [
    { href: '/', label: messages.navigation.home },
    { href: '/projects', label: messages.navigation.projects },
    { href: '/experience', label: messages.navigation.experience },
    { href: '/education', label: messages.navigation.education },
    { href: '/contact', label: messages.navigation.contact },
  ]
  const currentPath = pathname.replace(/^\/(en|id|ja|zh)(?=\/|$)/, '') || '/'
  const isDark = mounted && theme === 'dark'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-border bg-background/90 sticky top-0 z-10 border-b backdrop-blur select-none [&_a]:[-webkit-user-drag:none] [&_img]:[-webkit-user-drag:none]">
      <nav
        aria-label={messages.navigation.label}
        className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-2 gap-y-2 px-3 py-3 sm:gap-x-5 sm:px-8 md:py-4"
      >
        <Link
          href={getLocalePath(locale, '/')}
          className="flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight sm:gap-3"
        >
          <Avatar className="border-border size-8 border sm:size-9">
            <AvatarImage src="/Avatar512.jpg" alt="Francisco Trianto avatar" />
            <AvatarFallback>FT</AvatarFallback>
          </Avatar>
          <span>Francisco Trianto</span>
        </Link>
        <div className="order-3 flex w-full items-center justify-between gap-1 text-sm md:order-2 md:ml-auto md:w-auto md:justify-start">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={getLocalePath(locale, item.href)}
              aria-current={currentPath === item.href ? 'page' : undefined}
              className={`hover:bg-accent hover:text-accent-foreground rounded-full px-3 py-2 text-center transition-colors max-md:flex-1 ${
                currentPath === item.href
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="order-2 ml-auto flex items-center gap-1 md:order-3 md:ml-0">
          <Select
            value={locale}
            onValueChange={(value) => {
              if (!value || !isLocale(value)) return
              router.push(getLocalePath(value, pathname))
            }}
          >
            <SelectTrigger
              aria-label={messages.languageLabel}
              className="border-border bg-background hover:bg-accent h-9 w-[84px] rounded-full px-2 text-xs data-[size=default]:h-9 sm:text-sm"
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
                  <SelectItem
                    key={option.locale}
                    value={option.locale}
                    className="h-9 rounded-full"
                  >
                    <Flag
                      aria-hidden="true"
                      className="h-3.5 w-5 shrink-0 rounded-[2px] object-cover"
                    />
                    <span>{option.code}</span>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <Button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            variant="ghost"
            size="icon"
            className="size-9 sm:size-10"
            aria-label={isDark ? messages.switchToLight : messages.switchToDark}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
        </div>
      </nav>
    </header>
  )
}
