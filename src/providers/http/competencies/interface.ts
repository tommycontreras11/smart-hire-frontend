import { StatusEnum } from "@/enums/common.enum";
import { ICategory } from "../categories/interface";
import { IEvaluationMethod } from "../evaluation-methods/interface";
import { IPositionType } from "../position-types/interface";

export interface ICompetency {
  uuid: string;
  name: string;
  category: ICategory;
  level: string;
  evaluationMethods: IEvaluationMethod[];
  positionTypes: IPositionType[];
  status: StatusEnum;
}

export interface ICreateCompetency
  extends Partial<
    Omit<
      ICompetency,
      "uuid" | "category" | "evaluationMethods" | "positionTypes" | "status"
    >
  > {
  categoryUUID: string;
  evaluationMethodUUIDs: string[];
  positionTypeUUIDs: string[];
}

export interface IUpdateCompetency extends Partial<ICreateCompetency> {}
