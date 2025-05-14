import positionTypesProvider from "@/providers/http/position-types";
import {
  ICreatePositionType,
  IUpdatePositionType,
} from "@/providers/http/position-types/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreatePositionType(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreatePositionType) => positionTypesProvider.create(data),
    getMutationOptions(queryClient, "position-types", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdatePositionType(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdatePositionType }) =>
      positionTypesProvider.update(uuid, data),
    getMutationOptions(queryClient, "position-types", "position-type", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeletePositionType(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => positionTypesProvider.destroy(uuid),
    getMutationOptions(queryClient, "position-types", "position-type", {
      onSuccess: onSuccessCallback,
    })
  );
}