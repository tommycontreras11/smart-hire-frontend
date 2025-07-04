import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  IAcademicDiscipline,
  ICreateAcademicDiscipline,
  IUpdateAcademicDiscipline,
} from "./interface";

export class AcademicDisciplinesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/academic-disciplines`);
  }

  public getAll(): Promise<IResponse<IAcademicDiscipline[]>> {
    return this.get("");
  }

  public getOne(uuid: string): Promise<IResponse<IAcademicDiscipline>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateAcademicDiscipline) {
    return this.post("", data);
  }

  public update(uuid: string, data: IUpdateAcademicDiscipline) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const academicDisciplinesProvider = new AcademicDisciplinesProvider();

export default academicDisciplinesProvider;
