import { Router, Request, Response } from 'express';

import { Crud } from '../../application/helpers';
import { Word } from '../../domain/entities';
import { faunaClient } from '../config/fauna-client';

const router = Router();
const CrudService = new Crud<Word>('words', faunaClient);

type Body = Omit<Word, 'id'>;

router.get('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await CrudService.get<Word>(id);

    response.json(result.data);
  } catch (error) {
    response.json(error);
  }
});

router.post('/', async (request: Request, response: Response) => {
  try {
    const { body } = request;

    const result = await CrudService.create<Body, Word>(body);

    response.json(result.data);
  } catch (error) {
    response.json(error);
  }
});

router.put('/:id', async (request: Request, response: Response) => {
  try {
    const {
      body,
      params: { id }
    } = request;

    const result = await CrudService.update<Body, Word>(id, body);

    response.json(result.data);
  } catch (error) {
    response.json(error);
  }
});

router.delete('/:id', async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await CrudService.delete<Word>(id);

    response.json(result.data);
  } catch (error) {
    response.json(error);
  }
});

export { router as words };
