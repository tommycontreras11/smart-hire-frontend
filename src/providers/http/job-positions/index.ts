import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICreateJobPosition,
  IJobPosition,
  IUpdateJobPosition,
} from "./interface";

export class JobPositionsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/job-positions`);
  }

  public getAll(): Promise<IResponse<IJobPosition[]>> {
    return this.get("/");
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