import { CollectionReference } from "@cloudbase/database";

export default class DbHelper {
  static getResBadContent(res: Record<string, unknown>): string {
    if (res.code) return `${res.code}, ${res.message}`;
    else return "";
  }

  static async getField(
    collection: CollectionReference,
    doc: string,
    field: string
  ): Promise<unknown> {
    const fieldObj: Record<string, unknown> = {};
    fieldObj[field] = true;

    const res = await collection.doc(doc).field(fieldObj).get();
    if (!res.data || res.data.length <= 0 || !res.data[0][field]) return [];
    return res.data[0][field];
  }

  static async updateField(
    collection: CollectionReference,
    doc: string,
    field: string,
    value: unknown
  ): Promise<number> {
    const fieldObj: Record<string, unknown> = {};
    fieldObj[field] = value;

    const res = await collection.doc(doc).update(fieldObj);
    return res.updated;
  }
}
