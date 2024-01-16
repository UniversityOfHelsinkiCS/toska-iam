import { baseUrl } from './config'
import { ALL_USERS } from './data'

export const seed = async () => {
  await fetch(`${baseUrl}/test/users`, {
    body: ALL_USERS,
    method: 'POST',
  })
}
