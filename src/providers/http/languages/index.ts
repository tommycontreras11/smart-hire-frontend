import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateLanguage, ILanguage, IUpdateLanguage } from "./interface";

export class LanguagesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/languages`);
  }

  public getAll(): Promise<IResponse<ILanguage[]>> {
    return this.get("");
  }

  public getOne(uuid: string): Promise<IResponse<ILanguage>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateLanguage) {
    return this.post("", data);
  }

  public update(uuid: string, data: IUpdateLanguage) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const languagesProvider = new LanguagesProvider();

export default languagesProvider;
