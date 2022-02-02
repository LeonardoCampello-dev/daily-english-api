import { Router, Request, Response } from 'express';

import { Crud, ErrorHandler } from '../../application/helpers';
import { ValidateRequestBody } from '../../application/validation';

import {
  podcastPostRequestSchema,
  podcastPutRequestSchema
} from '../../application/validation/schemas';

import { faunaClient } from '../config/fauna-client';
import { Podcast } from '../../domain/entities';
import { CollectionIndexesEnum, HttpStatusCode } from '../types';

const router = Router();
const crudService = new Crud<Podcast>('podcasts', faunaClient);
const errorHandler = new ErrorHandler();

type Body = Omit<Podcast, 'id'>;

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.');

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.get<Podcast>(id, CollectionIndexesEnum.podcastById);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const validate = ValidateRequestBody<Body>(podcastPostRequestSchema, body);

    if (validate.error) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, validate.error.message);

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.create<Body, Podcast>(body);

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

    const validate = ValidateRequestBody<Body>(podcastPutRequestSchema, body);

    if (validate.error || !id) {
      const formattedError = errorHandler.handle(
        HttpStatusCode.badRequest,
        validate.error.message || 'id is required'
      );

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.update<Body, Podcast>(id, body);

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

    const result = await crudService.delete<Podcast>(id);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

export { router as podcasts };
