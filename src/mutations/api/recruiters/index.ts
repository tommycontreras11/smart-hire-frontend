import recruitersProvider from "@/providers/http/recruiters";
import {
  ICreateRecruiter,
  IUpdateRecruiter,
} from "@/providers/http/recruiters/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateRecruiter(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateRecruiter) => recruitersProvider.create(data),
    getMutationOptions(queryClient, "recruiters", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateRecruiter(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateRecruiter }) =>
      recruitersProvider.update(uuid, data),
    getMutationOptions(queryClient, "recruiters", "recruiter", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteRecruiter(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => recruitersProvider.destroy(uuid),
    getMutationOptions(queryClient, "recruiters", "recruiter", {
      onSuccess: onSuccessCallback,
    })
  );
}
