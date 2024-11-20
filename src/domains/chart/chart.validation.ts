import { SevenBoom } from "graphql-apollo-errors";
import Joi from "joi";

const view = Joi.object({
  id: Joi.number().required()
})

const index = Joi.object({
  input: Joi.object({
    productId: Joi.number().optional(),
    userId: Joi.number().required(),
    limit: Joi.number().default(20),
    offset: Joi.number().default(0),
  })
})

const commonMutation = Joi.object({
  userId: Joi.number().required(),
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
})

const create = Joi.object({
  input: commonMutation
})

const update = Joi.object({
  id: Joi.number().required(),
  input: commonMutation
})

const chartValidation = {
  validate: (schema: string, data: any) => {
    let result: { error: any, value?: any };
    switch (schema) {
      case 'view':
        result = view.validate(data);
      case 'index':
        result = index.validate(data);
      case 'create':
        result = create.validate(data);
      case 'update':
        result = update.validate(data);
      case 'delete':
        result = view.validate(data);
      default:
        result = { error: 'Schema not found' }
    }

    if (result.error) {
      throw SevenBoom.badRequest(result.error, data);
    }

    return result.value;
  }
}

export default chartValidation;