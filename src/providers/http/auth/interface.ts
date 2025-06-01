import { StatusEnum, UserRoleEnum } from "@/enums/common.enum";
import { ICreateCandidate } from "../candidates/interface";
import { ICreateRecruiter } from "../recruiters/interface";

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