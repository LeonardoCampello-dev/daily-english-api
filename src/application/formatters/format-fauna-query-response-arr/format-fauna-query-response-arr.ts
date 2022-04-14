import { FaunaQueryResponseArr } from 'main/types'

export const formatFaunaQueryResponseArr = <TData = object>(arr: FaunaQueryResponseArr<TData>) => {
  const items = arr.data.map(item => item.data)
  const count = items.length

  return {
    items,
    count
  }
}
