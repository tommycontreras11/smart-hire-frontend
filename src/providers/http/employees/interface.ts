import { StatusEnum } from "@/enums/common.enum";
import { IDepartment } from "../departments/interface";
import { IJobPosition } from "../job-positions/interface";
import { IPersonBase } from "@/interfaces/common.interface";

export interface IEmployee extends IPersonBase {
  monthly_salary: string;
  entry_date: Date;
  department: IDepartment;
  jobPosition: IJobPosition;
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
  jobPositionUUID: string;
}
