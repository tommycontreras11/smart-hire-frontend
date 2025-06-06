import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICreateJobPosition,
  IJobPosition,
  IJobPositionFilter,
  IRecruitmentProcess,
  IUpdateJobPosition,
} from "./interface";
import { appendFilterString } from "@/utils/job-position";

export class JobPositionsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/job-positions`);
  }

  public getAll(filters?: IJobPositionFilter): Promise<IResponse<IJobPosition[]>> {
    let filtersString = appendFilterString(filters);
    return this.get(`/${filtersString != undefined ? filtersString : ""}`);
  }

  public getAllRecruitmentProcess(): Promise<IResponse<IRecruitmentProcess[]>> {
    return this.get("/recruitment-process");
  }

  public getOne(uuid: string): Promise<IResponse<IJobPosition>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateJobPosition) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateJobPosition) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const jobPositionsProvider = new JobPositionsProvider();

export default jobPositionsProvider;