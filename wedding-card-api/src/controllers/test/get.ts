import { Action, AppInstance, HttpResult } from "@hal-wang/cloudbase-access";

export default class extends Action {
  async do(): Promise<HttpResult> {
    return this.ok({
      env: process.env,
      config: AppInstance.instance.app.config,
    });
  }
}
