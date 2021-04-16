import { CollectionReference } from "@cloudbase/database";
import { AppInstance } from "@hal-wang/cloudbase-access";

export default class Collections {
  private static getCollection(collection: string): CollectionReference {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (AppInstance.instance.db as any).collection(collection);
  }

  static get people(): CollectionReference {
    return Collections.getCollection("people");
  }
  static get config(): CollectionReference {
    return Collections.getCollection("config");
  }
}
