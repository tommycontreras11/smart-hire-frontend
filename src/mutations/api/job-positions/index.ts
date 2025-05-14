import jobPositionsProvider from "@/providers/http/job-positions";
import {
  ICreateJobPosition,
  IUpdateJobPosition,
} from "@/providers/http/job-positions/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateJobPosition(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateJobPosition) => jobPositionsProvider.create(data),
    getMutationOptions(queryClient, "job-positions", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateJobPosition(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateJobPosition }) =>
      jobPositionsProvider.update(uuid, data),
    getMutationOptions(queryClient, "job-positions", "job-position", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteJobPosition(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => jobPositionsProvider.destroy(uuid),
    getMutationOptions(queryClient, "job-positions", "job-position", {
      onSuccess: onSuccessCallback,
    })
  );
}
