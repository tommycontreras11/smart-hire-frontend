import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

interface InterviewScheduledProps {
  candidateName: string;
  interviewDate: string;
  interviewTime: string;
  interviewerName: string;
  interviewLink: string;
}

export const InterviewScheduled = ({
  candidateName,
  interviewDate,
  interviewTime,
  interviewerName,
  interviewLink,
}: InterviewScheduledProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your interview has been scheduled 🎥</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center my-[30px]">
              Interview Scheduled
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello <strong>{candidateName}</strong>,
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              Your remote interview has been scheduled with the following details:
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              <strong>📆 Date:</strong> {interviewDate}
              <br />
              <strong>🕒 Time:</strong> {interviewTime}
              <br />
              <strong>👤 Interviewer:</strong> {interviewerName}
            </Text>

            <Text className="text-black text-[14px] leading-[24px] mt-4">
              You can join the interview using the link below:
            </Text>

            <Text className="text-center mt-4">
              <Link
                href={interviewLink}
                className="text-blue-600 text-[16px] font-semibold no-underline"
              >
                {interviewLink}
              </Link>
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This message was sent to <strong>{candidateName}</strong>. If you are not expecting this interview, please ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
