import institutionsProvider from "@/providers/http/institutions";
import { useQuery } from "react-query";

export function useGetAllInstitution() {
  const query = useQuery({
    queryKey: ["institutions"],
    retry: 1,
    queryFn: () => institutionsProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneInstitution(uuid: string) {
  const query = useQuery({
    queryKey: ["institution", uuid],
    retry: 1,
    queryFn: () => institutionsProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
