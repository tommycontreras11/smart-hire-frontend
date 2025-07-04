import { StatusEnum } from "@/enums/common.enum";
import { IPersonBase } from "@/interfaces/common.interface";
import { IDepartment } from "../departments/interface";
import { IPositionType } from "../position-types/interface";
import { IEducation } from "../educations/interface";
import { ICertification } from "../certifications/interface";
import { PlatformTypeEnum } from "@/enums/social-link.enum";

export interface ICandidate extends IPersonBase {
  phone?: string;
  location?: string
  desired_salary: string;
  desiredPosition: IPositionType;
  department: IDepartment;
  workExperience: string;
  educations?: IEducation[]
  certifications?: ICertification[]
  status: StatusEnum;
}

export interface ICreateCandidate {  
  identification: string;
  email: string;
  name: string;
  password: string;
  desired_salary: string;
  positionUUID: string;
  departmentUUID: string;
}

export interface IUpdateCandidate extends Partial<ICreateCandidate> {
  trainingUUIDs?: string[];
  competencyUUIDs?: string[];
}


export interface ISocialLinkCandidate { 
  key: PlatformTypeEnum;
  value: string;
}

export interface IUpdateCandidateProfile {
  identification?: string;
  email?: string;
  name?: string;
  password?: string;
  desired_salary?: string;
  phone?: string;
  location?: string
  social_links?: ISocialLinkCandidate[]
  competencyUUIDs?: string[];
}