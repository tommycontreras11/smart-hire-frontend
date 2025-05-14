import institutionsProvider from "@/providers/http/institutions";
import {
  ICreateInstitution,
  IUpdateInstitution,
} from "@/providers/http/institutions/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateInstitution(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateInstitution) => institutionsProvider.create(data),
    getMutationOptions(queryClient, "institutions", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateInstitution(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateInstitution }) =>
      institutionsProvider.update(uuid, data),
    getMutationOptions(queryClient, "institutions", "institution", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteInstitution(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => institutionsProvider.destroy(uuid),
    getMutationOptions(queryClient, "institutions", "institution", {
      onSuccess: onSuccessCallback,
    })
  );
}