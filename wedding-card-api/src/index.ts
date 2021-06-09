import SfaCloudbase from "@sfajs/cloudbase";
import Auth from "./lib/Auth";
import "@sfajs/router";
import Collections from "./lib/Collections";

export const main = async (
  event: Record<string, unknown>,
  context: Record<string, unknown>
): Promise<unknown> => {
  console.log("env", event, context);

  return await new SfaCloudbase(event, context)
    .use(async (ctx, next) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      ctx.res.headers.version = require("./package.json").version;

      await next();
    })
    .useCloudbaseApp()
    .useCloudbaseDbhelper()
    .use(async (ctx, next) => {
      Collections.ctx = ctx;
      await next();
    })
    .useRouter({ authFunc: () => new Auth() })
    .run();
};
