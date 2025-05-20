import { StatusEnum } from "@/enums/common.enum";
import { IDepartment } from "../departments/interface";
import { IJobPosition } from "../job-positions/interface";

export interface IEmployee {
  uuid: string;
  identification: string;
  name: string;
  password: string;
  monthly_salary: string;
  entry_date: Date;
  department: IDepartment;
  jobPosition: IJobPosition;
  url: string;
  status: StatusEnum;
}

export interface IUpdateEmployee  {
  identification: string;
  name: string;
  password: string;
  monthly_salary: string;
  entry_date: Date;
  departmentUUID: string;
  jobPositionUUID: string;
}
