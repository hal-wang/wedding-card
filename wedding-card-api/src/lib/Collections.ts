import { Database } from "@cloudbase/node-sdk";
import { HttpContext } from "sfa";
import * as tcb from "@cloudbase/node-sdk";

export default class Collections {
  public static ctx: HttpContext;

  private static getCollection(name: string): Database.CollectionReference {
    return this.ctx.bag<tcb.Database.Db>("CB_DB").collection(name);
  }

  static get people(): Database.CollectionReference {
    return Collections.getCollection("people");
  }
}
