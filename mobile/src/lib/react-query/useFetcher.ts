import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useFetcher<TData>({
  queryKey,
  queryFn,
  options,
}: {
  queryKey: readonly unknown[];
  queryFn: () => Promise<TData>;
  options?: Omit<UseQueryOptions<TData>, "queryKey" | "queryFn">;
}) {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}
