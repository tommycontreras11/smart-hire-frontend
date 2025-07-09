import { PlatformTypeEnum } from "@/enums/social-link.enum";
import { IPersonBase } from "@/interfaces/common.interface";
import { ICertification, ICreateCertification } from "../certifications/interface";
import { IDepartment } from "../departments/interface";
import { ICreateEducation, IEducation } from "../educations/interface";
import { IPositionType } from "../position-types/interface";

export interface ICandidate extends IPersonBase {
  phone?: string;
  location?: string
  bio?: string
  desired_salary: string;
  desiredPosition: IPositionType;
  department: IDepartment;
  workExperience: string;
  educations?: IEducation[]
  certifications?: ICertification[]
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

interface ProfessionalDTO {
  education?: ICreateEducation 
  certification?: ICreateCertification;
  competencyUUIDs?: string[];
}

interface PersonalDTO extends Partial<Omit<ICandidate, "uuid" | "desiredPosition" | "department" | "workExperience" | "educations" | "certifications">> {
  social_links?: ISocialLinkCandidate[];
  file?: File
}

export interface IUpdateCandidateProfile {
  personal?: PersonalDTO;
  professional?: ProfessionalDTO
}