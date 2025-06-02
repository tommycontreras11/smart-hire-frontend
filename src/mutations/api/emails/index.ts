import { ICandidateHiredProps } from "@/components/common/emails/candidate-hired";
import { ISendInterviewScheduleEmail, IResponseEmail } from "@/providers/http/emails/interface";

export async function useSendInterviewScheduleEmail(data: ISendInterviewScheduleEmail): Promise<IResponseEmail> {
  try {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || "Something went wrong");
    }

    return await response.json();
  } catch (error: any) {
      console.log(error)
    return {
      success: false,
      error: error.message || "Unexpected error",
    };
  }
}

export async function useSendHiredEmail(data: ICandidateHiredProps): Promise<IResponseEmail> {
  try {
    const response = await fetch("/api/hired", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || "Something went wrong");
    }

    return await response.json();
  } catch (error: any) {
      console.log(error)
    return {
      success: false,
      error: error.message || "Unexpected error",
    };
  }
}
