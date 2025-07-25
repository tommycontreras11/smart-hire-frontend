import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IWorkExperience } from "./interface";

export class WorkExperiencesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/work-experiences`);
  }

  public getAll(): Promise<IResponse<IWorkExperience[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<IWorkExperience>> {
    return this.get(`/${uuid}`);
  }
  
  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const workExperiencesProvider = new WorkExperiencesProvider();

export default workExperiencesProvider;
