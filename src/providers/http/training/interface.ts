import { StatusEnum } from "@/enums/common.enum";
import { IInstitution } from "../institutions/interface";

export interface ITraining {
  uuid: string;
  name: string;
  description: string;
  level: string;
  date_from: Date;
  date_to: Date;
  institution: IInstitution
  status: StatusEnum
}

export interface ICreateTraining extends Partial<Omit<ITraining, "uuid" | "status">> {
  institutionUUID: string;
}

export interface IUpdateTraining extends Partial<ICreateTraining> {}