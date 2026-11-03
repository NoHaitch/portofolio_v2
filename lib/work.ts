import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { featuredProjectSlugs, recentActivityCount } from '@/content/work/featured'
import { getLocalePath, type Locale, type Messages } from '@/lib/i18n'
import {
  categoriesByKind,
  frontMatterKeys,
  projectApplicationTypes,
  projectFields,
  type WorkCategory,
  type WorkKind,
  type WorkLink,
} from '@/lib/work-schema'
import type { WorkCardData } from '@/lib/work-filter'

export type { WorkKind } from '@/lib/work-schema'

export type WorkItem = {
  slug: string
  kind: WorkKind
  title: string
  category: WorkCategory
  date: string
  summary: string
  applicationTypes: string[]
  fields: string[]
  tags: string[]
  team?: string
  // Public URL of the cover image, resolved from the `cover` file name.
  cover?: string
  links: WorkLink[]
  body: string
}

const contentRoot = path.join(process.cwd(), 'content', 'work')
const datePattern = /^\d{4}-\d{2}-\d{2}$/
const cache = new Map<WorkKind, WorkItem[]>()

export function getAssetBase(kind: WorkKind, slug: string) {
  return `/work/${kind}/${slug}`
}

function fail(file: string, message: string): never {
  throw new Error(`Invalid work content ${file}: ${message}`)
}

function asString(file: string, key: string, value: unknown) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(file, `"${key}" must be a non-empty string`)
  }
  return value.trim()
}

function asStringList(
  file: string,
  key: string,
  value: unknown,
  allowedValues?: readonly string[],
) {
  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some(
      (item) =>
        typeof item !== 'string' ||
        item.trim() === '' ||
        (allowedValues !== undefined && !allowedValues.includes(item)),
    )
  ) {
    fail(
      file,
      `"${key}" must be a non-empty list of strings${allowedValues ? ` from ${allowedValues.join(', ')}` : ''}`,
    )
  }
  return value as string[]
}

function parseItem(kind: WorkKind, fileName: string): WorkItem {
  const file = `content/work/${kind}/${fileName}`
  const slug = fileName.replace(/\.md$/, '')
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail(file, 'file name must be lowercase kebab-case')

  const { data, content } = matter(fs.readFileSync(path.join(contentRoot, kind, fileName), 'utf8'))

  for (const key of Object.keys(data)) {
    if (!(frontMatterKeys as readonly string[]).includes(key)) fail(file, `unknown key "${key}"`)
  }

  const category = asString(file, 'category', data.category) as WorkCategory
  if (!categoriesByKind[kind].includes(category)) {
    fail(file, `category "${category}" must be one of ${categoriesByKind[kind].join(', ')}`)
  }

  // YAML turns an unquoted 2024-04-27 into a Date.
  const rawDate = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date
  const date = asString(file, 'date', rawDate)
  if (!datePattern.test(date)) fail(file, '"date" must look like YYYY-MM-DD')

  const applicationTypes =
    kind === 'projects'
      ? asStringList(file, 'applicationTypes', data.applicationTypes, projectApplicationTypes)
      : []
  const fields = kind === 'projects' ? asStringList(file, 'fields', data.fields, projectFields) : []

  const tags: unknown = data.tags ?? []
  if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== 'string')) {
    fail(file, '"tags" must be a list of strings')
  }

  const links: unknown = data.links ?? []
  if (
    !Array.isArray(links) ||
    links.some((link) => typeof link?.label !== 'string' || typeof link?.url !== 'string')
  ) {
    fail(file, '"links" must be a list of { label, url }')
  }

  const cover = data.cover === undefined ? undefined : asString(file, 'cover', data.cover)

  return {
    slug,
    kind,
    title: asString(file, 'title', data.title),
    category,
    date,
    summary: asString(file, 'summary', data.summary),
    applicationTypes,
    fields,
    tags: tags as string[],
    team: data.team === undefined ? undefined : asString(file, 'team', data.team),
    cover: cover ? `${getAssetBase(kind, slug)}/${cover}` : undefined,
    links: links as WorkLink[],
    body: content.trim(),
  }
}

export function getItems(kind: WorkKind): WorkItem[] {
  // Skip the cache in dev so edited markdown shows up without restarting the server.
  const useCache = process.env.NODE_ENV === 'production'
  const cached = useCache ? cache.get(kind) : undefined
  if (cached) return cached

  const items = sortByDateDesc(
    fs
      .readdirSync(path.join(contentRoot, kind))
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => parseItem(kind, fileName)),
  )
  cache.set(kind, items)
  return items
}

export function getItem(kind: WorkKind, slug: string) {
  return getItems(kind).find((item) => item.slug === slug)
}

export function getFeaturedProjects() {
  return featuredProjectSlugs.flatMap((slug) => {
    const project = getItem('projects', slug)
    return project ? [project] : []
  })
}

export function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date))
}

export function sortByDateAsc<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => a.date.localeCompare(b.date))
}

export function getRecentActivities(count = recentActivityCount) {
  return getItems('activities').slice(0, count)
}

export function getRecentProjects(count = 5) {
  return getItems('projects').slice(0, count)
}

export function getRecentWork(count = 5) {
  return sortByDateDesc([...getItems('projects'), ...getItems('activities')]).slice(0, count)
}

export function formatWorkDate(date: string, locale: Locale, withDay = false) {
  return new Intl.DateTimeFormat(locale, {
    ...(withDay ? { day: 'numeric' } : {}),
    month: withDay ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`))
}

export function toCardData(item: WorkItem, locale: Locale, messages: Messages): WorkCardData {
  return {
    slug: item.slug,
    href: getLocalePath(locale, `/work/${item.kind}/${item.slug}`),
    date: item.date,
    title: item.title,
    category: item.category,
    categoryLabel: messages.work.categories[item.category],
    dateLabel: formatWorkDate(item.date, locale),
    summary: item.summary,
    applicationTypes: item.applicationTypes,
    fields: item.fields,
    tags: item.tags,
    cover: item.cover,
  }
}
