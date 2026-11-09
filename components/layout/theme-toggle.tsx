'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export function ThemeToggle({
  switchToLight,
  switchToDark,
}: {
  switchToLight: string
  switchToDark: string
}) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = mounted && theme === 'dark'
  const label = isDark ? switchToLight : switchToDark

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              type="button"
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              variant="ghost"
              size="icon"
              className="size-10"
              aria-label={label}
            />
          }
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
