import Joi from "joi";
import { ProductStatus } from "../../types";
import Validator from "../../utils/joi";

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

const schemas = {
  view,
  index,
  create,
  update
}

export default new Validator(schemas);

