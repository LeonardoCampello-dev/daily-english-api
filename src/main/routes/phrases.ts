import { Router, Request, Response } from 'express';

import { Crud, ErrorHandler } from '../../application/helpers';

import {
  phrasePostRequestSchema,
  phrasePutRequestSchema
} from '../../application/validation/schemas';

import { ValidateRequestBody } from '../../application/validation';

import { faunaClient } from '../config/fauna-client';
import { Phrase } from '../../domain/entities';
import { CollectionIndexesEnum, HttpStatusCode } from '../types';

const router = Router();
const crudService = new Crud<Phrase>('sentences', faunaClient);
const errorHandler = new ErrorHandler();

type Body = Omit<Phrase, 'id'>;

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    if (!id) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, 'id is required.');

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.get<Phrase>(id, CollectionIndexesEnum.PHRASE_BY_ID);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const validate = ValidateRequestBody<Body>(phrasePostRequestSchema, body);

    if (validate.error) {
      const formattedError = errorHandler.handle(HttpStatusCode.badRequest, validate.error.message);

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.create<Body, Phrase>(body);

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

    const validate = ValidateRequestBody<Body>(phrasePutRequestSchema, body);

    if (validate.error || !id) {
      const formattedError = errorHandler.handle(
        HttpStatusCode.badRequest,
        validate.error.message || 'id is required'
      );

      response.status(formattedError.status).json(formattedError);
    }

    const result = await crudService.update<Body, Phrase>(id, body);

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

    const result = await crudService.delete<Phrase>(id);

    response.json(result);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

export { router as phrases };
