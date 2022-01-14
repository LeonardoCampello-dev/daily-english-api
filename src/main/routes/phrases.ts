import { Router, Request, Response } from 'express';

import { Crud, ErrorHandler } from '../../application/helpers';
import { Phrase } from '../../domain/entities';
import { faunaClient } from '../config/fauna-client';

const router = Router();
const crudService = new Crud<Phrase>('sentences', faunaClient);
const errorHandler = new ErrorHandler();

type Body = Omit<Phrase, 'id'>;

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await crudService.get<Phrase>(id, 'phrase_by_id');

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const result = await crudService.create<Body, Phrase>(body);

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

    const result = await crudService.update<Body, Phrase>(id, body);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await crudService.delete<Phrase>(id);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode, error.description);

    response.status(formattedError.status).json(formattedError);
  }
});

export { router as phrases };
