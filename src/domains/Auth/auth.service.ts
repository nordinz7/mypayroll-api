import { Op } from 'sequelize'
import type { RegisterInput } from '../../types'
import schemaValidator from '../../utils/schemaValidator'
import { loginSchema, registerSchema } from './validation'
import { SevenBoom } from 'graphql-apollo-errors'
import jwt from 'jsonwebtoken'
import type { Context } from '../../plugins/graphql'

export const login = async (email: string, password: string, ctx: Context) => {
  if (!email || !password) {
    throw SevenBoom.badRequest('Missing Email or Password')
  }

  const valid = schemaValidator({ email, password }, loginSchema)

  if (!valid) {
    throw SevenBoom.badRequest('Invalid data')
  }

  const user = await ctx.sequelize.models.users.findOne({ where: { email: valid.email } })

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  if (user.password !== password) {
    throw SevenBoom.unauthorized('Password incorrect')
  }

  const token = await jwt.sign(user, Bun.env.SECRET_KEY || 'secret')

  return { message: 'Success login', data: token, success: true }
}

export const register = async (input: RegisterInput | undefined | null, ctx: Context) => {
  if (!input) {
    throw SevenBoom.badRequest('Missing input')
  }

  const valid = schemaValidator(input, registerSchema)

  if (!valid) {
    throw SevenBoom.badRequest('Invalid data')
  }

  const where = { [Op.or]: [{ email: valid.email }, { username: valid.username }] }

  const user = await ctx.sequelize.models.users.findOne({ where })

  if (user) {
    throw SevenBoom.badRequest('User already exists')
  }

  const newUser = await ctx.sequelize.models.users.create(valid)

  return { message: 'Success register', data: newUser, success: true }
}
