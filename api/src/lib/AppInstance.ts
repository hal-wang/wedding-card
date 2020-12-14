import Global from "./Global";
import tcb = require("@cloudbase/node-sdk");
import { Db } from "@cloudbase/database";
import { CloudBase } from "@cloudbase/node-sdk/lib/cloudbase";

export class AppInstance {
  private static appInstance: CloudBase;
  public static get App(): CloudBase {
    if (!AppInstance.appInstance) {
      AppInstance.appInstance = tcb.init({
        env: Global.cloudbase.env,
      });
    }
    return AppInstance.appInstance;
  }

  private static dbInstance: Db;
  public static get Db(): Db {
    if (!AppInstance.dbInstance) {
      AppInstance.dbInstance = AppInstance.App.database();
    }
    return AppInstance.dbInstance;
  }
}
