import { HttpResult, Router } from "@hal-wang/cloudbase-access";
import Auth from "./lib/Auth";

export const main = async (
  event: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  console.log("event", event);
  setHeaders();

  const router = new Router(event, new Auth());
  return (await router.do()).result;
};

function setHeaders(): void {
  const config = <Record<string, unknown>>require("./package.json");
  HttpResult.baseHeaders.version = config.version;
}
