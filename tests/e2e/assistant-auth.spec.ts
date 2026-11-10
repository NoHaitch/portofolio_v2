import { expect, test } from '@playwright/test'

test('assistant endpoint rejects unauthenticated requests', async ({ request }) => {
  const response = await request.post('/api/admin/assistant', {
    data: { question: 'Who is Francisco?', history: [] },
  })

  expect(response.status()).toBe(401)
  expect(await response.json()).toEqual({ error: 'Sign in to use the assistant.' })
})
