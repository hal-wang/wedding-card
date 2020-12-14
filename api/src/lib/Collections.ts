import { AppInstance } from "./AppInstance";
import { CollectionReference } from "@cloudbase/database";

export default class Collections {
  private static getCollection(collection: string): CollectionReference {
    return AppInstance.Db.collection(collection);
  }

  static get people(): CollectionReference {
    return Collections.getCollection("people");
  }
  static get config(): CollectionReference {
    return Collections.getCollection("config");
  }
}
