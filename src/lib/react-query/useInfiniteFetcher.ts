import { useInfiniteQuery, InfiniteData } from "@tanstack/react-query";

export function useInfiniteFetcher<TData>({
  queryKey,
  queryFn,
  getNextPageParam,
  options,
}: {
  queryKey: readonly unknown[];
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<TData>;
  getNextPageParam: (lastPage: TData) => number | undefined;
  options?: any;
}) {
  return useInfiniteQuery<TData, Error, InfiniteData<TData, number>, readonly unknown[], number>({
    queryKey,
    queryFn: (context) => queryFn({ pageParam: context.pageParam }),
    getNextPageParam,
    initialPageParam: 1,
    ...options,
  });
}
