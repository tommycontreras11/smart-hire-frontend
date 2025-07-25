import { WorkContractTypeEnum, WorkLocationTypeEnum } from "@/enums/work.enum";
import { IPositionType } from "../position-types/interface";
import { IInstitution } from "../institutions/interface";
import { ICompetency } from "../competencies/interface";
import { IJobSource } from "../job-sources/interface";

export interface IWorkExperience {
  uuid: string;
  description?: string;
  date_from: Date;
  date_to: Date;
  location?: string;
  work_type?: WorkContractTypeEnum;
  work_location?: WorkLocationTypeEnum;
  current_position: string;
  position: IPositionType
  institution: IInstitution
  jobSource?: IJobSource
  competencies?: ICompetency[]
}
