import { Router, Request, Response } from 'express';

import { Crud, ErrorHandler } from '../../application/helpers';
import { ValidateRequestBody } from '../../application/validation';
import {
  articlePostRequestSchema,
  articlePutRequestSchema
} from '../../application/validation/schemas';

import { faunaClient } from '../config/fauna-client';
import { Article } from '../../domain/entities';
import { CollectionIndexesEnum, HttpStatusCode } from '../types';

const router = Router();
const crudService = new Crud<Article>('articles', faunaClient);
const errorHandler = new ErrorHandler();

type Body = Omit<Article, 'id'>;

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.');

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.get<Article>(id, CollectionIndexesEnum.articleById);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const validate = ValidateRequestBody<Body>(articlePostRequestSchema, body);

    if (validate.error) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, validate.error.message);

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.create<Body, Article>(body);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const {
      body,
      params: { id }
    } = request;

    const validate = ValidateRequestBody<Body>(articlePutRequestSchema, body);

    if (validate.error || !id) {
      const formattedError = errorHandler.handle(
        HttpStatusCode.badRequest,
        validate.error.message || 'id is required'
      );

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.update<Body, Article>(id, body);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.');

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.delete<Article>(id);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

export { router as articles };
