import { SevenBoom } from 'graphql-apollo-errors'
import Joi from 'joi'
import { ActiveStatus, type CreateUserInput } from '../../types'
import { v4 as uuidV4 } from 'uuid'

export const validateUserInput = (input: CreateUserInput) => {
  const createUserSchema = Joi.object({
    uuid: Joi.string().uuid().default(uuidV4()),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    status: Joi.string().valid(...Object.values(ActiveStatus)).default(ActiveStatus.Active)
  })

  const { error, value } = createUserSchema.validate(input)

  if (error) {
    throw SevenBoom.badRequest(error.message)
  }

  if (value.password !== value.confirmPassword) {
    throw SevenBoom.badRequest('Password does not match')
  }

  delete value.confirmPassword

  return value
}
