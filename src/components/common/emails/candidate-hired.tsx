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

export interface ICandidateHiredProps {
  candidateName: string;
  email: string
  positionTitle: string;
  startDate: string;
  hrContactName: string;
  hrContactEmail: string;
  offerLink: string;
}

export const CandidateHired = ({
  candidateName,
  positionTitle,
  startDate,
  hrContactName,
  hrContactEmail,
  offerLink,
}: ICandidateHiredProps) => {
  return (
    <Html>
      <Head />
      <Preview>🎉 Congratulations! You've been hired!</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center my-[30px]">
              You're Hired! 🎉
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Dear <strong>{candidateName}</strong>,
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              We are thrilled to inform you that you have been selected for the position of <strong>{positionTitle}</strong> at our company.
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              <strong>📅 Start Date:</strong> {startDate}
              <br />
              <strong>📩 HR Contact:</strong> {hrContactName} ({hrContactEmail})
            </Text>

            <Text className="text-black text-[14px] leading-[24px] mt-4">
              Please review and accept your job offer by clicking the link below:
            </Text>

            <Text className="text-center mt-4">
              <Link
                href={offerLink}
                className="text-blue-600 text-[16px] font-semibold no-underline"
              >
                View Your Offer Letter
              </Link>
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Welcome aboard, <strong>{candidateName}</strong>! If you have any questions, feel free to reach out to our HR team.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
