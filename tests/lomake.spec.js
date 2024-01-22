import { describe, expect, it } from "vitest";
import { api } from "./util/utils";

describe.concurrent('Lomake', () => {
  it('Katselmus iam gives the katselmus special group', async () => {
    const someKatselmusIam = 'grp-katselmus-ltdk'

    const res = await api.post('', {
      userId: 'katselmus',
      iamGroups: [someKatselmusIam],
    })
  
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json).toHaveProperty('specialGroup')
    expect(json.specialGroup).toHaveProperty('katselmusViewer')
    expect(json.specialGroup.katselmusViewer).toBe(true)
  })
})
