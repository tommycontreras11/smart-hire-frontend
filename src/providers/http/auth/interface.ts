import { StatusEnum, UserRoleEnum } from "@/enums/common.enum";
import { ICreateCandidate } from "../candidates/interface";
import { ICertification } from "../certifications/interface";
import { IEducation } from "../educations/interface";
import { IJobPosition } from "../job-positions/interface";
import { ICreateRecruiter, IRecruiter } from "../recruiters/interface";
import { ISocialLink } from "../social-links/interface";
import { ICompetency } from "../competencies/interface";
import { IWorkExperience } from "../work-experiences/interface";

export interface IAuth {
  email: string;
  password: string;
}

export interface ISignUp {
  user: ICreateCandidate | ICreateRecruiter
  type: UserRoleEnum
}

export interface IMeUser{
  uuid: string;
  identification: string;
  email: string;
  name: string;
  status: StatusEnum;
  role: UserRoleEnum;
}

interface IRecruitment {
  recruiter: IRecruiter
}

interface IRequest {
  uuid: string
  recruitment: IRecruitment
  jobPosition: IJobPosition
  started_at?: Date
}

export interface IProfile {
  uuid: string
  identification: string;
  email: string;
  name: string;
  password: string;
  desired_salary: string;
  phone?: string;
  location?: string
  bio?: string
  educations?: IEducation[]
  certifications?: ICertification[]
  requests?: IRequest[]
  socialLinks: ISocialLink[]
  competencies?: ICompetency[]
  workExperiences?: IWorkExperience[]
  photo?: string
  curriculum?: string
  status: StatusEnum
}