import { StatusEnum } from "@/enums/common.enum";
import { IPersonBase } from "@/interfaces/common.interface";
import { IDepartment } from "../departments/interface";
import { IPositionType } from "../position-types/interface";

export interface IEmployee extends IPersonBase {
  monthly_salary: string;
  entry_date: Date;
  department: IDepartment;
  positionType: IPositionType;
  url: string;
  status: StatusEnum;
}

export interface IUpdateEmployee  {
  identification: string;
  email: string;
  name: string;
  password: string;
  monthly_salary: string;
  entry_date: Date;
  departmentUUID: string;
  positionTypeUUID: string;
}
