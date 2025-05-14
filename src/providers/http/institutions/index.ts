import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICreateInstitution,
  IInstitution,
  IUpdateInstitution,
} from "./interface";

export class InstitutionsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/institutions`);
  }

  public getAll(): Promise<IResponse<IInstitution[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<IInstitution>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateInstitution) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateInstitution) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const institutionsProvider = new InstitutionsProvider();

export default institutionsProvider;