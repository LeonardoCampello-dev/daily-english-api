import { CollectionIndexes } from '@/main/types';

export interface CrudProtocol<T = any> {
  getAll: () => object;
  get: (id: string, index: CollectionIndexes) => object;
  create: (body: T) => object;
  update: (id: string, body: T) => object;
  delete: (id: string) => object;
}
