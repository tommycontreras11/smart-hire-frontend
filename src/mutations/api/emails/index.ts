import { ICandidateHiredProps } from "@/components/common/emails/candidate-hired";
import emailsProvider from "@/providers/http/emails";
import { ISendInterviewScheduleEmail, IResponseEmail, ISendInterviewEmailDTO, ISendHiredEmailDTO } from "@/providers/http/emails/interface";
import { getMutationOptions } from "@/utils/reactQueryOptions";
import { useMutation, useQueryClient } from "react-query";

// export async function useSendInterviewScheduleEmail(data: ISendInterviewScheduleEmail): Promise<IResponseEmail> {
//   try {
//     const response = await fetch("/api", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error?.message || "Something went wrong");
//     }

//     return await response.json();
//   } catch (error: any) {
//       console.log(error)
//     return {
//       success: false,
//       error: error.message || "Unexpected error",
//     };
//   }
// }

// export async function useSendHiredEmail(data: ICandidateHiredProps): Promise<IResponseEmail> {
//   try {
//     const response = await fetch("/api/hired", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error?.message || "Something went wrong");
//     }

//     return await response.json();
//   } catch (error: any) {
//       console.log(error)
//     return {
//       success: false,
//       error: error.message || "Unexpected error",
//     };
//   }
// }

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