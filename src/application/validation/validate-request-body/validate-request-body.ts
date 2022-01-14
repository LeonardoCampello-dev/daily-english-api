import * as Joi from 'joi';

export const ValidateRequestBody = <TSchema>(
  schema: Joi.ObjectSchema<TSchema>,
  payload: object
) => {
  return schema.validate(payload);
};
