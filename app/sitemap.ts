import type { MetadataRoute } from 'next'
import { getItems } from '@/lib/work'
import { getLocalePath, locales } from '@/lib/i18n'
import { SITE_URL } from '@/lib/site'

const publicPages = [
  '/',
  '/about',
  '/about-site',
  '/contact',
  '/education',
  '/experience',
  '/work',
  '/work/projects',
  '/work/activities',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedPages = locales.flatMap((locale) =>
    publicPages.map((pathname) => ({
      url: `${SITE_URL}${getLocalePath(locale, pathname)}`,
    })),
  )

  const workPages = (['projects', 'activities'] as const).flatMap((kind) =>
    getItems(kind).flatMap((item) =>
      locales.map((locale) => ({
        url: `${SITE_URL}${getLocalePath(locale, `/work/${kind}/${item.slug}`)}`,
      })),
    ),
  )

  return [...localizedPages, ...workPages]
}
