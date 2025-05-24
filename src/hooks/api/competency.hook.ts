import competenciesProvider from "@/providers/http/competencies";
import { useQuery } from "react-query";

export function useGetAllCompetency() {
  const query = useQuery({
    queryKey: ["competencies"],
    retry: 1,
    queryFn: () => competenciesProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneCompetency(uuid: string) {
  const query = useQuery({
    queryKey: ["competencies", uuid],
    retry: 1,
    queryFn: () => competenciesProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
