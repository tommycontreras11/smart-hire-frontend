export interface ISendInterviewEmailDTO {
  requestUUID: string;
  candidateName: string | null;
  interviewDate: string | null;
  interviewTime: string | null;
  interviewerName: string | null;
  interviewLink: string | undefined;
  to: string;
}

export interface ISendHiredEmailDTO {
  requestUUID: string;
  candidateName: string;
  email: string;
  positionTitle: string;
  startDate: string;
  hrContactName: string;
  hrContactEmail: string;
  offerLink: string;
}