import { WorkExplorer } from '@/components/work/work-explorer'
import { getLocalePath, getMessages, type Locale } from '@/lib/i18n'
import { getItems, sortByDateAsc, toCardData, type WorkKind } from '@/lib/work'
import { filterCards } from '@/lib/work-filter'
import {
  paginateItems,
  parsePage,
  parseSelectedValues,
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
  const allCards = items.map((item) => toCardData(item, locale, messages))
  const allApplicationTypes = [...new Set(allCards.flatMap((card) => card.applicationTypes))]
  const allFields = [...new Set(allCards.flatMap((card) => card.fields))]
  const applicationTypes = parseSelectedValues(searchParams.applicationType, allApplicationTypes)
  const fields = parseSelectedValues(searchParams.field, allFields)
  const matchingCards = filterCards(allCards, query, category)
  const orderedItems = sort === 'asc' ? sortByDateAsc(items) : items
  const orderedCards = orderedItems.map((item) => toCardData(item, locale, messages))
  const filteredCards = filterCards(orderedCards, query, category, applicationTypes, fields)
  const applicationTypeOptions = getFacetOptions(
    matchingCards.filter(
      (card) => fields.length === 0 || card.fields.some((field) => fields.includes(field)),
    ),
    'applicationTypes',
    applicationTypes,
  )
  const fieldOptions = getFacetOptions(
    matchingCards.filter(
      (card) =>
        applicationTypes.length === 0 ||
        card.applicationTypes.some((applicationType) => applicationTypes.includes(applicationType)),
    ),
    'fields',
    fields,
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
        applicationTypeOptions={applicationTypeOptions}
        applicationTypes={applicationTypes}
        fieldOptions={fieldOptions}
        fields={fields}
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
          noResults: kind === 'projects' ? messages.work.noProjectsFound : messages.work.noResults,
          clearFilters: messages.work.clearFilters,
          viewDetails: messages.work.viewDetails,
          paginationLabel: messages.work.paginationLabel,
          previousPage: messages.work.previousPage,
          nextPage: messages.work.nextPage,
          pageNumberLabel: messages.work.pageNumberLabel,
          sortOldestFirst: messages.experience.sortOldestFirst,
          sortNewestFirst: messages.experience.sortNewestFirst,
          applicationTypesLabel: messages.work.applicationTypesLabel,
          fieldsLabel: messages.work.fieldsLabel,
          applyFiltersButton: messages.work.applyFiltersButton,
        }}
      />
    </main>
  )
}

function getFacetOptions(
  cards: ReturnType<typeof toCardData>[],
  facet: 'applicationTypes' | 'fields',
  selected: string[],
) {
  const counts = new Map<string, number>()

  for (const card of cards) {
    for (const value of new Set(card[facet])) {
      counts.set(value, (counts.get(value) ?? 0) + 1)
    }
  }

  for (const value of selected) {
    if (!counts.has(value)) counts.set(value, 0)
  }

  return [...counts]
    .map(([value, count]) => ({ value, count }))
    .sort((left, right) => left.value.localeCompare(right.value))
}
