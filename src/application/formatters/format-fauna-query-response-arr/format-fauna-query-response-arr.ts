import { FaunaQueryResponseArr } from '@/main/types';

export const formatFaunaQueryResponseArr = <TData = object>(arr: FaunaQueryResponseArr<TData>) => {
  return arr.data.map((item) => item.data);
};
