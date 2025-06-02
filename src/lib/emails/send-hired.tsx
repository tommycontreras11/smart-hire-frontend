import {
  CandidateHired,
  ICandidateHiredProps,
} from "@/components/common/emails/candidate-hired";
import { render } from "@react-email/components";
import { sendEmail } from "./send-email";

export async function sendCandidateHiredEmail({
  candidateName,
  email,
  positionTitle,
  startDate,
  hrContactName,
  hrContactEmail,
  offerLink,
}: ICandidateHiredProps) {
  const html = await render(CandidateHired({
    candidateName,
    email,
    positionTitle,
    startDate,
    hrContactName,
    hrContactEmail,
    offerLink
  }));

  return await sendEmail({
    to: email,
    subject: "You're Hired! 🎉",
    html,
  });
}
