import Joi from "joi";
import Validator from "../../utils/joi";

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

const schemas = {
  view,
  upsert,
  delete: del
}


export default new Validator(schemas);