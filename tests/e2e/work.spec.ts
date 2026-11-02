import { expect, test } from '@playwright/test'

test.describe('work section', () => {
  test('homepage shows five recent projects and activities in separate columns', async ({
    page,
  }) => {
    await page.goto('/')

    for (const heading of ['Recent projects', 'Recent activities']) {
      const section = page
        .getByRole('heading', { name: heading, exact: true })
        .locator('xpath=ancestor::section[1]')
      const href = heading === 'Recent projects' ? '/work/projects' : '/work/activities'
      await expect(section.locator(`a[href="${href}"]`)).toBeVisible()
      await expect(section.locator('ul > li')).toHaveCount(5)
    }
  })

  test('recent activity detail pages render with their content', async ({ page }) => {
    const activities = [
      [
        'announcement-irk-assistant',
        'Announcement - Computational Science and Engineering Laboratory Assistant',
      ],
      ['comvis2024-lintasarta', 'HMIF Goes Out - Company Visit Lintasarta'],
      ['olimkm-itb-2024', 'HMIF Volleyball Team for OlimKM ITB 2024'],
      ['sparta2023', 'Materials & Methods - SPARTA HMIF 2023'],
      ['thesis-defence', 'Thesis Defence - Anonymity in Open Scientific Publishing'],
      ['itb-graduation-2026', 'Graduating from Institut Teknologi Bandung'],
    ]

    for (const [slug, title] of activities) {
      const response = await page.goto(`/work/activities/${slug}`)
      expect(response?.status(), slug).toBe(200)
      await expect(page.getByRole('heading', { level: 1 }), slug).toHaveText(title)
    }

    await page.goto('/work/activities/itb-graduation-2026')
    await expect(page.locator('iframe')).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/fEb7weuHhh0?start=8573',
    )
  })

  test('hub shows featured projects and recent activities', async ({ page }) => {
    await page.goto('/work')
    await expect(page.getByRole('link', { name: /DBMS from scratch/ })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Recent activities' })).toBeVisible()
    await expect(
      page
        .getByRole('region', { name: 'Featured projects' })
        .getByRole('link', { name: /View details/ }),
    ).toHaveCount(4)
  })

  test('view all buttons lead to the list pages', async ({ page }) => {
    await page.goto('/work')
    await page.locator('a[href="/work/projects"]').last().click()
    await expect(page).toHaveURL(/\/work\/projects$/)

    await page.goto('/work')
    await page.locator('a[href="/work/activities"]').last().click()
    await expect(page).toHaveURL(/\/work\/activities$/)
  })

  test('search filters the list and can be cleared', async ({ page }) => {
    await page.goto('/work/projects')
    const count = await page.getByText(/^Showing \d+ of \d+/).textContent()
    const total = Number((/of (\d+)/.exec(count || '') || [])[1])
    expect(total).toBeGreaterThan(8)

    await page.getByRole('searchbox').fill('Password Game')
    await expect(page.getByText(`Showing 1 of ${total}`)).toBeVisible()

    await page.getByRole('searchbox').fill('zzzz-no-match')
    await expect(page.getByText(`Showing 0 of ${total}`)).toBeVisible()
    await page.getByRole('button', { name: /clear/i }).click()
    await expect(page.getByText(`Showing ${total} of ${total}`)).toBeVisible()
  })

  test('a card opens its detail page and back link returns', async ({ page }) => {
    await page.goto('/work/projects')
    await page.getByRole('link', { name: /Password Game/ }).click()
    await expect(page).toHaveURL(/\/work\/projects\/password-game$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Password Game')

    await page.getByRole('link', { name: 'Back to all projects' }).click()
    await expect(page).toHaveURL(/\/work\/projects$/)
  })

  test('nav keeps Work highlighted on nested pages', async ({ page }) => {
    await page.goto('/work/projects/password-game')
    const nav = page.getByRole('navigation', { name: 'Main navigation' })
    await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'true')
  })

  test('unknown slugs return 404', async ({ page }) => {
    const response = await page.goto('/work/projects/nope')
    expect(response?.status()).toBe(404)
  })
})
