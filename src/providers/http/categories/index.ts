import { config } from "@/lib/config";
import Base from "@/providers/base";
import { ICategory, ICreateCategory, IUpdateCategory } from "./interface";

export class CategoriesProvider extends Base {
  constructor() {
    super(`${config.apiURL}/categories`);
  }

  public getAll(): Promise<IResponse<ICategory[]>> {
    return this.get("/");
  }

  public getOne(uuid: string): Promise<IResponse<ICategory>> {
    return this.get(`/${uuid}`);
  }

  public create(data: ICreateCategory) {
    return this.post("/", data);
  }

  public update(uuid: string, data: IUpdateCategory) {
    return this.patch(`/${uuid}`, data);
  }

  public destroy(uuid: string) {
    return this.delete(`/${uuid}`);
  }
}

const categoriesProvider = new CategoriesProvider()

export default categoriesProvider