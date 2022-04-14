export interface CrudProtocol<T = any> {
  getAll: () => object
  get: (id: string) => object
  create: (body: T) => object
  update: (id: string, body: T) => object
  delete: (id: string) => object
}
