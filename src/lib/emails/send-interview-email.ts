// lib/emails/send-interview-email.ts
import { InterviewScheduled } from "@/components/common/emails/interview-scheduled";
import { sendEmail } from "@/lib/emails/send-email";
import { render } from "@react-email/components";

export async function sendInterviewEmail({
  name,
  email,
  date,
  subject,
  content,
}: {
  name: string;
  email: string;
  date: string;
  subject: string;
  content: string;
}) {
  const html = await render(
    InterviewScheduled({
      candidateName: name,
      interviewLink: content,
      interviewerName: subject,
      interviewDate: new Date(date).toLocaleDateString(),
      interviewTime: new Date(date).toLocaleTimeString(),
    })
  );

  return await sendEmail({ to: email, subject: "Interview Confirmation 🎉", html });
}
