import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IAuth, IMeUser } from "./interface";
import { ISignUp } from "@/schema/auth.schema";

export class AuthProvider extends Base {
  constructor() {
    super(`${config.apiURL}/auth`);
  }

  public me(): Promise<IResponse<IMeUser>> {
    return this.get("/me");
  }

  public signIn(data: IAuth): Promise<ISignInResponse> {
    return this.post("/sign-in", data);
  }

  public signUp(data: ISignUp) {
    return this.post("/sign-up", data);
  }

  public signOut() {
    return this.post("/sign-out");
  }
}

const authProvider = new AuthProvider();

export default authProvider;