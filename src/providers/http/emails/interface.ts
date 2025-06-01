export interface ISendInterviewScheduleEmail {
  name: string | null;
  email: string | null;
  content: string | undefined;
  subject: string | null;
  date?: Date | undefined;
}

export interface IResponseEmail {
  success: boolean;
  error?: string;
}