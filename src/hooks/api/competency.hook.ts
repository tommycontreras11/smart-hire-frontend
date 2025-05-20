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
