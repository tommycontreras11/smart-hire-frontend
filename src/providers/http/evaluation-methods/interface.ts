import { StatusEnum } from "@/enums/common.enum";

export interface IEvaluationMethod {
  uuid: string;
  name: string;
  status: StatusEnum;
}

export interface ICreateEvaluationMethod extends Partial<Omit<IEvaluationMethod, "uuid">> {}

export interface IUpdateEvaluationMethod extends Partial<ICreateEvaluationMethod> {}