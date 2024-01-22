import { describe, expect, it } from "vitest";
import { api } from "./utils";
import { mapToDegreeCode } from "../src/auth/common";

const degreeCode = mapToDegreeCode('200-K001')

describe.concurrent('Jory', () => {

  it('Gets read access to program', async () => {
    const res = await api.post('', {
      userId: 'oiktdk-jory-member',
      iamGroups: ['hy-oiktdk-on-jory'],
    })
  
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty(degreeCode)
    expect(json[degreeCode].read).toBe(true)
    expect(json[degreeCode].write).toBeFalsy()
    expect(json[degreeCode].admin).toBeFalsy()
  })

  it('Gets jory special group', async () => {
    const res = await api.post('', {
      userId: 'oiktdk-jory-member',
      iamGroups: ['hy-oiktdk-on-jory'],
    })
  
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty('specialGroup')
    expect(json.specialGroup).toHaveProperty('jory')
    expect(json.specialGroup.jory).toBe(true)
  })

  it('with kojo group gets program admin access', async () => {
    const res = await api.post('', {
      userId: 'oikis-kojo',
      iamGroups: ['hy-oiktdk-on-jory', 'hy-oiktdk-kandi-kojot'],
    })
  
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      [degreeCode]: {
        read: true,
        write: true,
        admin: true,
      },
      specialGroup: {
        jory: true,
      },
    })
  })

})