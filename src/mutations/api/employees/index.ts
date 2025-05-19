import employeesProvider from "@/providers/http/employees";
import { IUpdateEmployee } from "@/providers/http/employees/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useUpdateEmployee(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateEmployee }) =>
      employeesProvider.update(uuid, data),
    getMutationOptions(queryClient, "employees", "employee", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteEmployee(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => employeesProvider.destroy(uuid),
    getMutationOptions(queryClient, "employees", "employee", {
      onSuccess: onSuccessCallback,
    })
  );
}
