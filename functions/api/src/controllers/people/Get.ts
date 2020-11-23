import { Action, HttpResult } from "@hbrwang/cloudbase-access";
import Collections from "../../lib/Collections";
import linq = require("linq");

export default class extends Action {
  async do(): Promise<HttpResult> {
    const peopleRes = await Collections.people.field({ _id: true }).get();
    const people = linq
      .from(peopleRes.data)
      .select((item: Record<string, unknown>) => item._id)
      .toArray();
    return this.ok(people);
  }
}
