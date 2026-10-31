import { expect, test } from '@playwright/test'

const widths = [320, 375, 768, 1024]
const paths = [
  '/',
  '/about',
  '/experience',
  '/education',
  '/contact',
  '/work',
  '/work/projects',
  '/work/projects/dbms',
]

test.describe('no horizontal overflow', () => {
  for (const width of widths) {
    for (const path of paths) {
      test(`${path} at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 })
        await page.goto(path)
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        )
        expect(overflow).toBeLessThanOrEqual(0)
      })
    }
  }
})

test.describe('burger menu', () => {
  test.use({ viewport: { width: 375, height: 800 } })

  test('opens, navigates and closes', async ({ page }) => {
    await page.goto('/')
    const menu = page.locator('#mobile-menu')
    await expect(menu).toBeHidden()

    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(menu).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()

    await page.getByRole('button', { name: 'Open menu' }).click()
    await menu.getByRole('link', { name: 'Education' }).click()
    await expect(page).toHaveURL(/\/education$/)
    await expect(menu).toBeHidden()
  })

  test('language select works inside the menu', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.locator('#mobile-menu').getByRole('combobox').click()
    await page.getByRole('option', { name: 'ID' }).click()
    await expect(page).toHaveURL(/\/id\/contact$/)
  })
})

test('desktop shows the full nav without a burger', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeHidden()
  await expect(
    page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }),
  ).toBeVisible()
})
