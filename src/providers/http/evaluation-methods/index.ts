import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICreateEvaluationMethod,
  IEvaluationMethod,
  IUpdateEvaluationMethod,
} from "./interface";

export class EvaluationMethodsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/evaluation-methods`);
  }

  getAll(): Promise<IResponse<IEvaluationMethod[]>> {
    return this.get("/");
  }

  getOne(uuid: string): Promise<IResponse<IEvaluationMethod>> {
    return this.get(`/${uuid}`);
  }

  create(data: ICreateEvaluationMethod) {
    return this.post("/", data);
  }

  update(uuid: string, data: IUpdateEvaluationMethod) {
    return this.patch(`/${uuid}`, data);
  }

  destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const evaluationMethodsProvider = new EvaluationMethodsProvider();

export default evaluationMethodsProvider;