'use client'

import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function SiteShell({ children }: { children: React.ReactNode }) {
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
    <div className="bg-background text-foreground flex min-h-screen flex-col">
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

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12 lg:px-8">
        {children}
      </main>

      <footer className="border-border/80 border-t">
        <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 Francisco Trianto.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/NoHaitch" className="hover:text-foreground transition">
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/francisco-trianto"
              className="hover:text-foreground transition"
            >
              LinkedIn
            </a>
            <a
              href="https://medium.com/@franciscotrianto"
              className="hover:text-foreground transition"
            >
              Medium
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
