import { WorkListPage } from '@/components/work/work-list-page'
import type { Locale } from '@/lib/i18n'
import type { WorkListSearchParams } from '@/lib/work-pagination'

export default async function ActivitiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<WorkListSearchParams>
}) {
  const [{ locale }, filters] = await Promise.all([params, searchParams])
  return <WorkListPage locale={locale} kind="activities" searchParams={filters} />
}
