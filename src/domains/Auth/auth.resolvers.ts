import type { Context } from '../../plugins/graphql'
import type { MutationLoginArgs, MutationRegisterArgs } from '../../types'
import { login, register } from './auth.service'

export default {
  Mutation: {
    login: async (_: any, { email, password }: MutationLoginArgs, ctx: Context) => {
      return login(email, password, ctx)
    },
    register: async (_: any, { input }: MutationRegisterArgs, ctx: Context) => {
      return register(input, ctx)
    }
  }
}
