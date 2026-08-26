'use client'

import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/education', label: 'Education' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const resolvedTheme =
      storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemTheme

    setTheme(resolvedTheme)
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <header className="border-border/80 bg-background/95 border-b backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-lg font-semibold tracking-tight">
          <Avatar className="border-border/80 h-9 w-9 border">
            <AvatarImage src="/Avatar512.jpg" alt="Francisco Trianto avatar" />
            <AvatarFallback>FT</AvatarFallback>
          </Avatar>
          <span>Francisco • Portfolio</span>
        </Link>
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground transition">
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            className="border-border hover:bg-accent rounded-full border p-2 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </nav>
    </header>
  )
}
