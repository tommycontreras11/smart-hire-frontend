import jobPositionsProvider from "@/providers/http/job-positions";
import { useQuery } from "react-query";

export function useGetAllJobPosition() {
    const query = useQuery({
        queryKey: ["job-positions"],
        retry: 1,
        queryFn: () => jobPositionsProvider.getAll(),
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