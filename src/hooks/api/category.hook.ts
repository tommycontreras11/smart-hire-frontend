import categoriesProvider from "@/providers/http/categories";
import { useQuery } from "react-query";

export function useGetAllCategory() {
  const query = useQuery({
    queryKey: ["categories"],
    retry: 1,
    queryFn: () => categoriesProvider.getAll(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetOneCategory(uuid: string) {
  const query = useQuery({
    queryKey: ["category", uuid],
    retry: 1,
    queryFn: () => categoriesProvider.getOne(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}