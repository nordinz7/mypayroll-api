import { SevenBoom } from "graphql-apollo-errors";
import Joi from "joi";

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

const eventValidation = {
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
      default:
        result = { error: 'Schema not found' }
    }

    if (result.error) {
      throw SevenBoom.badRequest(result.error, data);
    }

    return result.value;
  }
}

export default eventValidation;