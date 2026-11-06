import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/about',
  '/about-site',
  '/experience',
  '/education',
  '/contact',
  '/work',
  '/work/projects',
  '/work/activities',
  '/work/projects/dbms',
]

test('theme toggle switches from an explicitly selected light theme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' })
  await page.addInitScript(() => window.localStorage.setItem('theme', 'light'))
  await page.goto('/')
  const html = page.locator('html')
  await expect(html).not.toHaveClass(/dark/)

  await page.getByRole('button', { name: /Switch to (dark|light) mode/ }).click()
  await expect(html).toHaveClass(/dark/)
  await page.getByRole('button', { name: /Switch to (dark|light) mode/ }).click()
  await expect(html).not.toHaveClass(/dark/)
})

test('all pages render the light footer palette', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ colorScheme: 'light' })
  await page.addInitScript(() => window.localStorage.setItem('theme', 'light'))

  for (const route of routes) {
    await page.goto(route)
    await expect(page.locator('html')).not.toHaveClass(/dark/)
    const footer = page.locator('footer')
    await expect(footer).toHaveCSS('background-color', 'rgb(232, 239, 238)')
    await expect(footer.locator('a').first()).toHaveCSS('color', 'rgb(88, 107, 110)')
    await expect(footer.locator('p').nth(1)).toHaveCSS('color', 'rgb(88, 107, 110)')
    await expect(footer.locator('p').nth(2)).toHaveCSS('color', 'rgb(88, 107, 110)')
    await expect(footer.locator('h2').first()).toHaveCSS('color', 'rgb(0, 110, 104)')
  }

  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('/')
  const footer = page.locator('footer')
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  await expect(footer.locator('a').first()).toHaveCSS('color', 'rgb(88, 107, 110)')
  await expect(footer.locator('h2').first()).toHaveCSS('color', 'rgb(0, 110, 104)')
})
