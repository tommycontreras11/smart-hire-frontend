import educationsProvider from "@/providers/http/educations";
import { useQuery } from "react-query";

export function useGetOneEducation(uuid: string) {
  const query = useQuery({
    queryKey: ["education", uuid],
    retry: 1,
    queryFn: () => educationsProvider.getOne(uuid),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
