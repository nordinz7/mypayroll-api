import { SevenBoom } from 'graphql-apollo-errors'
import { ActiveStatus, type CreateUserInput, type SignInInput, type UpdateUserInput, type UserQueryInput } from '../../types'
import type { Context } from '../../plugins/graphql'
import Joi from 'joi'
import { Op } from 'sequelize'
import { validateUserInput } from './helper'
import { signJWT } from '../../utils/auth'
import { compare } from 'bcryptjs'

export const getUser = async (uuid: string, ctx: Context) => {
  if (!uuid) {
    throw SevenBoom.badData('Missing user uuid')
  }

  const user = await ctx.sequelize.models.user.findByPk(uuid)

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

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

  return user.dataValues
}

export const updateUser = async (input: UpdateUserInput, ctx: Context) => {
  const value = await validateUserInput(input, 'update')

  const { uuid, ...rest } = value

  const user = await ctx.sequelize.models.user.findByPk(uuid)

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  return (await user.update({ ...rest })).dataValues
}

export const deleteUser = async (uuid: string, ctx: Context) => {
  const user = await getUser(uuid, ctx)

  return (await user.update({ status: ActiveStatus.Deleted })).dataValues
}

export const unDeleteUser = async (uuid: string, ctx: Context) => {
  const user = await getUser(uuid, ctx)

  return (await user.update({ status: ActiveStatus.Active })).dataValues
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

  const jwt = await signJWT({ user: user.dataValues })

  return { jwt }
}

export const signUp = async (input: CreateUserInput, ctx: Context) => {
  const user = await createUser(input, ctx)

  const jwt = await signJWT({ user })

  return { jwt }
}

export const resetPassword = async (email: string, ctx: Context) => {
  const user = await ctx.sequelize.models.user.findOne({ where: { email } })

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  return { message: 'Password reset link sent' }
}
