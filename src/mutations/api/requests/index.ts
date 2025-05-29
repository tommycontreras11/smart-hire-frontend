import requestsProvider from "@/providers/http/requests";
import {
  ICreateRequest,
  IUpdateRequest,
} from "@/providers/http/requests/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateRequest(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: FormData) => requestsProvider.create(data),
    getMutationOptions(queryClient, "requests", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateRequest(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateRequest }) =>
      requestsProvider.update(uuid, data),
    getMutationOptions(queryClient, "requests", "request", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteRequest(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => requestsProvider.destroy(uuid),
    getMutationOptions(queryClient, "requests", "request", {
      onSuccess: onSuccessCallback,
    })
  );
}
