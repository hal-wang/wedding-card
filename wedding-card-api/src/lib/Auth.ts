import {
  Authority,
  HttpResult,
  HttpResultError,
  MiddlewareResult,
} from "@hal-wang/cloudbase-access";

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
    if (!process.env.ADMIN) {
      throw new HttpResultError(
        HttpResult.forbiddenMsg({
          message: '请添加环境变量"ADMIN", 值为管理员密码',
        })
      );
    }
    const { admin } = this.requestParams.headers;
    return admin == process.env.ADMIN;
  }
}
