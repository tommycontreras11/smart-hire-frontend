import countriesProvider from "@/providers/http/countries";
import { useQuery } from "react-query";

export function useGetAllCountry() {
  const query = useQuery({
    queryKey: ["countries"],
    retry: 1,
    queryFn: () => countriesProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneCountry(uuid: string) {
  const query = useQuery({
    queryKey: ["country", uuid],
    retry: 1,
    queryFn: () => countriesProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}