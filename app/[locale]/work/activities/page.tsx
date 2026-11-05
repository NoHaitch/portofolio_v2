import { WorkListPage } from '@/components/work/work-list-page'
import type { Locale } from '@/lib/i18n'
import type { WorkListSearchParams } from '@/lib/work-pagination'
import { getMessages } from '@/lib/i18n'
import { pageMetadata } from '@/lib/i18n/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return pageMetadata(locale, getMessages(locale).work.activitiesPage.title)
}

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
