import * as Joi from 'joi';

export const wordPostRequestSchema = Joi.object({
  word: Joi.string().required().max(50),
  translation: Joi.string().required().max(50),
  note: Joi.string().max(300)
});

export const wordPutRequestSchema = Joi.object({
  word: Joi.string().max(50),
  translation: Joi.string().max(50),
  note: Joi.string().max(300)
});
