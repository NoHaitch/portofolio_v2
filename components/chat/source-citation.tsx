'use client'

import { ExternalLink } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { getLocalePath } from '@/lib/i18n/shared'
import type { Locale } from '@/lib/i18n/types'

export function SourceCitation({
  source,
  locale,
}: {
  source: { title: string; href: string; kind: string }
  locale: Locale
}) {
  const title = source.title.length > 64 ? `${source.title.slice(0, 61)}...` : source.title

  return (
    <span className="relative mx-0.5 inline-block h-0 w-3 align-super leading-none">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <a
                href={getLocalePath(locale, source.href)}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            aria-label={`View source: ${source.title}`}
            className="text-primary absolute bottom-0 left-0 inline-flex size-3 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <ExternalLink aria-hidden="true" className="size-3" />
          </TooltipTrigger>
          <TooltipContent className="max-w-64 whitespace-normal">{title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </span>
  )
}
