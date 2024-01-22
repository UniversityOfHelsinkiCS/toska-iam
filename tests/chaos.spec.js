import { describe, expect, it } from 'vitest'
import { relevantIAMs } from '../src/auth/IAMConfig'
import { api } from './util/utils'

describe('Chaos test', () => {

  it('User IAM endpoint should not crash', async () => {
  
    const getRandomIams = () => {
      const randomIams = []
      for (let i = 0; i < 5 + Math.ceil(Math.random() * 10); i++) {
        // 50% are random strings
        if (Math.random() < 0.5) {
          randomIams.push(Math.random().toString(36).substring(2, 15))
        } else {
          const randomIam = relevantIAMs[Math.floor(Math.random() * relevantIAMs.length)]
          randomIams.push(randomIam)
        }
      }
      return randomIams
    }

    for (let i = 0; i < 100; i++) {
      api.post('', {
        userId: 'user-1',
        iamGroups: getRandomIams(),
      }).then(async res => {
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json).toHaveProperty('specialGroup')
      })
    }
  })
})