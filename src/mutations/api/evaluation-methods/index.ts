import evaluationMethodsProvider from "@/providers/http/evaluation-methods";
import {
  ICreateEvaluationMethod,
  IUpdateEvaluationMethod,
} from "@/providers/http/evaluation-methods/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateEvaluationMethod(
  onSuccessCallback: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateEvaluationMethod) => evaluationMethodsProvider.create(data),
    getMutationOptions(queryClient, "evaluation-methods", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateEvaluationMethod(
  onSuccessCallback: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateEvaluationMethod }) =>
      evaluationMethodsProvider.update(uuid, data),
    getMutationOptions(queryClient, "evaluation-methods", "evaluation-method", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteEvaluationMethod(
  onSuccessCallback: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => evaluationMethodsProvider.destroy(uuid),
    getMutationOptions(queryClient, "evaluation-methods", "evaluation-method", {
      onSuccess: onSuccessCallback,
    })
  );
}
