import { StatusEnum } from "@/enums/common.enum";
import { IInstitution } from "../institutions/interface";
import { IPersonBase } from "@/interfaces/common.interface";

export interface IRecruiter extends IPersonBase {
  url: string;
  institution: IInstitution;
  status: StatusEnum;
}

export interface ICreateRecruiter
  extends Partial<Omit<IRecruiter, "uuid" | "institution" | "status">> {
  institution: string;
}

export interface IUpdateRecruiter extends Partial<ICreateRecruiter> {}
