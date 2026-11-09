import ReactMarkdown, { type Components } from 'react-markdown'
import { ExternalLink } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { RetrievedChunk } from '@/lib/assistant/retrieval'
import { getLocalePath } from '@/lib/i18n/shared'
import type { Locale } from '@/lib/i18n/types'

function renderLink(href: string | undefined, children: React.ReactNode) {
  const external = /^https?:\/\//.test(href ?? '')
  return (
    <a
      href={href}
      className="text-primary break-words underline underline-offset-2 hover:no-underline"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

const components: Components = {
  h1: ({ children }) => (
    <h3 className="mt-4 text-base font-semibold tracking-tight first:mt-0">{children}</h3>
  ),
  h2: ({ children }) => (
    <h3 className="mt-4 text-base font-semibold tracking-tight first:mt-0">{children}</h3>
  ),
  h3: ({ children }) => <h4 className="mt-3 text-sm font-semibold">{children}</h4>,
  p: ({ children }) => <p className="leading-6 [&+p]:mt-3">{children}</p>,
  ul: ({ children }) => (
    <ul className="marker:text-primary my-2 list-disc space-y-1 pl-5 leading-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="marker:text-primary my-2 list-decimal space-y-1 pl-5 leading-6">{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-primary/50 text-muted-foreground my-3 border-l-2 pl-3">
      {children}
    </blockquote>
  ),
  pre: ({ children }) => (
    <pre className="bg-muted my-3 overflow-x-auto rounded-lg p-3 font-mono text-xs leading-5">
      {children}
    </pre>
  ),
  code: ({ className, children }) => (
    <code className={className ?? 'bg-muted rounded px-1 py-0.5 font-mono text-[0.85em]'}>
      {children}
    </code>
  ),
  a: ({ href, children }) => {
    const citationIndex = /^#rag-source-(\d+)$/.exec(href ?? '')
    if (citationIndex) {
      return <span data-rag-citation={citationIndex[1]}>{children}</span>
    }
    return renderLink(href, children)
  },
  img: () => null,
}

export function AiMarkdown({
  content,
  sources = [],
  locale = 'en',
}: {
  content: string
  sources?: RetrievedChunk[]
  locale?: Locale
}) {
  const citedContent = content.replace(/\[(\d+)\]/g, '[$1](#rag-source-$1)')
  const citationComponents: Components = {
    ...components,
    a: ({ href, children }) => {
      const citationIndex = /^#rag-source-(\d+)$/.exec(href ?? '')
      if (citationIndex) {
        const source = sources[Number(citationIndex[1]) - 1]
        if (!source) return <>{children}</>

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className="text-primary relative mx-0.5 inline-block h-0 w-3 cursor-help align-super leading-none"
                aria-label={`View source: ${source.title}`}
              >
                <ExternalLink aria-hidden="true" className="absolute bottom-0 left-0 size-3" />
              </TooltipTrigger>
              <TooltipContent className="max-w-64 whitespace-normal">
                <a
                  href={getLocalePath(locale, source.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={source.title}
                  className="line-clamp-2 block font-medium underline underline-offset-2"
                >
                  {source.title.length > 64 ? `${source.title.slice(0, 61)}...` : source.title}
                </a>
                <span className="mt-1 block text-[10px] capitalize opacity-70">
                  {source.kind} reference
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }

      return renderLink(href, children)
    },
  }

  return <ReactMarkdown components={citationComponents}>{citedContent}</ReactMarkdown>
}
