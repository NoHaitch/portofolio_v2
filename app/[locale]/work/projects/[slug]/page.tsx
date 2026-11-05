import { WorkDetailPage } from '@/components/work/work-detail-page'
import { getItems } from '@/lib/work'
import { getItem } from '@/lib/work'
import { pageMetadata } from '@/lib/i18n/metadata'
import type { Locale } from '@/lib/i18n'

export const dynamicParams = false

export function generateStaticParams() {
  return getItems('projects').map(({ slug }) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const item = getItem('projects', slug)
  return pageMetadata(locale, item?.title ?? 'Project')
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  return <WorkDetailPage locale={locale} kind="projects" slug={slug} />
}
