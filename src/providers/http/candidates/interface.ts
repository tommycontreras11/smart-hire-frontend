import { StatusEnum } from "@/enums/common.enum";
import { IPersonBase } from "@/interfaces/common.interface";
import { IDepartment } from "../departments/interface";
import { IPositionType } from "../position-types/interface";

export interface ICandidate extends IPersonBase {
  desired_salary: string;
  desiredPosition: IPositionType;
  department: IDepartment;
  status: StatusEnum;
}

export interface ICreateCandidate {  
  identification: string;
  email: string;
  name: string;
  password: string;
  desired_salary: string;
  positionUUID: string;
  departmentUUID: string;
}

export interface IUpdateCandidate extends Partial<ICreateCandidate> {}
