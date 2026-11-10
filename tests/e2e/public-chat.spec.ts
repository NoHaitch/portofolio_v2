import { expect, test } from '@playwright/test'

test('public chat explains the assistant and offers suggested questions and human help', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open chat' }).click()
  const chat = page.getByRole('complementary', { name: 'Message Francisco' })
  await expect(chat.getByText('An AI assistant answers questions', { exact: false })).toBeVisible()
  await expect(chat.getByRole('button', { name: 'Who is Francisco?' })).toBeVisible()
  await expect(chat.getByRole('button', { name: 'Ask Francisco directly' })).toBeVisible()
  const button = await chat.getByRole('button', { name: 'Who is Francisco?' }).boundingBox()
  expect(button?.height).toBeGreaterThanOrEqual(32)
})

test('public assistant endpoint rejects unauthenticated requests', async ({ request }) => {
  const response = await request.post('/api/chat/assistant', {
    data: {
      conversationId: 'A'.repeat(20),
      messageId: 'B'.repeat(20),
      locale: 'en',
      mode: 'assistant',
    },
  })
  expect(response.status()).toBe(401)
})
