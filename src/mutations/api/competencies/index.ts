import competenciesProvider from "@/providers/http/competencies";
import {
  ICreateCompetency,
  IUpdateCompetency,
} from "@/providers/http/competencies/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateCompetency(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateCompetency) => competenciesProvider.create(data),
    getMutationOptions(queryClient, "competencies", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateCompetency(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateCompetency }) =>
      competenciesProvider.update(uuid, data),
    getMutationOptions(queryClient, "competencies", "competency", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteCompetency(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => competenciesProvider.destroy(uuid),
    getMutationOptions(queryClient, "competencies", "competency", {
      onSuccess: onSuccessCallback,
    })
  );
}
