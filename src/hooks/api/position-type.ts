import positionTypes from "@/providers/http/position-types";
import { useQuery } from "react-query";

export function useGetAllPositionType(
  departmentUUID?: string,
  isDepartmentRequired?: boolean
) {
  const query = useQuery({
    queryKey: ["position-types", departmentUUID],
    retry: 1,
    queryFn: () => positionTypes.getAll(departmentUUID),
    enabled: !isDepartmentRequired ? true : !!departmentUUID,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOnePositionType(uuid: string) {
  const query = useQuery({
    queryKey: ["position-type", uuid],
    retry: 1,
    queryFn: () => positionTypes.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
