import type { MutationLoginArgs, MutationRegisterArgs } from '../../types'
import { login, register } from './auth.service'

export default {
  Mutation: {
    login: async (_: any, { email, password }: MutationLoginArgs, __: any) => {
      return login(email, password)
    },
    register: async (_: any, { input }: MutationRegisterArgs, __: any) => {
      return register(input)
    }
  }
}
