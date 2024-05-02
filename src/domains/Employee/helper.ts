import { z } from 'zod'
import { EducationLevel, MartialStatus, Race, Religion, type EmployeeInput } from '../../types'
import { SevenBoom } from 'graphql-apollo-errors'

export const validateEmployee = (input: EmployeeInput | undefined | null): EmployeeInput => {
  if (!input) throw SevenBoom.badData('Employee input is required')

  const schema = z.object({
    name: z.string().min(3).max(255),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    nationality: z.string().min(3).max(255),
    religion: z.nativeEnum(Religion),
    race: z.nativeEnum(Race),
    martialStatus: z.nativeEnum(MartialStatus).default(MartialStatus.Single),
    qualification: z.string().min(3).max(255).optional(),
    educationLevel: z.nativeEnum(EducationLevel),
    spouseName: z.string().min(3).max(255).optional(),
    spouseOccupation: z.string().min(3).max(255).optional(),
    children: z.number().int().optional().default(0),
    joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    phone: z.string().min(3).max(255).optional(),
    email: z.string().email().optional()
  })

  return schema.parse(input)
}
