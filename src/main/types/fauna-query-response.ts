export interface FaunaQueryResponse<T = any> {
  account: object;
  ts: number;
  data: T;
}
