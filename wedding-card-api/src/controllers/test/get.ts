import { Action, AppInstance, HttpResult } from "@hal-wang/cloudbase-access";

export default class extends Action {
  async do(): Promise<HttpResult> {
    const res = await AppInstance.instance.app.getUploadMetadata({
      cloudPath: "temp",
    });

    return this.ok({
      env: process.env,
      config: AppInstance.instance.app.config,
      file: res.data,
    });
  }
}
