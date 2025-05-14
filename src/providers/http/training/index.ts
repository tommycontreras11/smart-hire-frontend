import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateTraining, ITraining, IUpdateTraining } from "./interface";

export class TrainingProvider extends Base {
  constructor() {
    super(`${config.apiURL}/trainings`);
  }

  public getAll(): Promise<IResponse<ITraining[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<ITraining>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateTraining) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateTraining) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const trainingProvider = new TrainingProvider();

export default trainingProvider;