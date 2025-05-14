import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IRecruiter } from "./interface";

export class RecruitersProvider extends Base {
    constructor() {
        super(`${config.apiURL}/recruiters`);
    }

    public getAll(): Promise<IResponse<IRecruiter[]>> {
        return this.get("");
    }
}

const recruitersProvider = new RecruitersProvider();

export default recruitersProvider;