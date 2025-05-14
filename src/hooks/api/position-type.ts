import positionTypes from "@/providers/http/position-types";
import { useQuery } from "react-query";

export function useGetAllPositionType() {
  const query = useQuery({
    queryKey: ["position-types"],
    retry: 1,
    queryFn: () => positionTypes.getAll(),
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