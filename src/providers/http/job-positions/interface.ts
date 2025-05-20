import { StatusEnum } from "@/enums/common.enum";
import { ICountry } from "../countries/interface";
import { ILanguage } from "../languages/interface";
import { IRecruiter } from "../recruiters/interface";
import { ICompetency } from "../competencies/interface";

export interface IJobPosition {
  uuid: string;
  name: string;
  description: string;
  minimum_salary: string;
  maximum_salary: string;
  contract_type: string;
  country: ICountry;
  language: ILanguage;
  recruiter: IRecruiter;
  competencies: ICompetency[]
  status: StatusEnum;
}

export interface ICreateJobPosition
  extends Partial<
    Omit<IJobPosition, "uuid" | "country" | "language" | "recruiter" | "competencies" | "status">
  > {
  countryUUID: string;
  languageUUID: string;
  recruiterUUID: string;
  competencyUUIDs: string[];
}

export interface IUpdateJobPosition extends Partial<ICreateJobPosition> {}
