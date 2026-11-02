import Image from 'next/image'
import { MarkdownAsync, type Components } from 'react-markdown'
import { getPublicImageSize } from '@/lib/work-images'

const sizes = '(min-width: 768px) 768px, 100vw'

function createComponents(assetBase: string): Components {
  return {
    h1: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-semibold tracking-tight">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold tracking-tight">{children}</h3>,
    p: ({ node, children }) => {
      const isCaption =
        node?.children.length === 1 &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'em'
      return isCaption ? (
        <p className="text-muted-foreground mt-2 text-center text-sm">{children}</p>
      ) : (
        <p className="mt-4 leading-7">{children}</p>
      )
    },
    ul: ({ children }) => (
      <ul className="marker:text-primary mt-4 list-disc space-y-1 pl-5 leading-7">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="marker:text-primary mt-4 list-decimal space-y-1 pl-5 leading-7">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-border text-muted-foreground mt-4 border-l-2 pl-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm">{children}</code>
    ),
    a: ({ href, children }) => {
      const external = /^https?:\/\//.test(href ?? '')
      return (
        <a
          href={href}
          className="text-primary break-words underline underline-offset-4 hover:no-underline"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
    // Relative image paths point at the item's own folder in public/work.
    img: async ({ src, alt }) => {
      if (typeof src !== 'string') return null
      const resolved = src.startsWith('./') ? `${assetBase}/${src.slice(2)}` : src
      if (/\.(mp4|webm)$/i.test(resolved)) {
        return (
          <video
            src={`${resolved}#t=0.1`}
            controls
            playsInline
            preload="metadata"
            aria-label={alt || undefined}
            className="border-border mt-6 aspect-video w-full rounded-xl border bg-black object-contain"
          />
        )
      }
      const { width, height } = await getPublicImageSize(resolved)

      return (
        <Image
          src={resolved}
          alt={alt ?? ''}
          width={width}
          height={height}
          sizes={height > width ? '(min-width: 640px) 384px, 100vw' : sizes}
          className={`border-border mt-6 block h-auto w-full rounded-xl border ${
            height > width ? 'mx-auto max-w-sm' : ''
          }`}
        />
      )
    },
  }
}

export function WorkMarkdown({ source, assetBase }: { source: string; assetBase: string }) {
  return <MarkdownAsync components={createComponents(assetBase)}>{source}</MarkdownAsync>
}
