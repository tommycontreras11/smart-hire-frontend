import { IAcademicDiscipline } from "../academic-disciplines/interface";
import { ICandidate } from "../candidates/interface";
import { IInstitution } from "../institutions/interface";

export interface IEducation {
  title?: string;
  grade?: string;
  description?: string;
  start_date?: Date;
  end_date?: Date;
  institution: IInstitution;
  candidate: ICandidate;
  academicDiscipline?: IAcademicDiscipline;
}

export interface ICreateEducation
  extends Partial<
    Omit<
      IEducation,
      "uuid" | "institution" | "candidate" | "academicDiscipline"
    >
  > {
  institutionUUID: string;
  academicDisciplineUUID?: string;
}

export interface IUpdateEducation extends Partial<ICreateEducation> {}
