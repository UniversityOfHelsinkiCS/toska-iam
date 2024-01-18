import { expect, test, beforeAll } from 'vitest'
import { api } from './utils'
import { seed } from './seed'
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

test('User with program manager group gets read access', async () => {
  const res = await api.post('', {
    userId: 'tkt-jory-member',
    iamGroups: ['hy-mltdk-tkt-jory'],
  })

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({
    [mapToDegreeCode('500-K005')]: {
      read: true,
      write: false,
      admin: false,
    },
    specialGroup: {
      jory: true,
    },
  })
})

test('User with program manager group and kojo group gets program admin access', async () => {
  const res = await api.post('', {
    userId: 'tkt-kojo',
    iamGroups: ['hy-mltdk-tkt-jory', 'hy-mltdk-kandi-kojot'],
  })

  expect(res.status).toBe(200)
  expect(await res.json()).toEqual({
    [mapToDegreeCode('500-K005')]: {
      read: true,
      write: true,
      admin: true,
    },
    specialGroup: {
      jory: true,
    },
  })
})
