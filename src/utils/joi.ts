import Joi from "joi";

export const jsonValidation = Joi.object().custom((value, helpers) => {
  try {
    const stringified = JSON.stringify(value);
    return stringified;
  } catch (err) {
    return helpers.error('string.json');
  }
}, 'JSON Parsing Validation');