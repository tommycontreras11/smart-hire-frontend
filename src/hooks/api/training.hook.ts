import trainingProvider from "@/providers/http/training";
import { useQuery } from "react-query";

export function useGetAllTraining() {
  const query = useQuery({
    queryKey: ["trainings"],
    retry: 1,
    queryFn: () => trainingProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneTraining(uuid: string) {
  const query = useQuery({
    queryKey: ["training", uuid],
    retry: 1,
    queryFn: () => trainingProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
