import { StatusEnum } from "@/enums/common.enum";

export interface IJobSource {
  uuid: string;
  name: string;
  status: StatusEnum;
}
