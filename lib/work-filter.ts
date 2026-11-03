import type { WorkCategory } from '@/lib/work-schema'

// Kept free of content imports so the client-side explorer does not bundle the full dataset.
export type WorkCardData = {
  slug: string
  href: string
  date: string
  title: string
  category: WorkCategory
  categoryLabel: string
  dateLabel: string
  summary: string
  applicationTypes: string[]
  fields: string[]
  tags: string[]
  cover?: string
}

export function filterCards(
  cards: WorkCardData[],
  query: string,
  category: WorkCategory | null,
  applicationTypes: string[] = [],
  fields: string[] = [],
) {
  const needle = query.trim().toLowerCase()

  return cards.filter((card) => {
    if (category && card.category !== category) return false
    if (
      applicationTypes.length > 0 &&
      !card.applicationTypes.some((applicationType) => applicationTypes.includes(applicationType))
    ) {
      return false
    }
    if (fields.length > 0 && !card.fields.some((field) => fields.includes(field))) return false
    if (!needle) return true

    const haystack = [
      card.title,
      card.summary,
      card.categoryLabel,
      ...card.tags,
      ...card.applicationTypes,
      ...card.fields,
    ]
    return haystack.some((text) => text.toLowerCase().includes(needle))
  })
}
