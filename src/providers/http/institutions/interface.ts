import { StatusEnum } from "@/enums/common.enum";

export interface IInstitution {
    uuid: string;
    name: string;
    status: StatusEnum;
}

export interface ICreateInstitution extends Partial<Omit<IInstitution, "uuid" | "status">> {}

export interface IUpdateInstitution extends ICreateInstitution {}