import { StatusEnum } from "@/enums/common.enum";
import { IInstitution } from "../institutions/interface";
import { IPersonBase } from "@/interfaces/common.interface";
import { StatusRequestEnum } from "@/enums/request.enum";

export interface IRecruiter extends IPersonBase {
  institution: IInstitution;
  status: StatusEnum;
}

export interface IRecruiterDashboard {
  dashboardResume: IDashboardResume;
  recruitmentMonthActivity: IRecruitmentMonthActivity[];
  recruitmentDepartmentActivity: IRecruitmentDepartmentActivity[];
  activeVacancies: IActiveVacancy[];
  recentCandidates: IRecentCandidate[];
}

export interface IRecruitmentCommonActivity {
  total_candidates: number;
  total_hired: number;
}

export interface IDashboardResume {
  total_active_vacancies: number;
  total_recent_candidates: number;
  total_interviews: number;
  total_hired: number;
}

export interface IRecruitmentMonthActivity {
  month: string;
  activity: IRecruitmentCommonActivity;
}

export interface IRecruitmentDepartmentActivity
  extends IRecruitmentCommonActivity {
  department: string;
  total_candidates: number;
  total_hired: number;
}

export interface IActiveVacancy {
  uuid: string;
  name: string;
  department: string;
  country: string;
  total_candidates: number;
  due_date: Date;
}

export interface IRecentCandidate {
  uuid: string;
  full_name: string;
  position_type: string;
  applied_at: Date;
  status: StatusRequestEnum;
}

export interface ICreateRecruiter {
  identification: string;
  email: string;
  name: string;
  password: string;
  institution: string;
}

export interface IUpdateRecruiter extends Partial<ICreateRecruiter> {}
