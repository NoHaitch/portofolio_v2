import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import { expect, test } from '@playwright/test'

const locales = ['en', 'id', 'ja', 'zh']
const staticPages = [
  '/',
  '/about',
  '/about-site',
  '/experience',
  '/education',
  '/contact',
  '/work',
  '/work/projects',
  '/work/activities',
]
const detailPages = ['projects', 'activities'].flatMap((kind) =>
  readdirSync(join(process.cwd(), 'content', 'work', kind))
    .filter((file) => file.endsWith('.md'))
    .map((file) => `/work/${kind}/${file.slice(0, -3)}`),
)
const paths = [...staticPages, ...detailPages]

for (const locale of locales) {
  test(`${locale} pages render`, async ({ page }) => {
    test.setTimeout(240_000)
    for (const path of paths) {
      const url = locale === 'en' ? path : `/${locale}${path === '/' ? '' : path}`
      const response = await page.goto(url)
      expect(response?.status(), url).toBe(200)
      await expect(page.getByRole('main'), url).toBeVisible()
      await expect(page.getByRole('heading', { level: 1 }), url).toBeVisible()
    }
  })
}
