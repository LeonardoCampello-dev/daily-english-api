import { Router, Request, Response } from 'express';

import { Crud, ErrorHandler } from '../../application/helpers';
import { Article } from '../../domain/entities';
import { faunaClient } from '../config/fauna-client';

const router = Router();
const crudService = new Crud<Article>('articles', faunaClient);
const errorHandler = new ErrorHandler();

type Body = Omit<Article, 'id'>;

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await crudService.get<Article>(id);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode);

    response.status(formattedError.status).json(formattedError);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const result = await crudService.create<Body, Article>(body);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode);

    response.status(formattedError.status).json(formattedError);
  }
});

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const {
      body,
      params: { id }
    } = request;

    const result = await crudService.update<Body, Article>(id, body);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode);

    response.status(formattedError.status).json(formattedError);
  }
});

router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await crudService.delete<Article>(id);

    response.json(result.data);
  } catch (error) {
    const formattedError = errorHandler.handle(error.requestResult.statusCode);

    response.status(formattedError.status).json(formattedError);
  }
});

export { router as articles };
