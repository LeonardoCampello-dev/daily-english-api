import { Router, Request, Response } from 'express';

import { Crud, ErrorHandler } from '../../application/helpers';
import { ValidateRequestBody } from '../../application/validation';
import { wordPostRequestSchema, wordPutRequestSchema } from '../../application/validation/schemas';

import { faunaClient } from '../config/fauna-client';
import { Word } from '../../domain/entities';
import { CollectionIndexesEnum, HttpStatusCode } from '../types';

const router = Router();
const crudService = new Crud<Word>('words', faunaClient);
const errorHandler = new ErrorHandler();

type Body = Omit<Word, 'id'>;

router.get('/', async (request: Request, response: Response) => {
  try {
    const result = await crudService.getAll<Word>();

    response.json(result);
  } catch (error) {
    console.error(error);

    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.');

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.get<Word>(id, CollectionIndexesEnum.WORD_BY_ID);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const validate = ValidateRequestBody<Body>(wordPostRequestSchema, body);

    if (validate.error) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, validate.error.message);

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.create<Body, Word>(body);

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

    const validate = ValidateRequestBody<Body>(wordPutRequestSchema, body);

    if (validate.error || !id) {
      const formattedError = errorHandler.handle(
        HttpStatusCode.badRequest,
        validate.error.message || 'id is required'
      );

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.update<Body, Word>(id, body);

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

    const result = await crudService.delete<Word>(id);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

export { router as words };
