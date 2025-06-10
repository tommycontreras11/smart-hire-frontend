export interface ISendInterviewScheduleEmail {
  name: string | null;
  email: string | null;
  content: string | undefined;
  subject: string | null;
  date?: Date | undefined;
}

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


export interface IResponseEmail {
  success: boolean;
  error?: string;
}