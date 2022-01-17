import * as Joi from 'joi';

const urlPattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

export const songPostRequestSchema = Joi.object({
  title: Joi.string().required().max(50),
  author: Joi.string().required().max(50),
  url: Joi.string().required().pattern(urlPattern),
  note: Joi.string().max(300),
  subject: Joi.string().required().max(50),
  keywords: Joi.array().items(Joi.string())
});

export const songPutRequestSchema = Joi.object({
  title: Joi.string().max(50),
  author: Joi.string().max(50),
  url: Joi.string().pattern(urlPattern),
  note: Joi.string().max(300),
  subject: Joi.string().max(50),
  keywords: Joi.array().items(Joi.string())
});
