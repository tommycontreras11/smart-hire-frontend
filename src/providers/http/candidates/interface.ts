import { StatusEnum } from "@/enums/common.enum";
import { IPositionType } from "../position-types/interface";
import { IDepartment } from "../departments/interface";
import { IPersonBase } from "@/interfaces/common.interface";

export interface ICandidate extends IPersonBase {
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
