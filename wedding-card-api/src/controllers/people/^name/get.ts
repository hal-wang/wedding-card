import { Action } from "@sfajs/router";
import Collections from "../../../lib/Collections";

export default class extends Action {
  async invoke(): Promise<void> {
    const name = this.ctx.req.query.name;
    if (!name) {
      this.ok({
        exist: false,
      });
      return;
    }

    const countRes = await Collections.people
      .where({
        _id: name,
      })
      .count();
    this.ok({
      exist: !!countRes.total,
    });
  }
}
