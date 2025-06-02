import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IAcceptJob, IRequest, IUpdateRequest } from "./interface";

export class RequestsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/requests`);
  }

  getAll(): Promise<IResponse<IRequest[]>> {
    return this.get("/");
  }

  getOne(uuid: string): Promise<IResponse<IRequest>> {
    return this.get(`/${uuid}`);
  }

  create(data: FormData) {
    return this.post(
      "/",
      data,
      {},
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  acceptJob(data: IAcceptJob) {
    return this.post("/accept-job", data);
  }

  update(uuid: string, data: IUpdateRequest) {
    return this.patch(`/${uuid}`, data);
  }

  destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const requestsProvider = new RequestsProvider();

export default requestsProvider;
