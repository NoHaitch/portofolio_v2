import type { WorkCategory } from '@/lib/work-schema'

// Kept free of content imports so the client-side explorer does not bundle the full dataset.
export type WorkCardData = {
  slug: string
  href: string
  title: string
  category: WorkCategory
  categoryLabel: string
  dateLabel: string
  summary: string
  tags: string[]
  cover?: string
}

export function filterCards(cards: WorkCardData[], query: string, category: WorkCategory | null) {
  const needle = query.trim().toLowerCase()

  return cards.filter((card) => {
    if (category && card.category !== category) return false
    if (!needle) return true

    const haystack = [card.title, card.summary, card.categoryLabel, ...card.tags]
    return haystack.some((text) => text.toLowerCase().includes(needle))
  })
}
