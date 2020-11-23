import { Action, HttpResult } from "@hbrwang/cloudbase-access";
import Collections from "../../lib/Collections";

export default class extends Action {
  constructor() {
    super(["admin"]);
  }

  async do(): Promise<HttpResult> {
    const name = this.requestParams.data.name as string;
    if (!name) return this.badRequest("请填写人名");

    const countRes = await Collections.people
      .where({
        _id: name,
      })
      .count();
    if (countRes.total > 0) return this.noContent();

    await Collections.people.add({
      _id: name,
    });
    return this.noContent();
  }
}
