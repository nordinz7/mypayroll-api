import type { Context } from '../..'
import type { MutationCreateUserArgs, MutationDeleteUserArgs, MutationResetPasswordArgs, MutationSignInArgs, MutationUnDeleteUserArgs, MutationUpdateUserArgs, QueryUserArgs, QueryUsersArgs } from '../../types'
import { attachRefreshTokenToCookie, createUser, deleteUser, getUser, getUsers, handleRefreshToken, resetPassword, signIn, signUp, unDeleteUser, updateUser } from './user.service'

export default {
  Query: {
    user: async (_: any, { uuid }: QueryUserArgs, ctx: Context) => {
      return getUser(uuid, ctx)
    },
    users: async (_: any, { input }: QueryUsersArgs, ctx: Context) => {
      return getUsers(input, ctx)
    }
  },
  Mutation: {
    createUser: async (_: any, { input }: MutationCreateUserArgs, ctx: Context) => {
      const res = createUser(input, ctx)

      await ctx.addEvent(ctx, {
        model: 'user',
        action: 'create',
        payload: input
      })

      return res
    },
    updateUser: async (_: any, { input }: MutationUpdateUserArgs, ctx: Context) => {
      const res = updateUser(input, ctx)

      await ctx.addEvent(ctx, {
        model: 'user',
        action: 'update',
        payload: input
      })

      return res
    },
    deleteUser: async (_: any, { uuid }: MutationDeleteUserArgs, ctx: Context) => {
      return deleteUser(uuid, ctx)
    },
    unDeleteUser: async (_: any, { uuid }: MutationUnDeleteUserArgs, ctx: Context) => {
      return unDeleteUser(uuid, ctx)
    },
    signUp: async (_: any, { input }: MutationCreateUserArgs, ctx: Context) => {
      const res = await signUp(input, ctx)
      attachRefreshTokenToCookie(res.refreshToken, { request: ctx.request })
      return res
    },
    signIn: async (_: any, { input }: MutationSignInArgs, ctx: Context) => {
      const res = await signIn(input, ctx)
      attachRefreshTokenToCookie(res.refreshToken, { request: ctx.request })
      return res
    },
    refreshToken: async (_: any, __: any, ctx: Context) => {
      return handleRefreshToken(ctx)
    },
    resetPassword: async (_: any, { email }: MutationResetPasswordArgs, ctx: Context) => {
      return resetPassword(email, ctx)
    }
  }
}
