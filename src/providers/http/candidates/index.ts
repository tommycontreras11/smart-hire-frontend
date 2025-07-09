import { config } from "@/lib/config";
import Base from "@/providers/base";
import {
  ICandidate,
  ICreateCandidate,
  IUpdateCandidate,
  IUpdateCandidateProfile,
} from "./interface";

export class CandidatesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/candidates`);
  }

  public getAll(): Promise<IResponse<ICandidate[]>> {
    return this.get("");
  }

  public getOne(uuid: string): Promise<IResponse<ICandidate>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateCandidate) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateCandidate) {
    return this.patch(`/${uuid}`, data);
  }

  public updateProfile(uuid: string, data: FormData) {
    return this.patch(`/${uuid}/profile`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const candidatesProvider = new CandidatesProvider();

export default candidatesProvider;
