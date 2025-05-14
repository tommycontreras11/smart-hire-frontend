import { StatusEnum } from "@/enums/common.enum";

export interface IPositionType {
    uuid: string,
    name: string,
    status: StatusEnum
}

export interface ICreatePositionType extends Partial<Omit<IPositionType, "uuid" | "status">> {}

export interface IUpdatePositionType extends ICreatePositionType {}