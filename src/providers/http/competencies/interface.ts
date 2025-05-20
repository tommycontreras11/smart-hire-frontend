import { StatusEnum } from "@/enums/common.enum";
import { LevelCompetencyEnum } from "@/enums/competency.enum";

export interface ICompetency {
  uuid: string;
  name: string;
  level: LevelCompetencyEnum;
  status: StatusEnum;
}
