export type WorkListSearchParams = {
  q?: string | string[]
  category?: string | string[]
  applicationType?: string | string[]
  field?: string | string[]
  page?: string | string[]
  sort?: string | string[]
}

export type WorkSortOrder = 'asc' | 'desc'

export const workPageSize = 8

export function parsePage(value: string | string[] | undefined) {
  if (typeof value !== 'string') return 1

  const page = Number(value)
  return Number.isSafeInteger(page) && page > 0 ? page : 1
}

export function parseSelectedValues(value: string | string[] | undefined, options: string[]) {
  const selected = typeof value === 'string' ? [value] : value
  if (!selected) return []

  const allowed = new Set(options)
  return [...new Set(selected.filter((item) => allowed.has(item)))]
}

export function paginateItems<T>(items: T[], requestedPage: number, pageSize = workPageSize) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize))
  const page = Math.min(Math.max(1, requestedPage), pageCount)
  const startIndex = (page - 1) * pageSize

  return {
    items: items.slice(startIndex, startIndex + pageSize),
    page,
    pageCount,
    total: items.length,
    start: items.length === 0 ? 0 : startIndex + 1,
    end: Math.min(startIndex + pageSize, items.length),
  }
}
