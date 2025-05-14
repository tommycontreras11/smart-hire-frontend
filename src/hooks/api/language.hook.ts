import languagesProvider from "@/providers/http/languages";
import { useQuery } from "react-query";

export function useGetAllLanguage() {
  const query = useQuery({
    queryKey: ["languages"],
    retry: 1,
    queryFn: () => languagesProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneLanguage(uuid: string) {
  const query = useQuery({
    queryKey: ["language", uuid],
    retry: 1,
    queryFn: () => languagesProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
