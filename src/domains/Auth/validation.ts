import { z } from "zod";

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const registerSchema = z.object({
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  email: z.string().email(),
  name: z.string(),
  birthDate: z.date()
})
