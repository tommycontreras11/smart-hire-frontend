import { StatusEnum } from "@/enums/common.enum"

export interface ICategory {
    uuid: string
    name: string
    status: StatusEnum
}

export interface ICreateCategory extends Partial<Omit<ICategory, "uuid" | "status">> {}

export interface IUpdateCategory extends ICreateCategory {}