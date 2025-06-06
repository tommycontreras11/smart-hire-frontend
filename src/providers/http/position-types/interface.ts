import { StatusEnum } from "@/enums/common.enum";
import { IDepartment } from "../departments/interface";

export interface IPositionType {
  uuid: string;
  name: string;
  department: IDepartment;
  status: StatusEnum;
}

export interface ICreatePositionType {
  name: string;
  departmentUUID: string;
}

export interface IUpdatePositionType extends Partial<ICreatePositionType> {}
