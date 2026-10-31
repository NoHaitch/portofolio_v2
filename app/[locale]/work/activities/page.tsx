import { WorkListPage } from '@/components/work/work-list-page'
import type { Locale } from '@/lib/i18n'

export default async function ActivitiesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  return <WorkListPage locale={locale} kind="activities" />
}
