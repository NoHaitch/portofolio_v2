import { WorkExplorer } from '@/components/work/work-explorer'
import { getLocalePath, getMessages, type Locale } from '@/lib/i18n'
import { getItems, sortByDateAsc, toCardData, type WorkKind } from '@/lib/work'
import { filterCards } from '@/lib/work-filter'
import {
  paginateItems,
  parsePage,
  type WorkListSearchParams,
  type WorkSortOrder,
} from '@/lib/work-pagination'
import { activityCategories, projectCategories } from '@/lib/work-schema'

export function WorkListPage({
  locale,
  kind,
  searchParams,
}: {
  locale: Locale
  kind: WorkKind
  searchParams: WorkListSearchParams
}) {
  const messages = getMessages(locale)
  const pageMessages =
    kind === 'projects' ? messages.work.projectsPage : messages.work.activitiesPage
  const categories = (kind === 'projects' ? projectCategories : activityCategories).map(
    (value) => ({ value, label: messages.work.categories[value] }),
  )
  const query = typeof searchParams.q === 'string' ? searchParams.q.trim() : ''
  const category = categories.find(({ value }) => value === searchParams.category)?.value ?? null
  const sort: WorkSortOrder = searchParams.sort === 'asc' ? 'asc' : 'desc'
  const items = getItems(kind)
  const orderedItems = sort === 'asc' ? sortByDateAsc(items) : items
  const filteredCards = filterCards(
    orderedItems.map((item) => toCardData(item, locale, messages)),
    query,
    category,
  )
  const resultPage = paginateItems(filteredCards, parsePage(searchParams.page))

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="text-primary mb-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
          {pageMessages.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{pageMessages.title}</h1>
        <p className="text-muted-foreground mt-4 leading-7 sm:text-lg sm:leading-8">
          {pageMessages.introduction}
        </p>
      </header>

      <WorkExplorer
        action={getLocalePath(locale, `/work/${kind}`)}
        cards={resultPage.items}
        categories={categories}
        category={category}
        page={resultPage.page}
        pageCount={resultPage.pageCount}
        query={query}
        result={{ start: resultPage.start, end: resultPage.end, total: resultPage.total }}
        sort={sort}
        labels={{
          searchLabel: pageMessages.searchLabel,
          searchPlaceholder: pageMessages.searchPlaceholder,
          searchButton: messages.work.searchButton,
          allCategories: messages.work.allCategories,
          categoryFilterLabel: messages.work.categoryFilterLabel,
          resultCount: messages.work.resultCount,
          noResults: messages.work.noResults,
          clearFilters: messages.work.clearFilters,
          viewDetails: messages.work.viewDetails,
          paginationLabel: messages.work.paginationLabel,
          previousPage: messages.work.previousPage,
          nextPage: messages.work.nextPage,
          pageNumberLabel: messages.work.pageNumberLabel,
          sortOldestFirst: messages.experience.sortOldestFirst,
          sortNewestFirst: messages.experience.sortNewestFirst,
        }}
      />
    </main>
  )
}
