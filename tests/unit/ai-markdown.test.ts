import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { AiMarkdown } from '@/components/admin/ai-markdown'

describe('AiMarkdown', () => {
  it('renders common assistant Markdown as formatted content', () => {
    const markup = renderToStaticMarkup(
      createElement(AiMarkdown, {
        content: '## A heading\n\n**Bold**, *italic*, and `code`.\n\n1. First\n2. Second',
      }),
    )

    expect(markup).toContain('<h3')
    expect(markup).toContain('<strong>Bold</strong>')
    expect(markup).toContain('<em>italic</em>')
    expect(markup).toContain('<code')
    expect(markup).toContain('<ol')
    expect(markup).not.toContain('**Bold**')
  })

  it('uses the shared citation link and leaves missing references as text', () => {
    const markup = renderToStaticMarkup(
      createElement(AiMarkdown, {
        content: 'Francisco builds software. [1] Missing source [2]',
        locale: 'id',
        sources: [
          {
            id: 'profile',
            title: 'Francisco profile',
            href: '/about',
            kind: 'profile',
            text: 'Public profile',
            score: 1,
          },
        ],
      }),
    )
    expect(markup).toContain('href="/id/about"')
    expect(markup).toContain('aria-label="View source: Francisco profile"')
    expect(markup).toContain('lucide-external-link')
    expect(markup).toContain('Missing source 2')
  })
})
