import { Middleware } from "@sfajs/core";

export class AdminAuthMiddleware extends Middleware {
  async invoke(): Promise<void> {
    const admin: boolean = this.ctx.actionMetadata.admin;
    if (admin && !(await this.adminAuth())) {
      this.forbiddenMsg({ message: "不是管理员" });
      return;
    }

    return await this.next();
  }

  private async adminAuth(): Promise<boolean> {
    if (!process.env.ADMIN) {
      this.forbiddenMsg({ message: '请添加环境变量"ADMIN", 值为管理员密码' });
    }
    const { admin } = this.ctx.req.headers;
    return admin == process.env.ADMIN;
  }
}
