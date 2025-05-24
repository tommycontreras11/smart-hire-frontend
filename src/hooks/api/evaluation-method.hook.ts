import evaluationMethodsProvider from "@/providers/http/evaluation-methods";
import { useQuery } from "react-query";

export function useGetAllEvaluationMethod() {
  const query = useQuery({
    queryKey: ["evaluation-methods"],
    retry: 1,
    queryFn: () => evaluationMethodsProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneEvaluationMethod(uuid: string) {
  const query = useQuery({
    queryKey: ["evaluation-method", uuid],
    retry: 1,
    queryFn: () => evaluationMethodsProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}