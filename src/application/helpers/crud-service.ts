import {
  CollectionIndexes,
  Collections,
  CrudProtocol,
  FaunaQueryResponse,
  FaunaQueryResponseArr
} from '../../main/types';

import {
  Client,
  Get,
  Collection,
  Create,
  Update,
  Match,
  Index,
  Casefold,
  Paginate,
  Documents,
  Lambda,
  Map as QueryMap,
  Select
} from 'faunadb';

import { formatFaunaQueryResponseArr as formatArr } from '../formatters';

import { v4 as uuidv4 } from 'uuid';

export class Crud<TBody> implements CrudProtocol<TBody> {
  constructor(
    private readonly collection: Collections,
    private readonly index: CollectionIndexes,
    private readonly client: Client
  ) {}

  async getAll<TResponse = object>() {
    const query = QueryMap(
      Paginate(Documents(Collection(this.collection))),
      Lambda(params => Get(params))
    );

    const response = (await this.client.query(query)) as FaunaQueryResponseArr<TResponse>;

    return formatArr<TResponse>(response);
  }

  async get<TResponse = object>(id: string) {
    const query = Get(Match(Index(this.index), Casefold(id)));

    const response = (await this.client.query(query)) as FaunaQueryResponse<TResponse>;

    return response.data;
  }

  async create<Body = any, TResponse = object>(body: Body) {
    const id = uuidv4();
    const createdAt = Date.now();

    const query = Create(Collection(this.collection), { data: { id, createdAt, ...body } });

    const response = (await this.client.query(query)) as FaunaQueryResponse<TResponse>;

    return response.data;
  }

  async update<Body = any, TResponse = object>(id: string, body: Body) {
    const updatedAt = Date.now();

    const ref = Select(['ref'], Get(Match(Index(this.index), Casefold(id))));

    const query = Update(ref, {
      data: { updatedAt, ...body }
    });

    const response = (await this.client.query(query)) as FaunaQueryResponse<TResponse>;

    return response.data;
  }

  async delete<TResponse = object>(id: string) {
    const body = { deleted: true, deletedAt: Date.now() };

    const ref = Select(['ref'], Get(Match(Index(this.index), Casefold(id))));

    const query = Update(ref, { data: { ...body } });

    const response = (await this.client.query(query)) as FaunaQueryResponse<TResponse>;

    return response.data;
  }
}
