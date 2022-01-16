import * as Joi from 'joi';

export const postRequestSchema = Joi.object({
  word: Joi.string().required().max(50),
  translation: Joi.string().required().max(50),
  note: Joi.string().max(300),
  tense: Joi.string().required().valid('present', 'past', 'future', 'continuous', 'perfect')
});

export const putRequestSchema = Joi.object({
  word: Joi.string().max(50),
  translation: Joi.string().max(50),
  note: Joi.string().max(300),
  tense: Joi.string().valid('present', 'past', 'future', 'continuous', 'perfect')
});
