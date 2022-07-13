import { HttpContext } from "@ipare/core";
import { AuthorizationFilter } from "@ipare/filter";

export class AdminFilter implements AuthorizationFilter {
  async onAuthorization(ctx: HttpContext): Promise<boolean> {
    const admin: boolean = ctx.actionMetadata.admin;
    if (admin && !(await this.adminAuth(ctx))) {
      ctx.forbiddenMsg({ message: "不是管理员" });
      return false;
    }
    return true;
  }

  private async adminAuth(ctx: HttpContext): Promise<boolean> {
    if (!process.env.ADMIN) {
      ctx.forbiddenMsg({ message: '请添加环境变量"ADMIN", 值为管理员密码' });
      return false;
    }

    const { admin } = ctx.req.headers;
    return admin == process.env.ADMIN;
  }
}
