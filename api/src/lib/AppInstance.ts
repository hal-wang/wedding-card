import Global from "./Global";
import tcb = require("@cloudbase/node-sdk");

export class AppInstance {
  private static appInstance: tcb.CloudBase;
  public static get App(): tcb.CloudBase {
    if (!AppInstance.appInstance) {
      AppInstance.appInstance = tcb.init({
        env: Global.cloudbase.env,
      });
    }
    return AppInstance.appInstance;
  }

  private static dbInstance: tcb.Database.Db;
  public static get Db(): tcb.Database.Db {
    if (!AppInstance.dbInstance) {
      AppInstance.dbInstance = AppInstance.App.database();
    }
    return AppInstance.dbInstance;
  }
}
