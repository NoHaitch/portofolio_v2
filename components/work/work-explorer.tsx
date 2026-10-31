'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { WorkCard } from '@/components/work/work-card'
import type { WorkCategory } from '@/lib/work-schema'
import { filterCards, type WorkCardData } from '@/lib/work-filter'

type Labels = {
  searchLabel: string
  searchPlaceholder: string
  allCategories: string
  categoryFilterLabel: string
  resultCount: string
  noResults: string
  clearFilters: string
  viewDetails: string
}

type Props = {
  cards: WorkCardData[]
  categories: { value: WorkCategory; label: string }[]
  labels: Labels
}

export function WorkExplorer({ cards, categories, labels }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<WorkCategory | null>(null)

  const visible = filterCards(cards, query, category)
  const count = labels.resultCount
    .replace('{count}', String(visible.length))
    .replace('{total}', String(cards.length))
  const isFiltered = query !== '' || category !== null

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label htmlFor="work-search" className="sr-only">
            {labels.searchLabel}
          </label>
          <Input
            id="work-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={labels.searchPlaceholder}
            className="h-11 max-w-md rounded-full px-4"
          />
        </div>

        <div role="group" aria-label={labels.categoryFilterLabel} className="flex flex-wrap gap-2">
          {[{ value: null, label: labels.allCategories }, ...categories].map((option) => (
            <Button
              key={option.value ?? 'all'}
              type="button"
              size="sm"
              variant={category === option.value ? 'default' : 'outline'}
              aria-pressed={category === option.value}
              onClick={() => setCategory(option.value)}
              className="rounded-full"
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="text-muted-foreground mt-6 font-mono text-xs">
        {count}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {visible.map((card) => (
            <li key={card.slug}>
              <WorkCard card={card} viewDetails={labels.viewDetails} as="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-border mt-4 rounded-2xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground">{labels.noResults}</p>
          {isFiltered ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setQuery('')
                setCategory(null)
              }}
            >
              {labels.clearFilters}
            </Button>
          ) : null}
        </div>
      )}
    </div>
  )
}
