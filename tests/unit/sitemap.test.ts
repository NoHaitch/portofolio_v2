import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { getItems } from '@/lib/work'
import { locales } from '@/lib/i18n'

describe('sitemap', () => {
  const entries = sitemap()

  it('includes every localized public page and work detail page', () => {
    const expectedCount =
      (9 + getItems('projects').length + getItems('activities').length) * locales.length
    expect(entries).toHaveLength(expectedCount)
  })

  it('uses the production origin and excludes private routes', () => {
    for (const { url } of entries) {
      expect(url).toMatch(/^https:\/\/francisco-trianto\.vercel\.app(?:\/|$)/)
      expect(url).not.toMatch(/\/(?:admin|api)(?:\/|$)/)
    }
  })

  it('includes localized project detail URLs', () => {
    expect(entries.map(({ url }) => url)).toContain(
      'https://francisco-trianto.vercel.app/id/work/projects/raft-consensus',
    )
  })
})
