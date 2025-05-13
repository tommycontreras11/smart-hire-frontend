import countriesProvider from "@/providers/http/countries";
import {
  ICreateCountry,
  IUpdateCountry,
} from "@/providers/http/countries/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateCountry(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ICreateCountry) => countriesProvider.create(data),
    getMutationOptions(queryClient, "countries", null, {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useUpdateCountry(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    ({ uuid, data }: { uuid: string; data: IUpdateCountry }) =>
      countriesProvider.update(uuid, data),
    getMutationOptions(queryClient, "countries", "country", {
      onSuccess: onSuccessCallback,
    })
  );
}

export function useDeleteCountry(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => countriesProvider.destroy(uuid),
    getMutationOptions(queryClient, "countries", "country", {
      onSuccess: onSuccessCallback,
    })
  );
}