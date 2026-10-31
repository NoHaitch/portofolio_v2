import { WorkExplorer } from '@/components/work/work-explorer'
import { getMessages, type Locale } from '@/lib/i18n'
import { getItems, toCardData, type WorkKind } from '@/lib/work'
import { activityCategories, projectCategories } from '@/lib/work-schema'

export function WorkListPage({ locale, kind }: { locale: Locale; kind: WorkKind }) {
  const messages = getMessages(locale)
  const page = kind === 'projects' ? messages.work.projectsPage : messages.work.activitiesPage
  const categories = (kind === 'projects' ? projectCategories : activityCategories).map(
    (value) => ({ value, label: messages.work.categories[value] }),
  )
  const cards = getItems(kind).map((item) => toCardData(item, locale, messages))

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="text-primary mb-3 font-mono text-xs font-medium tracking-[0.18em] uppercase">
          {page.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{page.title}</h1>
        <p className="text-muted-foreground mt-4 leading-7 sm:text-lg sm:leading-8">
          {page.introduction}
        </p>
      </header>

      <WorkExplorer
        cards={cards}
        categories={categories}
        labels={{
          searchLabel: page.searchLabel,
          searchPlaceholder: page.searchPlaceholder,
          allCategories: messages.work.allCategories,
          categoryFilterLabel: messages.work.categoryFilterLabel,
          resultCount: messages.work.resultCount,
          noResults: messages.work.noResults,
          clearFilters: messages.work.clearFilters,
          viewDetails: messages.work.viewDetails,
        }}
      />
    </main>
  )
}
