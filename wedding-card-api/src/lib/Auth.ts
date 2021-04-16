import {
  Authority,
  DbHelper,
  HttpResult,
  MiddlewareResult,
} from "@hal-wang/cloudbase-access";
import Collections from "../lib/Collections";

export default class Auth extends Authority {
  async do(): Promise<MiddlewareResult> {
    if (!this.roles || !this.roles.length) {
      return MiddlewareResult.getSuccessResult();
    }

    if (this.roles.includes("admin") && !(await this.adminAuth())) {
      return MiddlewareResult.getFailedResult(
        HttpResult.forbiddenMsg({ message: "不是管理员" })
      );
    }

    return MiddlewareResult.getSuccessResult();
  }

  private async adminAuth(): Promise<boolean> {
    const { admin } = this.requestParams.headers;

    const adminKey = (await DbHelper.getScalar(
      Collections.config,
      "admin",
      "key"
    )) as string;

    return adminKey == admin;
  }
}
