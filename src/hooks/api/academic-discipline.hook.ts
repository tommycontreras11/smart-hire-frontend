import academicDisciplinesProvider from "@/providers/http/academic-disciplines";
import { useQuery } from "react-query";

export function useGetAllAcademicDiscipline() {
  const query = useQuery({
    queryKey: ["academic-disciplines"],
    retry: 1,
    queryFn: () => academicDisciplinesProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneAcademicDiscipline(uuid: string) {
  const query = useQuery({
    queryKey: ["academic-disciplines", uuid],
    retry: 1,
    queryFn: () => academicDisciplinesProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
