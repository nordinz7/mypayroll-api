import Joi from "joi";
import Validator from "../../utils/joi";

const view = Joi.object({
  id: Joi.number().required()
})

const index = Joi.object({
  input: Joi.object({
    models: Joi.array().items(Joi.string().required()).min(1).required(),
    actions: Joi.array().items(Joi.string().required()).min(1).required(),
    startDate: Joi.string().isoDate().default(''),
    endDate: Joi.string().isoDate().default(''),
    limit: Joi.number().default(20),
    offset: Joi.number().default(0),
    isRaw: Joi.boolean().default(false)
  }).and('startDate', 'endDate')
})

const create = Joi.object({
  model: Joi.string().required(),
  action: Joi.string().required(),
  payload: Joi.object().required(),
  date: Joi.string().isoDate().default(new Date().toISOString()),
})

const schemas = {
  view,
  index,
  create
}

export default new Validator(schemas);