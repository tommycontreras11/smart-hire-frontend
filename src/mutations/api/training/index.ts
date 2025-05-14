import trainingProvider from "@/providers/http/training";
import { ICreateTraining, IUpdateTraining } from "@/providers/http/training/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useCreateTraining(onSuccessCallback: (data: any) => void) {
    const queryClient = useQueryClient();

    return useMutation(
        (data: ICreateTraining) => trainingProvider.create(data),
        getMutationOptions(queryClient, "trainings", null, {
            onSuccess: onSuccessCallback,
        })
    )
}

export function useUpdateTraining(onSuccessCallback: (data: any) => void) {
    const queryClient = useQueryClient();

    return useMutation(
        ({ uuid, data }: { uuid: string, data: IUpdateTraining }) => trainingProvider.update(uuid, data),
        getMutationOptions(queryClient, "trainings", "training", {
            onSuccess: onSuccessCallback,
        })
    )
}

export function useDeleteTraining(onSuccessCallback: (data: any) => void) {
    const queryClient = useQueryClient();

    return useMutation(
        (uuid: string) => trainingProvider.destroy(uuid),
        getMutationOptions(queryClient, "trainings", "training", {
            onSuccess: onSuccessCallback,
        })
    )
}