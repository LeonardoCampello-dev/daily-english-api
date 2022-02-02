export interface FaunaQueryResponse<TData = any> {
  account: object;
  ts: number;
  data: TData;
}

export interface FaunaQueryResponseArr<TData = object> {
  data: FaunaQueryResponse<TData>[];
}
