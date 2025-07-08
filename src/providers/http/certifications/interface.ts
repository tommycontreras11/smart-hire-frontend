import { ICompetency } from "../competencies/interface";
import { IInstitution } from "../institutions/interface";

export interface ICertification {
  uuid: string;
  name: string;
  description?: string;
  expedition_date?: Date;
  expiration_date?: Date;
  credential_id?: string;
  credential_link?: string;
  institution: IInstitution;
  competencies?: ICompetency[]
}

export interface ICreateCertification
  extends Partial<Omit<ICertification, "institution">> {
  institutionUUID: string;
}

export interface IUpdateCertification extends Partial<ICreateCertification> {}
