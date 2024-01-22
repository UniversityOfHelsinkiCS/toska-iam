import { expect, test, beforeAll } from 'vitest'
import { api } from './util/utils'
import { seed } from './util/seed'
import { mapToDegreeCode } from '../src/auth/common'

beforeAll(async () => {
  await seed()
})

test('Ping', async () => {
  const res = await api.get('ping')
  expect(res.status).toBe(200)
  expect(await res.text()).toBe('pong')
})

test('User with no iam groups gets no access', async () => {
  const res = await api.post('', { userId: 'user-1', iamGroups: [] })

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({
    specialGroup: {},
  })
})
