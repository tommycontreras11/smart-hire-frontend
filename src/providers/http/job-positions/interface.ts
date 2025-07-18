import { StatusEnum } from "@/enums/common.enum";
import { ICountry } from "../countries/interface";
import { ILanguage } from "../languages/interface";
import { IRecruiter } from "../recruiters/interface";
import { ICompetency } from "../competencies/interface";
import { IDepartment } from "../departments/interface";
import { IPositionType } from "../position-types/interface";
import { StatusRequestFilterEnum } from "@/enums/request.enum";

export interface IJobPosition {
  uuid: string;
  name: string;
  description: string;
  minimum_salary: string;
  maximum_salary: string;
  contract_type: string;
  due_date: Date;
  country: ICountry;
  language: ILanguage;
  recruiter: IRecruiter;
  department: IDepartment;
  positionType: IPositionType;
  competencies: ICompetency[];
  total_applied: number;
  posted: string;
  date_posted: Date;
  status: StatusEnum;
}

export interface IJobPositionFilter {
  jobOrSkill?: string | undefined;
  location?: string | undefined;
  contractType?: string | undefined;
}

export interface IRecruitmentProcess {
  uuid: string;
  candidateUUID: string;
  name: string;
  email: string;
  institution: string;
  position: string;
  curriculum: string;
  next_step?: string;
  interview_date?: Date;
  applied_at: Date;
  last_update: Date;
  status: StatusRequestFilterEnum
}

export interface ICreateJobPosition {
  name: string;
  description: string;
  minimum_salary: string;
  maximum_salary: string;
  contract_type: string;
  due_date: Date;
  recruiterUUID?: string;
  countryUUID: string;
  languageUUID: string;
  departmentUUID: string;
  positionTypeUUID: string;
  competencyUUIDs: string[];
}

export interface IUpdateJobPosition extends Partial<ICreateJobPosition> {}
