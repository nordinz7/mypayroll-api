import Joi from "joi";

export const validationInputWrapper = (j: Joi.ObjectSchema) => {
  return Joi.object({
    input: j
  })
}