import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";

type InternalContext = {
  previousDataMap?: { key: readonly unknown[]; data: unknown }[];
};

export function useAppMutation<TData, TVariables>({
  mutationFn,
  invalidateKeys,
  options,
}: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  invalidateKeys?: readonly (readonly unknown[])[];
  options?: Omit<
    UseMutationOptions<TData, Error, TVariables, InternalContext>,
    "mutationFn" | "onMutate"
  >;
}) {
  const { onError, onSuccess, ...restOptions } = options ?? {};
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables, InternalContext>({
    mutationFn,
    ...restOptions,

    onMutate: async (_variables, _ctx) => {
      await queryClient.cancelQueries();

      const previousDataMap = invalidateKeys?.map((key) => ({
        key,
        data: queryClient.getQueryData(key),
      }));

      return { previousDataMap };
    },

    onError: (err, vars, onMutateResult, ctx) => {
      onMutateResult?.previousDataMap?.forEach(({ key, data }) => {
        queryClient.setQueryData(key, data);
      });
      onError?.(err, vars, onMutateResult, ctx);
    },

    onSuccess: (data, vars, onMutateResult, ctx) => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      onSuccess?.(data, vars, onMutateResult, ctx);
    },
  });
}
