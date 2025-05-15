import { StatusEnum } from "@/enums/common.enum";
import { IInstitution } from "../institutions/interface";

export interface IRecruiter {
  uuid: string;
  identification: string;
  name: string;
  password: string;
  url: string;
  institution: IInstitution;
  status: StatusEnum;
}

export interface ICreateRecruiter extends Partial<Omit<IRecruiter, "uuid" | "institution" | "status">> {
  institution: string
}

export interface IUpdateRecruiter extends Partial<ICreateRecruiter> {}