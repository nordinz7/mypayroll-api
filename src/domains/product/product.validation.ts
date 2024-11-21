import { SevenBoom } from "graphql-apollo-errors";
import Joi from "joi";
import { ProductStatus } from "../../types";

const view = Joi.object({
  id: Joi.number().required()
})

const index = Joi.object({
  input: Joi.object({
    name: Joi.string().allow(''),
    status: Joi.string().valid(...Object.values(ProductStatus)).allow('').default(ProductStatus.InStock),
    categories: Joi.array().items(Joi.string()).default([]),
    tags: Joi.array().items(Joi.string()).default([]),
    sellerUuids: Joi.array().items(Joi.string()).default([]),
    limit: Joi.number().default(20),
    offset: Joi.number().default(0),
  })
})

const commonMutation = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().allow('').default(''),
  image: Joi.string().optional().default(''),
  quantity: Joi.number().required(),
  tags: Joi.array().items(Joi.string()).default([]),
})

const create = Joi.object({
  input: commonMutation
})

const update = Joi.object({
  id: Joi.number().required(),
  input: commonMutation
})

const productValidation = {
  validate: (schema: string, data: any) => {
    console.log('--------schema', schema, data)
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
      case 'updateStatus':
        result = view.validate(data);
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

export default productValidation;