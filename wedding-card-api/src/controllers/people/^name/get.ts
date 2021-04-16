import { Action, HttpResult } from "@hal-wang/cloudbase-access";
import Collections from "../../../lib/Collections";

export default class extends Action {
  async do(): Promise<HttpResult> {
    const name = this.requestParams.query.name;
    if (!name) {
      return this.ok({
        exist: false,
      });
    }

    const countRes = await Collections.people
      .where({
        _id: name,
      })
      .count();
    return this.ok({
      exist: !!countRes.total,
    });
  }
}
