import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICandidate, ICreateCandidate } from "./interface";

export class CandidatesProvider extends Base {
    constructor() {
        super(`${config.apiURL}/candidates`);
    }

    public getAll(): Promise<IResponse<ICandidate[]>> {
        return this.get("");
    }

    public getOne(uuid: string): Promise<IResponse<ICandidate>> {
        return this.get("");
    }

    public create(data: ICreateCandidate) {
        return this.post("", data);
    }
}