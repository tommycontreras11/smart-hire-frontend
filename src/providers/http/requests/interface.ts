import { StatusEnum } from "@/enums/common.enum";
import { ICandidate } from "../candidates/interface";
import { IJobPosition } from "../job-positions/interface";
import { IRecruiter } from "../recruiters/interface";

export interface IRequest {
  uuid: string;
  candidate: ICandidate;
  jobPosition: IJobPosition;
  recruiter: IRecruiter;
  status: StatusEnum;
}

export interface ICreateRequest {
  candidateUUID: string;
  jobPositionUUID: string;
}

export interface IUpdateRequest extends Partial<ICreateRequest> {}