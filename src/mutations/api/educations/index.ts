import educationsProvider from "@/providers/http/educations";
import {
  ICreateEducation,
  IUpdateEducation,
} from "@/providers/http/educations/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateEducation(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: ICreateEducation }) =>
      educationsProvider.create(uuid, data),
    getMutationOptions(queryClient, "educations", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateEducation(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateEducation }) =>
      educationsProvider.update(uuid, data),
    getMutationOptions(queryClient, "educations", "education", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteEducation(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => educationsProvider.destroy(uuid),
    getMutationOptions(queryClient, "educations", "education", {
      onSuccess: onSuccessCallback,
    })
  );
}
