import emailsProvider from "@/providers/http/emails";
import { ISendHiredEmailDTO, ISendInterviewEmailDTO } from "@/providers/http/emails/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

export function useSendInterviewEmail(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ISendInterviewEmailDTO) => emailsProvider.sendInterviewEmail(data),
    getMutationOptions(queryClient, "emails", null, {
      onSuccess: onSuccessCallback,
    })
  )
}

export function useSendHiredEmail(onSuccessCallback: (data: any) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ISendHiredEmailDTO) => emailsProvider.sendHiredEmail(data),
    getMutationOptions(queryClient, "emails", null, {
      onSuccess: onSuccessCallback,
    })
  )
}