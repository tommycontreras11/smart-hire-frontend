import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateEducation, IEducation, IUpdateEducation } from "./interface";

export class EducationsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/candidates`);
  }

  public getOne(uuid: string): Promise<IResponse<IEducation>> {
    return this.post(`/${uuid}/educations`);
  }

  public create(candidateUUID: string, data: ICreateEducation) {
    return this.post(`/${candidateUUID}/educations`, data);
  }

  public update(uuid: string, data: IUpdateEducation) {
    return this.patch(`/${uuid}/educations`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}/educations`);
  }
}

const educationsProvider = new EducationsProvider();

export default educationsProvider;
