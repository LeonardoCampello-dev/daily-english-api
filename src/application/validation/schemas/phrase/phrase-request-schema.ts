import * as Joi from 'joi';

export const phrasePostRequestSchema = Joi.object({
  phrase: Joi.string().required().max(300),
  translation: Joi.string().required().max(300),
  note: Joi.string().max(300),
  associatedWords: Joi.array().items(Joi.string())
});

export const phrasePutRequestSchema = Joi.object({
  phrase: Joi.string().max(300),
  translation: Joi.string().max(300),
  note: Joi.string().max(300),
  associatedWords: Joi.array().items(Joi.string())
});
