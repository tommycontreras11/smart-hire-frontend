import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICompetency } from "./interface";

export class CompetenciesProvider extends Base { 
    constructor() {
        super(`${config.apiURL}/competencies`);
    }

    public getAll(): Promise<IResponse<ICompetency[]>> {
        return this.get("/");
     }
}

const competenciesProvider = new CompetenciesProvider();

export default competenciesProvider;