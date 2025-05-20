import { StatusEnum, UserRoleEnum } from "@/enums/common.enum";

export interface IAuth {
  identification: string;
  password: string;
}

export interface IMeUser{
  uuid: string;
  name: string;
  identification: string;
  status: StatusEnum;
  role: UserRoleEnum;
}