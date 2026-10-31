import { WorkDetailPage } from '@/components/work/work-detail-page'
import { getItems } from '@/lib/work'
import type { Locale } from '@/lib/i18n'

export const dynamicParams = false

export function generateStaticParams() {
  return getItems('projects').map(({ slug }) => ({ slug }))
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  return <WorkDetailPage locale={locale} kind="projects" slug={slug} />
}
