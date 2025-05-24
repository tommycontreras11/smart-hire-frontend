import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICompetency, ICreateCompetency, IUpdateCompetency } from "./interface";

export class CompetenciesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/competencies`);
  }

  public getAll(): Promise<IResponse<ICompetency[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<ICompetency>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateCompetency) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateCompetency) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const competenciesProvider = new CompetenciesProvider();

export default competenciesProvider;
