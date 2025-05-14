import categoriesProvider from "@/providers/http/categories";
import {
  ICreateCategory,
  IUpdateCategory,
} from "@/providers/http/categories/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateCategory(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateCategory) => categoriesProvider.create(data),
    getMutationOptions(queryClient, "categories", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateCategory(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateCategory }) =>
      categoriesProvider.update(uuid, data),
    getMutationOptions(queryClient, "categories", "country", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteCategory(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => categoriesProvider.destroy(uuid),
    getMutationOptions(queryClient, "categories", "country", {
      onSuccess: onSuccessCallback,
    })
  );
}