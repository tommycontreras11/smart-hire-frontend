import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ISendHiredEmailDTO, ISendInterviewEmailDTO } from "./interface";

export class EmailsProvider extends Base {
  constructor() {
    super(`${config.apiURL}/emails`);
  }

  public sendInterviewEmail(data: ISendInterviewEmailDTO) {
    return this.post("/send-interview", data);
  }

  public sendHiredEmail(data: ISendHiredEmailDTO) {
    return this.post("/send-hired", data);
  }
}

const emailsProvider = new EmailsProvider();

export default emailsProvider;