import * as Joi from 'joi';

export const wordRequestBodySchema = Joi.object({
  word: Joi.string().required().max(50),
  translation: Joi.string().required().max(50),
  note: Joi.string().max(300),
  tense: Joi.string().valid('present', 'past', 'future', 'continuous', 'perfect')
});
