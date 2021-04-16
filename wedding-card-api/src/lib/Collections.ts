import { Database } from "@cloudbase/node-sdk";
import { AppInstance } from "@hal-wang/cloudbase-access";

export default class Collections {
  private static getCollection(
    collection: string
  ): Database.CollectionReference {
    return AppInstance.instance.db.collection(collection);
  }

  static get people(): Database.CollectionReference {
    return Collections.getCollection("people");
  }
}
