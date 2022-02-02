import { CollectionIndexes, Collections, FaunaQueryResponse } from '../../main/types';

import {
  Client,
  Get,
  Ref,
  Collection,
  Create,
  Update,
  Match,
  Index,
  Casefold,
  Paginate,
  Documents,
  Lambda,
  Map as QueryMap
} from 'faunadb';

import { v4 as uuidv4 } from 'uuid';

interface Protocol<T = any> {
  get: (id: string, index: CollectionIndexes) => void;
  create: (body: T) => void;
  update: (id: string, body: T) => void;
  delete: (id: string) => void;
}

export class Crud<T> implements Protocol<T> {
  constructor(private readonly collection: Collections, private readonly client: Client) {}

  /* TODO refactor */
  async getAll<Response = any>() {
    const query = QueryMap(
      Paginate(Documents(Collection(this.collection))),
      Lambda((x) => Get(x))
    );

    const response = (await this.client.query(query)) as { data: FaunaQueryResponse<Response>[] };

    const formatted = response.data.map((item) => item.data);

    return formatted;
  }

  async get<Response = any>(id: string, index: CollectionIndexes) {
    const query = Get(Match(Index(index), Casefold(id)));

    const response = (await this.client.query(query)) as FaunaQueryResponse<Response>;

    return response.data;
  }

  async create<Body = any, Response = any>(body: Body) {
    const id = uuidv4();
    const createdAt = Date.now();

    const query = Create(Collection(this.collection), { data: { id, createdAt, ...body } });

    const response = (await this.client.query(query)) as FaunaQueryResponse<Response>;

    return response.data;
  }

  async update<Body = any, Response = any>(id: string, body: Body) {
    const updatedAt = Date.now();

    const query = Update(Ref(Collection(this.collection), id), { data: { updatedAt, ...body } });

    const response = (await this.client.query(query)) as FaunaQueryResponse<Response>;

    return response.data;
  }

  async delete<Response = any>(id: string) {
    const body = { deleted: true, deletedAt: Date.now() };

    const query = Update(Ref(Collection(this.collection), id), { data: { ...body } });

    const response = (await this.client.query(query)) as FaunaQueryResponse<Response>;

    return response.data;
  }
}
