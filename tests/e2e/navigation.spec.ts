import { expect, test } from '@playwright/test'

const pages = [
  { path: '/', heading: /Francisco/ },
  { path: '/about', heading: /Quiet by default/ },
  { path: '/experience', heading: 'Professional Experience' },
  { path: '/education', heading: 'Education' },
  { path: '/contact', heading: /connect/i },
  { path: '/work', heading: 'Projects and activities' },
  { path: '/work/projects', heading: 'All projects' },
  { path: '/work/activities', heading: 'Some recent activities' },
]

test.describe('pages', () => {
  for (const { path, heading } of pages) {
    test(`${path} renders its heading`, async ({ page }) => {
      const response = await page.goto(path)
      expect(response?.status()).toBe(200)
      await expect(page.getByRole('heading', { level: 1 })).toContainText(heading)
    })
  }

  test('unknown routes return 404', async ({ page }) => {
    const response = await page.goto('/does-not-exist')
    expect(response?.status()).toBe(404)
  })

  for (const { path } of pages) {
    test(`${path} has no broken images`, async ({ page }) => {
      // Large originals are optimized on first request, which can be slow on a cold cache.
      test.slow()
      await page.goto(path)
      // Fetching each URL avoids racing the browser's lazy loading and image decoding.
      const broken = await page.evaluate(async () => {
        const urls = Array.from(document.images).map((image) => image.currentSrc || image.src)
        const results = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url)
            const type = response.headers.get('content-type') || ''
            return response.ok && type.startsWith('image/') ? null : url
          }),
        )
        return results.filter((url) => url !== null)
      })
      expect(broken).toEqual([])
    })
  }
})

test.describe('navigation', () => {
  test('header links reach each page', async ({ page }) => {
    await page.goto('/')
    const nav = page.getByRole('navigation', { name: 'Main navigation' })

    await nav.getByRole('link', { name: 'Education' }).click()
    await expect(page).toHaveURL(/\/education$/)

    await nav.getByRole('link', { name: 'Contact' }).click()
    await expect(page).toHaveURL(/\/contact$/)

    await nav.getByRole('link', { name: 'Experience' }).click()
    await expect(page).toHaveURL(/\/experience$/)
  })

  test('footer shows the contact email', async ({ page }) => {
    await page.goto('/')
    await expect(
      page.getByRole('contentinfo').getByRole('link', { name: 'franciscotrianto@gmail.com' }),
    ).toHaveAttribute('href', 'mailto:franciscotrianto@gmail.com')
  })
})

test.describe('language and theme', () => {
  test('switching language keeps the current route', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('combobox', { name: 'Choose language' }).click()
    await page.getByRole('option', { name: 'ID' }).click()
    await expect(page).toHaveURL(/\/id\/contact$/)
  })

  test('theme toggle switches the dark class', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    await page.getByRole('button', { name: /Switch to (dark|light) mode/ }).click()
    const isDark = await html.evaluate((element) => element.classList.contains('dark'))
    await page.getByRole('button', { name: /Switch to (dark|light) mode/ }).click()
    await expect(html).toHaveClass(isDark ? /^((?!dark).)*$/ : /dark/)
  })
})

test.describe('experience timeline', () => {
  test('tabs switch the visible track', async ({ page }) => {
    await page.goto('/experience')
    await expect(page.getByRole('tab', { name: 'Software engineering' })).toHaveAttribute(
      'aria-selected',
      'true',
    )

    await page.getByRole('tab', { name: 'Teaching & academia' }).click()
    await expect(page.getByRole('tab', { name: 'Teaching & academia' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await expect(page.getByRole('tabpanel')).toBeVisible()
  })
})
