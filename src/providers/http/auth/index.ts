import { config } from "@/lib/config";
import Base from "@/providers/base";
import { IAuth, IMeUser, IProfile } from "./interface";
import { ISignUp } from "@/schema/auth.schema";

export class AuthProvider extends Base {
  constructor() {
    super(`${config.apiURL}/auth`);
  }

  public me(): Promise<IResponse<IMeUser>> {
    return this.get("/me");
  }

  public profile(uuid: string): Promise<IResponse<IProfile>> {
    return this.get(`/account/${uuid}/profile`);
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