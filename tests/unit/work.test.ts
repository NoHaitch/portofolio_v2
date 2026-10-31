import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { featuredProjectSlugs } from '@/content/work/featured'
import { getAssetBase, getFeaturedProjects, getItems, getRecentActivities } from '@/lib/work'
import { filterCards, type WorkCardData } from '@/lib/work-filter'

const card = (overrides: Partial<WorkCardData>): WorkCardData => ({
  slug: 'a',
  href: '/work/projects/a',
  title: 'Alpha',
  category: 'personal',
  categoryLabel: 'personal',
  dateLabel: 'Jan 2025',
  summary: 'First thing',
  tags: ['React'],
  ...overrides,
})

const publicFile = (url: string) => path.join(process.cwd(), 'public', url)

describe('work content', () => {
  it('loads every item with a unique slug per kind', () => {
    for (const kind of ['projects', 'activities'] as const) {
      const items = getItems(kind)
      expect(items.length).toBeGreaterThan(0)
      expect(new Set(items.map((item) => item.slug)).size).toBe(items.length)
    }
  })

  it('has every cover and local body image on disk', () => {
    for (const kind of ['projects', 'activities'] as const) {
      for (const item of getItems(kind)) {
        if (item.cover) expect(fs.existsSync(publicFile(item.cover)), item.slug).toBe(true)
        for (const [, file] of item.body.matchAll(/!\[[^\]]*\]\(\.\/([^)]+)\)/g)) {
          const url = `${getAssetBase(kind, item.slug)}/${file}`
          expect(fs.existsSync(publicFile(url)), url).toBe(true)
        }
      }
    }
  })

  it('only features projects that exist', () => {
    expect(getFeaturedProjects().map((item) => item.slug)).toEqual([...featuredProjectSlugs])
  })

  it('returns recent activities newest first', () => {
    const dates = getRecentActivities().map((item) => item.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })
})

describe('filterCards', () => {
  const cards = [
    card({}),
    card({ slug: 'b', title: 'Beta', category: 'organization', tags: ['Go'], summary: 'Second' }),
  ]

  it('returns everything for an empty query', () => {
    expect(filterCards(cards, '  ', null)).toHaveLength(2)
  })

  it('matches title, summary and tags case-insensitively', () => {
    expect(filterCards(cards, 'beta', null)).toHaveLength(1)
    expect(filterCards(cards, 'second', null)).toHaveLength(1)
    expect(filterCards(cards, 'REACT', null)).toHaveLength(1)
  })

  it('combines query and category', () => {
    expect(filterCards(cards, 'beta', 'personal')).toHaveLength(0)
    expect(filterCards(cards, '', 'organization')).toHaveLength(1)
  })
})
