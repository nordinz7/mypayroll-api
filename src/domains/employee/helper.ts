import Joi from 'joi'
import { EducationLevel, MartialStatus, Race, Religion, type EmployeeInput } from '../../types'
import { SevenBoom } from 'graphql-apollo-errors'
import { formatDate } from 'date-fns'

export const validateEmployee = (input: EmployeeInput | undefined | null): EmployeeInput => {
  if (!input) { throw SevenBoom.badData('Employee input is required') }

  const dates = ['birthDate', 'joinDate', 'endDate']
  // @ts-ignore
  dates.forEach((key: keyof EmployeeInput) => {
    if (input[key]) {
      const date = new Date(input[key])
      input[key] = formatDate(date, 'yyyy-MM-dd')
    }
  })

  const schema = Joi.object({
    name: Joi.string().min(3).max(255),
    birthDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    nationality: Joi.string().min(3).max(255),
    religion: Joi.valid(...Object.values(Religion)),
    race: Joi.valid(...Object.values(Race)),
    martialStatus: Joi.valid(...Object.values(MartialStatus)).default(MartialStatus.Single),
    qualification: Joi.string().min(3).max(255).optional().allow(null),
    educationLevel: Joi.valid(...Object.values(EducationLevel)),
    spouseName: Joi.string().min(3).max(255).optional().allow(null),
    spouseOccupation: Joi.string().min(3).max(255).optional().allow(null),
    children: Joi.alternatives().try(Joi.number(), Joi.string()).default(0),
    joinDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().allow(null),
    phone: Joi.string().min(3).max(255).optional().allow(null),
    email: Joi.string().email().optional().allow(null)
  })

  const { error, value } = schema.validate(input)

  if (error) throw SevenBoom.badData(error.message)

  return value
}
