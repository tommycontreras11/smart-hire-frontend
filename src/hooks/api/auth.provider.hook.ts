import authProvider from "@/providers/http/auth";
import { useQuery } from "react-query";

export function useMe() {
  const query = useQuery({
    queryKey: ["me"],
    retry: 1,
    queryFn: () => authProvider.me(),
  });

  return {
    ...query,
    data: query.data?.data,
  };
}

export function useGetProfile(uuid: string) {
  const query = useQuery({
    queryKey: ["profile", uuid],
    retry: 1,
    queryFn: () => authProvider.profile(uuid),
    enabled: !!uuid,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
