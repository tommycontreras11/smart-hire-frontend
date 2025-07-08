import { IAcademicDiscipline } from "../academic-disciplines/interface";
import { ICandidate } from "../candidates/interface";
import { IInstitution } from "../institutions/interface";

export interface IEducation {
  uuid: string;
  title?: string;
  description?: string;
  grade?: string;
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
      "institution" | "candidate" | "academicDiscipline"
    >
  > {
  institutionUUID: string;
  academicDisciplineUUID?: string;
}

export interface IUpdateEducation extends Partial<ICreateEducation> {}
