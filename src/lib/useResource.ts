import useSWR from 'swr'

export interface ResourceQueryHookResult<T> {
  data?: T
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  isSuccess: boolean
}

export const useResource = <T>(
  key: string,
  fetcher: () => Promise<T>
): ResourceQueryHookResult<T> => {
  const { data, error } = useSWR(key, () => fetcher())

  return {
    data,
    isLoading: !data && !error,
    isFetching: !data && !error,
    isError: !!error,
    isSuccess: !!data
  }
}
