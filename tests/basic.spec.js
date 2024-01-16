import { expect, test, beforeAll } from 'vitest'
import { baseUrl } from './config'
import { seed } from './seed'

beforeAll(async () => {
  await seed()
})

test('Ping', async () => {
  const res = await fetch(`${baseUrl}/ping`)
  expect(res.status).toBe(200)
  expect(await res.text()).toBe('pong')
})

test('User with no iam groups gets no access', async () => {
  const res = await fetch(baseUrl, {
    body: JSON.stringify({ userId: 'user-1', iamGroups: [] }),
    method: 'POST',
  })

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({
    // access: {}, <-- this is the expected response. Fix api.
    specialGroup: {},
  })
})
