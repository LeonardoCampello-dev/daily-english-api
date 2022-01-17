import { Router, Request, Response } from 'express';

import { Crud, ErrorHandler } from '../../application/helpers';
import { ValidateRequestBody } from '../../application/validation';

import { songPostRequestSchema, songPutRequestSchema } from '../../application/validation/schemas';

import { faunaClient } from '../config/fauna-client';
import { Song } from '../../domain/entities';
import { CollectionIndexesEnum, HttpStatusCode } from '../types';

const router = Router();
const crudService = new Crud<Song>('songs', faunaClient);
const errorHandler = new ErrorHandler();

type Body = Omit<Song, 'id'>;

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.');

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.get<Song>(id, CollectionIndexesEnum.songById);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const validate = ValidateRequestBody<Body>(songPostRequestSchema, body);

    if (validate.error) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, validate.error.message);

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.create<Body, Song>(body);

    response.json(result.data);
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

    const validate = ValidateRequestBody<Body>(songPutRequestSchema, body);

    if (validate.error || !id) {
      const formattedError = errorHandler.handle(
        HttpStatusCode.badRequest,
        validate.error.message || 'id is required'
      );

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.update<Body, Song>(id, body);

    response.json(result.data);
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

    const result = await crudService.delete<Song>(id);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

export { router as songs };
