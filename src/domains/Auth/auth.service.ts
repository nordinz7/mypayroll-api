import type { RegisterInput } from "../../types"
import { DbSingleton } from "../../utils/db"
import schemaValidator from "../../utils/schemaValidator"
import { loginSchema, registerSchema } from "./validation"
import { SevenBoom } from "graphql-apollo-errors"
import jwt from 'jsonwebtoken'

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw SevenBoom.badRequest('Missing Email or Password')
  }

  const valid = schemaValidator({email, password}, loginSchema)

  if (!valid) {
    throw SevenBoom.badRequest('Invalid data')
  }

  const db = await DbSingleton.getInstance()

  const user = await db.users.findOne({ email: valid.email })

  if (!user) {
    throw SevenBoom.notFound('User not found')
  }

  if (user.password !== password) {
    throw SevenBoom.unauthorized('Password incorrect')
  }


  const token  = await jwt.sign(user, Bun.env.SECRET_KEY || 'secret')

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

  const db = await DbSingleton.getInstance()

  const query = { $or: [{email: valid.email}, {username: valid.username}] }

  const user = await db.users.findOne(query)

  if (user) {
    throw SevenBoom.badRequest('User already exists')
  }

  const newUser = await db.users.insertOne(valid)

  return { message: 'Success register', data: newUser, success: true }
}