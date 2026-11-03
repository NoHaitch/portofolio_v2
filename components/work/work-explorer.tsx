import Link from 'next/link'
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-variants'
import { Input } from '@/components/ui/input'
import type { WorkCategory } from '@/lib/work-schema'
import type { WorkCardData } from '@/lib/work-filter'
import type { WorkSortOrder } from '@/lib/work-pagination'
import { WorkCard } from '@/components/work/work-card'

type Labels = {
  searchLabel: string
  searchPlaceholder: string
  searchButton: string
  allCategories: string
  categoryFilterLabel: string
  resultCount: string
  noResults: string
  clearFilters: string
  viewDetails: string
  paginationLabel: string
  previousPage: string
  nextPage: string
  pageNumberLabel: string
  sortOldestFirst: string
  sortNewestFirst: string
}

type Props = {
  action: string
  cards: WorkCardData[]
  categories: { value: WorkCategory; label: string }[]
  category: WorkCategory | null
  page: number
  pageCount: number
  query: string
  result: { start: number; end: number; total: number }
  sort: WorkSortOrder
  labels: Labels
}

export function WorkExplorer({
  action,
  cards,
  categories,
  category,
  page,
  pageCount,
  query,
  result,
  sort,
  labels,
}: Props) {
  const hrefFor = (
    nextPage: number,
    nextCategory = category,
    nextSort: WorkSortOrder = sort,
    nextQuery = query,
  ) => {
    const params = new URLSearchParams()
    if (nextQuery) params.set('q', nextQuery)
    if (nextCategory) params.set('category', nextCategory)
    if (nextPage > 1) params.set('page', String(nextPage))
    if (nextSort === 'asc') params.set('sort', nextSort)

    const search = params.toString()
    return search ? `${action}?${search}` : action
  }
  const count = labels.resultCount
    .replace('{start}', String(result.start))
    .replace('{end}', String(result.end))
    .replace('{total}', String(result.total))
  const hasFilters = query !== '' || category !== null

  return (
    <div>
      <form action={action} method="get" className="space-y-4">
        <div className="flex max-w-md gap-2">
          <label htmlFor="work-search" className="sr-only">
            {labels.searchLabel}
          </label>
          <Input
            id="work-search"
            name="q"
            type="search"
            defaultValue={query}
            placeholder={labels.searchPlaceholder}
            className="h-11 rounded-full px-4"
          />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {sort === 'asc' ? <input type="hidden" name="sort" value={sort} /> : null}
          <Button type="submit" className="shrink-0 rounded-full">
            {labels.searchButton}
          </Button>
        </div>

        <div role="group" aria-label={labels.categoryFilterLabel} className="flex flex-wrap gap-2">
          {[{ value: null, label: labels.allCategories }, ...categories].map((option) => (
            <Link
              key={option.value ?? 'all'}
              href={hrefFor(1, option.value)}
              aria-current={category === option.value ? 'true' : undefined}
              className={buttonVariants({
                size: 'sm',
                variant: category === option.value ? 'default' : 'outline',
                className: 'rounded-full',
              })}
            >
              {option.label}
            </Link>
          ))}
          {hasFilters ? (
            <Link
              href={action}
              className={buttonVariants({
                size: 'sm',
                variant: 'ghost',
                className: 'rounded-full',
              })}
            >
              {labels.clearFilters}
            </Link>
          ) : null}
        </div>
      </form>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="text-muted-foreground font-mono text-xs">
          {count}
        </p>
        <Link
          href={hrefFor(1, category, sort === 'desc' ? 'asc' : 'desc')}
          aria-label={sort === 'desc' ? labels.sortOldestFirst : labels.sortNewestFirst}
          title={sort === 'desc' ? labels.sortOldestFirst : labels.sortNewestFirst}
          className={buttonVariants({ variant: 'ghost', size: 'icon' })}
        >
          {sort === 'desc' ? (
            <ArrowDownWideNarrow aria-hidden="true" className="size-4" />
          ) : (
            <ArrowUpWideNarrow aria-hidden="true" className="size-4" />
          )}
        </Link>
      </div>

      {cards.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-5">
          {cards.map((card) => (
            <li key={card.slug}>
              <WorkCard card={card} viewDetails={labels.viewDetails} as="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-border mt-4 rounded-2xl border border-dashed p-8 text-center">
          <p className="text-muted-foreground">{labels.noResults}</p>
        </div>
      )}

      {pageCount > 1 ? (
        <nav aria-label={labels.paginationLabel} className="mt-8">
          <ul className="flex flex-wrap items-center justify-center gap-2">
            {page > 1 ? (
              <li>
                <Link
                  href={hrefFor(page - 1)}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  {labels.previousPage}
                </Link>
              </li>
            ) : null}
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
              <li key={pageNumber}>
                <Link
                  href={hrefFor(pageNumber)}
                  aria-label={labels.pageNumberLabel.replace('{page}', String(pageNumber))}
                  aria-current={pageNumber === page ? 'page' : undefined}
                  className={buttonVariants({
                    variant: pageNumber === page ? 'default' : 'outline',
                    size: 'sm',
                  })}
                >
                  {pageNumber}
                </Link>
              </li>
            ))}
            {page < pageCount ? (
              <li>
                <Link
                  href={hrefFor(page + 1)}
                  className={buttonVariants({ variant: 'outline', size: 'sm' })}
                >
                  {labels.nextPage}
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </div>
  )
}
