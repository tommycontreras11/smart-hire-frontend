import { StatusRequestEnum } from "@/enums/request.enum";
import { ICandidate } from "../candidates/interface";
import { IJobPosition } from "../job-positions/interface";
import { IRecruiter } from "../recruiters/interface";

export interface IRequest {
  uuid: string;
  candidate: ICandidate;
  jobPosition: IJobPosition;
  recruiter: IRecruiter;
  status: StatusRequestEnum;
}

export interface ICreateRequest {
  file: File;
  candidateUUID?: string;
  jobPositionUUID?: string;
}

export interface IUpdateRequest {
  file?: File;
  link?: string;
  candidateUUID?: string;
  jobPositionUUID?: string;
  nextStep?: string;
  interviewDate?: Date;
  nextStatus?: boolean;
  status?: StatusRequestEnum;
}
