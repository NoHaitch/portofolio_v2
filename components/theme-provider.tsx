'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
} | null>(null)

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode
  initialTheme: Theme | null
}) {
  const [theme, setCurrentTheme] = useState<Theme>(initialTheme ?? 'light')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const hasSavedTheme = document.cookie
      .split('; ')
      .some((cookie) => cookie === 'theme=light' || cookie === 'theme=dark')

    if (!hasSavedTheme) {
      setCurrentTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (hasSavedTheme) return
      document.documentElement.classList.toggle('dark', event.matches)
      setCurrentTheme(event.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', syncSystemTheme)
    return () => mediaQuery.removeEventListener('change', syncSystemTheme)
  }, [])

  function setTheme(nextTheme: Theme) {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    document.documentElement.classList.toggle('light', nextTheme === 'light')
    window.localStorage.setItem('theme', nextTheme)
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; samesite=lax${window.location.protocol === 'https:' ? '; secure' : ''}`
    setCurrentTheme(nextTheme)
  }

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }

  return context
}
