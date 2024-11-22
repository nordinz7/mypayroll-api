import { SevenBoom } from "graphql-apollo-errors";
import Joi from "joi";

const view = Joi.object({
  id: Joi.number().optional(),
  productId: Joi.number().optional(),
}).xor('id', 'productId');

const index = Joi.object({
  input: Joi.object({
    productId: Joi.number().optional(),
    customerUuid: Joi.number().required(),
    limit: Joi.number().default(20),
    offset: Joi.number().default(0),
  })
})

const commonMutation = Joi.object({
  customerUuid: Joi.string().guid().required(),
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

const del = Joi.object({
  id: Joi.number().required(),
})

const chartValidation = {
  validate: (schema: string, data: any) => {
    let result: { error: any, value?: any };
    switch (schema) {
      case 'view':
        result = view.validate(data);
        break;
      case 'index':
        result = index.validate(data);
        break;
      case 'create':
        result = create.validate(data);
        break;
      case 'update':
        result = update.validate(data);
        break;
      case 'delete':
        result = del.validate(data);
        break;
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