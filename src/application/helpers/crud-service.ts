import { Client, Get, Ref, Collection, Create, Update } from 'faunadb';

import { Collections } from '../../main/types';

export class Crud {
  constructor(private readonly collection: Collections, private readonly client: Client) {}

  async get(id: string) {
    const data = await this.client.query(Get(Ref(Collection(this.collection), id)));

    console.log({ data });
  }

  async create<T = any>(body: T) {
    const data = await this.client.query(
      Create(Collection(this.collection), { data: { ...body } })
    );

    console.log({ data });
  }

  async update<T = any>(id: string, body: T) {
    const data = await this.client.query(
      Update(Ref(Collection(this.collection), id), { data: { ...body } })
    );

    console.log({ data });
  }

  async delete<T = any>(id: string) {
    const body = { deleted: true, deletedAt: Date.now() };

    const data = await this.client.query(
      Update(Ref(Collection(this.collection), id), { data: { ...body } })
    );

    console.log({ data });
  }
}
