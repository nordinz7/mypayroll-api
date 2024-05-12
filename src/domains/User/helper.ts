import { SevenBoom } from 'graphql-apollo-errors'
import Joi from 'joi'
import { ActiveStatus, type CreateUserInput } from '../../types'

export const validateUserInput = (input: CreateUserInput) => {
  const createUserSchema = Joi.object({
    uuid: Joi.string().uuid().required(),
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
