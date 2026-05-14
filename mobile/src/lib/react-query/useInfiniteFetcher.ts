import { useInfiniteQuery } from "@tanstack/react-query";

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
  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam,
    initialPageParam: 1,
    ...options,
  });
}
