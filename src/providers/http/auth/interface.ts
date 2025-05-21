import { StatusEnum, UserRoleEnum } from "@/enums/common.enum";

export interface IAuth {
  email: string;
  password: string;
}

export interface IMeUser{
  uuid: string;
  identification: string;
  email: string;
  name: string;
  status: StatusEnum;
  role: UserRoleEnum;
}