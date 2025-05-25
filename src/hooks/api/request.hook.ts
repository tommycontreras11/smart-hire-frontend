import requestsProvider from "@/providers/http/requests";
import { useQuery } from "react-query";

export function useGetAllRequest() {
  const query = useQuery({
    queryKey: ["requests"],
    retry: 1,
    queryFn: () => requestsProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneRequest(uuid: string) {
  const query = useQuery({
    queryKey: ["request", uuid],
    retry: 1,
    queryFn: () => requestsProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
