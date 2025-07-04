import academicDisciplinesProvider from "@/providers/http/academic-disciplines";
import {
  ICreateAcademicDiscipline,
  IUpdateAcademicDiscipline,
} from "@/providers/http/academic-disciplines/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateAcademicDiscipline(
  onSuccessCallback: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateAcademicDiscipline) =>
      academicDisciplinesProvider.create(data),
    getMutationOptions(queryClient, "academic-disciplines", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateAcademicDiscipline(
  onSuccessCallback: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateAcademicDiscipline }) =>
      academicDisciplinesProvider.update(uuid, data),
    getMutationOptions(
      queryClient,
      "academic-disciplines",
      "academic-discipline",
      {
        onSuccess: onSuccessCallback,
      }
    )
  );
}

export function useDeleteAcademicDiscipline(
  onSuccessCallback: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => academicDisciplinesProvider.destroy(uuid),
    getMutationOptions(
      queryClient,
      "academic-disciplines",
      "academic-discipline",
      {
        onSuccess: onSuccessCallback,
      }
    )
  );
}
