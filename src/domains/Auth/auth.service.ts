import { Op } from 'sequelize'
import type { RegisterInput } from '../../types'
import schemaValidator from '../../utils/schemaValidator'
import { DbSingletonSql } from '../../utils/sqldb'
import { loginSchema, registerSchema } from './validation'
import { SevenBoom } from 'graphql-apollo-errors'
import jwt from 'jsonwebtoken'

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw SevenBoom.badRequest('Missing Email or Password')
  }

  const valid = schemaValidator({ email, password }, loginSchema)

  if (!valid) {
    throw SevenBoom.badRequest('Invalid data')
  }

  const db = await DbSingletonSql.getInstance()

  const user = await db.models.users.findOne({ where: { email: valid.email } })

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  if (user.password !== password) {
    throw SevenBoom.unauthorized('Password incorrect')
  }

  const token = await jwt.sign(user, Bun.env.SECRET_KEY || 'secret')

  return { message: 'Success login', data: token, success: true }
}

export const register = async (input: RegisterInput | undefined | null) => {
  if (!input) {
    throw SevenBoom.badRequest('Missing input')
  }

  const valid = schemaValidator(input, registerSchema)

  if (!valid) {
    throw SevenBoom.badRequest('Invalid data')
  }

  const db = await DbSingletonSql.getInstance()

  const where = { [Op.or]: [{ email: valid.email }, { username: valid.username }] }

  const user = await db.models.users.findOne({ where })

  if (user) {
    throw SevenBoom.badRequest('User already exists')
  }

  const newUser = await db.models.users.create(valid)

  return { message: 'Success register', data: newUser, success: true }
}