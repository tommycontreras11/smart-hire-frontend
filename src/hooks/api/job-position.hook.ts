import jobPositionsProvider from "@/providers/http/job-positions";
import { IJobPositionFilter } from "@/providers/http/job-positions/interface";
import { useQuery } from "react-query";

export function useGetAllJobPosition(filters?: IJobPositionFilter) {
  const query = useQuery({
    queryKey: ["job-positions", filters],
    retry: 1,
    queryFn: () => jobPositionsProvider.getAll(filters),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetAllRecruitmentProcess() {
  const query = useQuery({
    queryKey: ["recruitment-processes"],
    retry: 1,
    queryFn: () => jobPositionsProvider.getAllRecruitmentProcess(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneJobPosition(uuid: string) {
  const query = useQuery({
    queryKey: ["job-position", uuid],
    retry: 1,
    queryFn: () => jobPositionsProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
