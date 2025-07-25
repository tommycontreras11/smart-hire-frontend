import workExperiencesProvider from "@/providers/http/work-experiences";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useDeleteWorkExperience(
  onSuccessCallback: (data: any) => void
) {
  const queryClient = useQueryClient();

  return useMutation(
    (uuid: string) => workExperiencesProvider.destroy(uuid),
    getMutationOptions(queryClient, "work-experiences", "work-experience", {
      onSuccess: onSuccessCallback,
    })
  );
}
