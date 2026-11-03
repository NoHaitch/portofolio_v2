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
    await page.getByRole('link', { name: 'View all projects', exact: true }).click()
    await expect(page).toHaveURL(/\/work\/projects$/)

    await page.goto('/work')
    await page.getByRole('link', { name: 'View selected activities', exact: true }).click()
    await expect(page).toHaveURL(/\/work\/activities$/)
  })

  test('project and activity lists show eight items per page', async ({ page }) => {
    for (const { path, secondPageCount } of [
      { path: '/work/projects', secondPageCount: 8 },
      { path: '/work/activities', secondPageCount: 2 },
    ]) {
      await page.goto(path)

      const resultCount = await page.getByText(/^Showing \d+-\d+ of \d+$/).textContent()
      const total = Number((/of (\d+)/.exec(resultCount || '') || [])[1])
      expect(total).toBeGreaterThan(8)
      const cardList = page
        .getByRole('list')
        .filter({ has: page.getByRole('heading', { level: 2 }) })
      await expect(cardList.locator(':scope > li')).toHaveCount(8)

      await page.getByRole('link', { name: 'Page 2' }).click()
      await expect(page).toHaveURL(/page=2/)
      await expect(cardList.locator(':scope > li')).toHaveCount(secondPageCount)
      await expect(page.getByRole('link', { name: 'Page 2' })).toHaveAttribute(
        'aria-current',
        'page',
      )

      if (path === '/work/projects') {
        await page.getByRole('link', { name: 'Personal', exact: true }).click()
        await expect(page).toHaveURL(/category=personal/)
        await expect(page).not.toHaveURL(/page=/)
        await expect(page.getByRole('link', { name: 'Personal', exact: true })).toHaveAttribute(
          'aria-current',
          'true',
        )
      }
    }
  })

  test('sort toggles between oldest and newest dates and resets to page one', async ({ page }) => {
    await page.goto('/work/projects?page=2')
    const cardList = page.getByRole('list').filter({ has: page.getByRole('heading', { level: 2 }) })
    const dates = cardList.locator('time')

    const newestFirst = await dates.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('datetime')),
    )
    expect(newestFirst).toEqual([...newestFirst].sort().reverse())

    await page.getByRole('link', { name: 'Show oldest first' }).click()
    await expect(page).toHaveURL(/sort=asc/)
    await expect(page).not.toHaveURL(/page=/)

    const oldestFirst = await dates.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('datetime')),
    )
    expect(oldestFirst).toEqual([...oldestFirst].sort())

    await page.getByRole('link', { name: 'Show newest first' }).click()
    await expect(page).not.toHaveURL(/sort=/)
    const newestFirstAgain = await dates.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('datetime')),
    )
    expect(newestFirstAgain).toEqual([...newestFirstAgain].sort().reverse())
  })

  test('search filters the list and can be cleared', async ({ page }) => {
    await page.goto('/work/projects')
    const count = await page.getByText(/^Showing \d+-\d+ of \d+$/).textContent()
    const total = Number((/of (\d+)/.exec(count || '') || [])[1])
    expect(total).toBeGreaterThan(8)

    await page.getByRole('searchbox').fill('Password Game')
    await page.getByRole('button', { name: 'Search' }).click()
    await expect(page).toHaveURL(/q=Password(?:\+|%20)Game/)
    await expect(page.getByText('Showing 1-1 of 1')).toBeVisible()
    const cardList = page.getByRole('list').filter({ has: page.getByRole('heading', { level: 2 }) })
    await expect(cardList.locator(':scope > li')).toHaveCount(1)

    await page.getByRole('searchbox').fill('zzzz-no-match')
    await page.getByRole('button', { name: 'Search' }).click()
    await expect(page.getByText('Showing 0-0 of 0')).toBeVisible()
    await page.getByRole('link', { name: 'Clear filters' }).click()
    await expect(page).toHaveURL(/\/work\/projects$/)
    await expect(page.getByText(`Showing 1-8 of ${total}`)).toBeVisible()
  })

  test('a card opens its detail page and back link returns', async ({ page }) => {
    await page.goto('/work/projects?q=Password+Game')
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
