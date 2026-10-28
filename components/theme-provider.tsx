'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
} | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setCurrentTheme] = useState<Theme>('light')

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('theme')
    const resolvedTheme =
      storedTheme === 'light' || storedTheme === 'dark'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'

    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark')
    setCurrentTheme(resolvedTheme)
  }, [])

  function setTheme(nextTheme: Theme) {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    window.localStorage.setItem('theme', nextTheme)
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
