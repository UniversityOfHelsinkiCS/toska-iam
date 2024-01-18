import { api } from './utils'
import { ALL_USERS } from './data'

export const seed = async () => {
  await api.post('test/users', ALL_USERS)
}
