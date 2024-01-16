import { expect, test } from 'vitest'

const baseUrl = 'http://localhost:3000'

test('Ping', async () => {
  const res = await fetch(`${baseUrl}/ping`)
  expect(res.status).toBe(200)
  expect(await res.text()).toBe('pong')
})
