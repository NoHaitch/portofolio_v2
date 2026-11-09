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
})
