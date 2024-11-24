import { SevenBoom } from "graphql-apollo-errors";
import Joi from "joi";

const commonMutation = Joi.object({
  customerUuid: Joi.string().guid().required(),
  productId: Joi.number().required(),
  quantity: Joi.number().required(),
})

const view = Joi.object({
  id: Joi.number().optional(),
  customerUuid: Joi.string().guid().optional(),
}).xor('id', 'customerUuid');

const upsert = Joi.object({
  input: commonMutation
})

const del = Joi.object({
  productId: Joi.number().required(),
})

const chartValidation = {
  validate: (schema: string, data: any) => {
    let result: { error: any, value?: any };
    switch (schema) {
      case 'view':
        result = view.validate(data);
        break;
      case 'upsert':
        result = upsert.validate(data);
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