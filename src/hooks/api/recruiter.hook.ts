import recruitersProvider from "@/providers/http/recruiters";
import { useQuery } from "react-query";

export function useGetAllRecruiter() {
  const query = useQuery({
    queryKey: ["recruiters"],
    retry: 1,
    queryFn: () => recruitersProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
