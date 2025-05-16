import candidatesProvider from "@/providers/http/candidates";
import { useQuery } from "react-query";

export function useGetAllCandidate() {
  const query = useQuery({
    queryKey: ["candidates"],
    retry: 1,
    queryFn: () => candidatesProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneCandidate(uuid: string) {
  const query = useQuery({
    queryKey: ["candidate", uuid],
    retry: 1,
    queryFn: () => candidatesProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}