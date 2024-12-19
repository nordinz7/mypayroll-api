import Joi, { type Schema, type ValidationResult } from 'joi';
import { SevenBoom } from 'graphql-apollo-errors';

export const jsonValidation = Joi.object().custom((value, helpers) => {
  try {
    const stringified = JSON.stringify(value);
    return stringified;
  } catch (err) {
    return helpers.error('string.json');
  }
}, 'JSON Parsing Validation');

class Validator<T extends Record<string, Schema>> {
  private schemas: T;

  constructor(schemas: T) {
    this.schemas = schemas;
  }


  get<K extends keyof T>(schema: K): Schema {
    const selectedSchema = this.schemas[schema];

    if (!selectedSchema) {
      throw new Error(`Schema ${String(schema)} not found`);
    }

    return selectedSchema;
  }

  validate<K extends keyof T>(schema: K, data: any): ValidationResult['value'] {
    const target = this.get(schema);
    const result = target.validate(data);

    if (result.error) {
      throw SevenBoom.badRequest(result.error.message, data);
    }

    return result.value
  }
}

export default Validator;