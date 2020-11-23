import { Action, HttpResult } from "@hbrwang/cloudbase-access";
import Collections from "../../lib/Collections";

export default class extends Action {
  async do(): Promise<HttpResult> {
    const name = this.requestParams.data.name as string;
    if (!name) return this.ok(false);

    const countRes = await Collections.people
      .where({
        _id: name,
      })
      .count();
    return this.ok(countRes.total > 0);
  }
}
