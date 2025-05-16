import candidatesProvider from "@/providers/http/candidates";
import {
  ICreateCandidate,
  IUpdateCandidate,
} from "@/providers/http/candidates/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateCandidate(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateCandidate) => candidatesProvider.create(data),
    getMutationOptions(queryClient, "candidates", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateCandidate(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateCandidate }) =>
      candidatesProvider.update(uuid, data),
    getMutationOptions(queryClient, "candidates", "candidate", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteCandidate(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => candidatesProvider.destroy(uuid),
    getMutationOptions(queryClient, "candidates", "candidate", {
      onSuccess: onSuccessCallback,
    })
  );
}