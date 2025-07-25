import workExperiencesProvider from "@/providers/http/work-experiences";
import { useQuery } from "react-query";

export function useGetAllWorkExperience() {
  const query = useQuery({
    queryKey: ["work-experiences"],
    queryFn: () => workExperiencesProvider.getAll(),
    retry: 1,
  });

  return {
    ...query,
    data: query?.data?.data,
  };
}

export function useGetOneWorkExperience(uuid: string) {
  const query = useQuery({
    queryKey: ["work-experience", uuid],
    queryFn: () => workExperiencesProvider.getOne(uuid),
    retry: 1,
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query?.data?.data,
  };
}
