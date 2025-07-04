import certificationsProvider from "@/providers/http/certifications";
import {
  ICreateCertification,
  IUpdateCertification,
} from "@/providers/http/certifications/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateCertification(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: ICreateCertification }) =>
      certificationsProvider.create(uuid, data),
    getMutationOptions(queryClient, "certifications", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateCertification(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateCertification }) =>
      certificationsProvider.update(uuid, data),
    getMutationOptions(queryClient, "certifications", "certification", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteCertification(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => certificationsProvider.destroy(uuid),
    getMutationOptions(queryClient, "certifications", "certification", {
      onSuccess: onSuccessCallback,
    })
  );
}
