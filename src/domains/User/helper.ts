import { SevenBoom } from 'graphql-apollo-errors'
import Joi from 'joi'
import { ActiveStatus } from '../../types'
import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcryptjs'

type ValidateUserType = 'create' | 'update'

export const validateUserInput = async (input: any, type:ValidateUserType = 'create') => {
  const createUserSchema = Joi.object({
    uuid: Joi.string().uuid().default(uuidV4()),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    status: Joi.string().valid(...Object.values(ActiveStatus)).default(ActiveStatus.Active)
  })

  const updateUserSchema = Joi.object({
    uuid: Joi.string().uuid().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  })

  const { error, value } = (type === 'create' ? createUserSchema : updateUserSchema).validate(input)

  if (error) {
    throw SevenBoom.badRequest(error.message)
  }

  if (type === 'create'){
    if (value.password !== value.confirmPassword) {
      throw SevenBoom.badRequest('Password does not match')
    }

    delete value.confirmPassword

    value.password = await hash(value.password, 10)
  }

  return value
}
