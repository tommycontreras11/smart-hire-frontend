import { StatusEnum } from "@/enums/common.enum";
import { ICountry } from "../countries/interface";
import { ILanguage } from "../languages/interface";
import { IRecruiter } from "../recruiters/interface";

export interface IJobPosition {
  uuid: string;
  name: string;
  description: string;
  minimum_salary: string;
  maximum_salary: string;
  risk_level: string;
  contract_type: string;
  country: ICountry;
  language: ILanguage;
  recruiter: IRecruiter;
  status: StatusEnum;
}

export interface ICreateJobPosition
  extends Partial<
    Omit<IJobPosition, "uuid" | "country" | "language" | "recruiter" | "status">
  > {
  countryUUID: string;
  languageUUID: string;
  recruiterUUID: string;
}

export interface IUpdateJobPosition extends Partial<ICreateJobPosition> {}
