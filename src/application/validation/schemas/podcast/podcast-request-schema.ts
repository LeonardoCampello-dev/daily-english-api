import * as Joi from 'joi';

import { urlRegExp } from '../../../../main/constants/url-regex';

export const podcastPostRequestSchema = Joi.object({
  title: Joi.string().required().max(50),
  url: Joi.string().required().pattern(urlRegExp),
  note: Joi.string().max(300),
  subject: Joi.string().required().max(50),
  keywords: Joi.array().items(Joi.string())
});

export const podcastPutRequestSchema = Joi.object({
  title: Joi.string().max(50),
  url: Joi.string().pattern(urlRegExp),
  note: Joi.string().max(300),
  subject: Joi.string().max(50),
  keywords: Joi.array().items(Joi.string())
});
