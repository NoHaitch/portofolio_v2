import { WorkDetailPage } from '@/components/work/work-detail-page'
import { getItem, getItems } from '@/lib/work'
import { pageMetadata } from '@/lib/i18n/metadata'
import type { Locale } from '@/lib/i18n'

export const dynamicParams = false

export function generateStaticParams() {
  return getItems('activities').map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const item = getItem('activities', slug)
  return pageMetadata(locale, item?.title ?? 'Activity')
}

export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  return <WorkDetailPage locale={locale} kind="activities" slug={slug} />
}
