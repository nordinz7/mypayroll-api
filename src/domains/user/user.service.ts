import { SevenBoom } from 'graphql-apollo-errors'
import { ActiveStatus, type CreateUserInput, type SignInInput, type UpdateUserInput, type User, type UserQueryInput } from '../../types'
import Joi from 'joi'
import { Op } from 'sequelize'
import { validateUserInput } from './helper'
import { signJWT } from '../../utils/auth'
import { compare, hash } from 'bcryptjs'
import { pick } from 'lodash'
import type { Context } from '../..'
import config from '../../../config'
import ms from 'ms'

export const getUser = async (uuid: string, ctx: Context) => {
  if (!uuid) {
    throw SevenBoom.badData('Missing user uuid')
  }

  const cacheKey = `user:${uuid}`
  const cachedUser = await ctx.cache.get(cacheKey)

  if (cachedUser) {
    return cachedUser
  }

  const user = await ctx.sequelize.models.user.findByPk(uuid, { raw: true, nest: true })

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  await ctx.cache.set(cacheKey, user)

  return user
}

export const getUsers = async (input: UserQueryInput, ctx: Context) => {
  const usersSchema = Joi.object({
    limit: Joi.number().default(10),
    offset: Joi.number().default(0),
    q: Joi.string().optional().allow('')
  })

  const { error, value } = usersSchema.validate(input)

  if (error) {
    throw SevenBoom.badRequest(error.message)
  }

  const { limit, offset, q } = value

  const query = q?.trim()

  const where: any = {}

  if (query) {
    where[Op.or] = [
      { name: { [Op.like]: `%${query}%` } },
      { email: { [Op.like]: `%${query}%` } }
    ]
  }

  const { count, rows = [] } = await ctx.sequelize.models.user.findAndCountAll({
    where,
    limit,
    offset
  })

  return { rows, pageInfo: { count, limit, offset } }
}

export const createUser = async (input: CreateUserInput, ctx: Context) => {
  const value = await validateUserInput(input)

  const { email } = value

  const userExists = await ctx.sequelize.models.user.findOne({
    where: {
      email
    }
  })

  if (userExists) {
    throw SevenBoom.badRequest('User already exists')
  }

  const user = await ctx.sequelize.models.user.create({ ...value })

  return user.toJSON()
}

export const updateUser = async (input: UpdateUserInput, ctx: Context) => {
  const value = await validateUserInput(input, 'update')

  const { uuid, ...rest } = value

  const user = await ctx.sequelize.models.user.findByPk(uuid)

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  return (await user.update({ ...rest })).toJSON()
}

export const deleteUser = async (uuid: string, ctx: Context) => {
  const user = await getUser(uuid, ctx)

  return (await user.update({ status: ActiveStatus.Deleted })).toJSON()
}

export const unDeleteUser = async (uuid: string, ctx: Context) => {
  const user = await getUser(uuid, ctx)

  return (await user.update({ status: ActiveStatus.Active })).toJSON()
}

export const getUpdatedRefreshTokenFromDb = async (token: string, userUuid: string, ctx: Context) => {
  if (!userUuid) {
    throw SevenBoom.badData('Missing user uuid')
  }

  if (!token) {
    throw SevenBoom.badData('Missing token')
  }

  const existingTokens = await ctx.sequelize.models.refreshToken.findAll({ where: { userUuid }, order: [['createdAt', 'DESC']] })

  if (existingTokens.filter(t => t.dataValues.expiresAt > new Date()).length > 0) {
    const existingToken = existingTokens[0]

    await Promise.all(existingTokens.slice(1).map(async (t) => t.destroy()))

    return existingToken.toJSON().token
  }

  await ctx.sequelize.models.refreshToken.create({ token, userUuid, expiresAt: new Date(Date.now() + ms(config.REFRESH_TOKEN_EXPIRES_IN)) })

  return token
}

export const issueAccessToken = async (user: any, ctx: Context) => {
  if (!user || !user.uuid) {
    throw SevenBoom.badData('Missing user')
  }

  return signJWT({ user })
}

export const issueRefreshToken = async (user: any, ctx: Context) => {
  if (!user || !user.uuid) {
    throw SevenBoom.badData('Missing user')
  }

  let refreshToken = await signJWT({ user }, { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN })
  refreshToken = await getUpdatedRefreshTokenFromDb(refreshToken, user.uuid, ctx)

  return refreshToken
}

export const issueNewTokens = async (user: any, ctx: Context) => {
  const accessToken = await issueAccessToken(user, ctx)
  const refreshToken = await issueRefreshToken(user, ctx)

  return { accessToken, refreshToken }
}

export const signIn = async (input: SignInInput, ctx: Context) => {
  const signInSchema = Joi.object({ email: Joi.string().email().required(), password: Joi.string().required() })

  const { error, value } = signInSchema.validate(input)

  if (error) {
    throw SevenBoom.badRequest(error.message)
  }

  const { email, password } = value

  const user = await ctx.sequelize.models.user.findOne({ where: { email } })

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  const isValidPwd = await compare(password, user.password)

  if (!isValidPwd) {
    throw SevenBoom.badRequest('Invalid password')
  }

  const storeUser = pick(user.toJSON(), ['uuid', 'email', 'name'])

  await ctx.cache.set(`user:${storeUser.uuid}`, storeUser)

  return issueNewTokens(storeUser, ctx)
}

export const signUp = async (input: CreateUserInput, ctx: Context) => {
  const user = await createUser(input, ctx)

  return issueNewTokens(user, ctx)
}

export const resetPassword = async (email: string, ctx: Context) => {
  const user = await ctx.sequelize.models.user.findOne({ where: { email } })

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  return { message: 'Password reset link sent' }
}
