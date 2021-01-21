import Global from "./Global";
import {
  AppInstance,
  Middleware,
  MiddlewareResult,
  MiddlewareType,
} from "@hal-wang/cloudbase-access";

export class AppInstanceMiddleware extends Middleware {
  constructor() {
    super(MiddlewareType.BeforeStart);
  }

  async do(): Promise<MiddlewareResult> {
    AppInstance.init({
      env: Global.cloudbase.env,
    });

    return MiddlewareResult.getSuccessResult();
  }
}
