import { Authority, HttpResult } from "@hbrwang/cloudbase-access";
import DbHelper from "./DbHelper";
import Collections from "../lib/Collections";

export default class Auth extends Authority {
  async do(): Promise<HttpResult | null> {
    if (!this.roles || !this.roles.length) return null;

    if (this.roles.includes("admin") && !(await this.adminAuth())) {
      return HttpResult.forbidden("不是管理员");
    }

    return null;
  }

  private async adminAuth(): Promise<boolean> {
    const { admin } = this.requestParams.headers;

    const adminKey = (await DbHelper.getField(
      Collections.config,
      "admin",
      "key"
    )) as string;

    return adminKey == admin;
  }
}
