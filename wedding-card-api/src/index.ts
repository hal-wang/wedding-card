import { HttpResult, Router } from "@hal-wang/cloudbase-access";
import { AppInstanceMiddleware } from "./lib/AppInstanceMiddleware";
import Auth from "./lib/Auth";

export const main = async (
  event: Record<string, unknown>,
  context: Record<string, unknown>
): Promise<unknown> => {
  console.log("env", event, context);
  setHeaders();

  const router = new Router(event, context, new Auth());
  router.configure(new AppInstanceMiddleware());
  try {
    return (await router.do()).result;
  } catch (err) {
    return HttpResult.errRequestMsg({ message: err.message }).result;
  }
};

function setHeaders(): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const config = <any>require("./package.json");
  HttpResult.baseHeaders.version = config.version;
}
