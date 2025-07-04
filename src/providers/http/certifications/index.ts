import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICreateCertification, ICertification, IUpdateCertification } from "./interface";

export class CertificationsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/candidates`);
  }

  public getOne(uuid: string): Promise<IResponse<ICertification>> {
    return this.post(`/${uuid}/certifications`);
  }

  public create(candidateUUID: string, data: ICreateCertification) {
    return this.post(`/${candidateUUID}/certifications`, data);
  }

  public update(uuid: string, data: IUpdateCertification) {
    return this.patch(`/${uuid}/certifications`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}/certifications`);
  }
}

const certificationsProvider = new CertificationsProvider();

export default certificationsProvider;
