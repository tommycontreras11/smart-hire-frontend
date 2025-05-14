import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICreatePositionType,
  IPositionType,
  IUpdatePositionType,
} from "./interface";

export class PositionTypesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/position-types`);
  }

  public getAll(): Promise<IResponse<IPositionType[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<IPositionType>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreatePositionType) {
    return this.post("", data);
  }

  public update(uuid: string, data: IUpdatePositionType) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const positionTypesProvider = new PositionTypesProvider();

export default positionTypesProvider;