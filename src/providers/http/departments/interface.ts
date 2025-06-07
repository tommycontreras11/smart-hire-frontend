import { StatusEnum } from "@/enums/common.enum";
import { IPositionType } from "../position-types/interface";

export interface IDepartment {
  uuid: string;
  name: string;
  positionTypes: IPositionType[];
  status: StatusEnum;
}

export interface ICreateDepartment
  extends Partial<Omit<IDepartment, "uuid" | "positionTypes" | "status">> {}

export interface IUpdateDepartment extends ICreateDepartment {}