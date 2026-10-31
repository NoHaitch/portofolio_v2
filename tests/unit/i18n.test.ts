import { describe, expect, it } from 'vitest'
import { getLocalePath, getMessages, isLocale, locales } from '@/lib/i18n'

function collectKeys(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) {
    return [
      `${prefix}[${value.length}]`,
      ...value.flatMap((item) => collectKeys(item, `${prefix}[]`)),
    ]
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) =>
      collectKeys(child, prefix ? `${prefix}.${key}` : key),
    )
  }

  return [prefix]
}

function collectStrings(value: unknown): string[] {
  if (typeof value === 'string') return [value]
  if (Array.isArray(value)) return value.flatMap(collectStrings)
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectStrings)
  return []
}

describe('isLocale', () => {
  it('accepts every supported locale', () => {
    for (const locale of locales) expect(isLocale(locale)).toBe(true)
  })

  it('rejects unknown values', () => {
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('')).toBe(false)
  })
})

describe('getLocalePath', () => {
  it('serves English without a prefix', () => {
    expect(getLocalePath('en', '/')).toBe('/')
    expect(getLocalePath('en', '/about')).toBe('/about')
  })

  it('prefixes other locales', () => {
    expect(getLocalePath('id', '/')).toBe('/id')
    expect(getLocalePath('ja', '/education')).toBe('/ja/education')
  })

  it('swaps an existing locale prefix', () => {
    expect(getLocalePath('zh', '/ja/contact')).toBe('/zh/contact')
    expect(getLocalePath('en', '/id/contact')).toBe('/contact')
    expect(getLocalePath('en', '/id')).toBe('/')
  })

  it('does not strip path segments that only start with a locale code', () => {
    expect(getLocalePath('en', '/identity')).toBe('/identity')
  })
})

describe('messages', () => {
  const reference = collectKeys(getMessages('en')).sort()

  it.each(locales)('%s has the same structure as English', (locale) => {
    expect(collectKeys(getMessages(locale)).sort()).toEqual(reference)
  })

  it.each(locales)('%s has no empty strings', (locale) => {
    expect(collectStrings(getMessages(locale)).filter((text) => text.trim() === '')).toEqual([])
  })

  it.each(locales)('%s never uses the em dash', (locale) => {
    expect(collectStrings(getMessages(locale)).filter((text) => text.includes('\u2014'))).toEqual(
      [],
    )
  })
})
