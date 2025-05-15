import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateRecruiter, IRecruiter, IUpdateRecruiter } from "./interface";

export class RecruitersProvider extends Base {
  constructor() {
    super(`${config.apiURL}/recruiters`);
  }

  public getAll(): Promise<IResponse<IRecruiter[]>> {
    return this.get("");
  }

  public getOne(uuid: string): Promise<IResponse<IRecruiter>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateRecruiter) {
    return this.post("", data);
  }

  public update(uuid: string, data: IUpdateRecruiter) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const recruitersProvider = new RecruitersProvider();

export default recruitersProvider;
