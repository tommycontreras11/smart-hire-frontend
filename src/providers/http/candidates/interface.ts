import { StatusEnum } from "@/enums/common.enum";
import { IPositionType } from "../position-types/interface";
import { IDepartment } from "../departments/interface";

export interface ICandidate {
  uuid: string;
  identification: string;
  name: string;
  password: string;
  desired_salary: string;
  desiredPosition: IPositionType;
  department: IDepartment;
  url: string;
  status: StatusEnum;
}

export interface ICreateCandidate
  extends Partial<
    Omit<ICandidate, "uuid" | "desiredPosition" | "department" | "status">
  > {
  positionUUID: string;
  departmentUUID: string;
}

export interface IUpdateCandidate extends Partial<ICreateCandidate> {}
