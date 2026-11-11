import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  getAssetBase,
  getItems,
  getRecentActivities,
  getRecentProjects,
  sortByDateAsc,
  sortByDateDesc,
} from '@/lib/work'
import { filterCards, type WorkCardData } from '@/lib/work-filter'
import { paginateItems, parsePage } from '@/lib/work-pagination'

const card = (overrides: Partial<WorkCardData>): WorkCardData => ({
  slug: 'a',
  href: '/work/projects/a',
  date: '2025-01-01',
  title: 'Alpha',
  category: 'personal',
  categoryLabel: 'personal',
  dateLabel: 'Jan 2025',
  summary: 'First thing',
  applicationTypes: ['CLI'],
  fields: ['Computer Science'],
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
      if (kind === 'projects') {
        for (const item of items) {
          expect(item.applicationTypes.length, item.slug).toBeGreaterThan(0)
          expect(item.fields.length, item.slug).toBeGreaterThan(0)
        }
      }
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

  it('returns recent projects newest first', () => {
    const projects = getRecentProjects()
    const dates = projects.map((item) => item.date)
    expect(projects).toHaveLength(5)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('returns recent activities newest first', () => {
    const dates = getRecentActivities().map((item) => item.date)
    expect(dates).toEqual([...dates].sort().reverse())
  })

  it('sorts projects and activities by date in either direction', () => {
    const items = [{ date: '2024-03-01' }, { date: '2022-08-01' }, { date: '2025-05-01' }]

    expect(sortByDateAsc(items).map((item) => item.date)).toEqual([
      '2022-08-01',
      '2024-03-01',
      '2025-05-01',
    ])
    expect(sortByDateDesc(items).map((item) => item.date)).toEqual([
      '2025-05-01',
      '2024-03-01',
      '2022-08-01',
    ])
  })
})

describe('filterCards', () => {
  const cards = [
    card({}),
    card({
      slug: 'b',
      title: 'Beta',
      category: 'organization',
      tags: ['Go'],
      summary: 'Second',
      applicationTypes: ['GUI', 'Web interface'],
      fields: ['Game Development', 'Software Engineering'],
    }),
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

  it('matches multiple application types and fields with OR within each filter', () => {
    expect(filterCards(cards, '', null, ['CLI', 'Web interface'])).toHaveLength(2)
    expect(filterCards(cards, '', null, [], ['Computer Science', 'Game Development'])).toHaveLength(
      2,
    )
    expect(
      filterCards(cards, '', null, ['CLI', 'Web interface'], ['Game Development']),
    ).toHaveLength(1)
  })

  it('includes application types and fields in text search', () => {
    expect(filterCards(cards, 'web interface', null)).toHaveLength(1)
    expect(filterCards(cards, 'computer science', null)).toHaveLength(1)
  })
})

describe('work pagination', () => {
  it('returns only the requested page and clamps pages to the available range', () => {
    const items = Array.from({ length: 10 }, (_, index) => index + 1)

    expect(paginateItems(items, 2, 8)).toEqual({
      items: [9, 10],
      page: 2,
      pageCount: 2,
      total: 10,
      start: 9,
      end: 10,
    })
    expect(paginateItems(items, 10, 8).page).toBe(2)
    expect(paginateItems([], 1, 8)).toEqual({
      items: [],
      page: 1,
      pageCount: 1,
      total: 0,
      start: 0,
      end: 0,
    })
  })

  it('parses only positive integer page numbers', () => {
    expect(parsePage('3')).toBe(3)
    expect(parsePage('0')).toBe(1)
    expect(parsePage('2.5')).toBe(1)
    expect(parsePage(['2', '3'])).toBe(1)
  })
})
