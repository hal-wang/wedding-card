import { Action } from "@sfajs/router";
import Collections from "../../lib/Collections";

export default class extends Action {
  constructor() {
    super(["admin"]);
  }

  async invoke(): Promise<void> {
    const name = this.ctx.req.body.name;
    if (!name) {
      this.badRequestMsg({ message: "请填写人名" });
      return;
    }

    const countRes = await Collections.people
      .where({
        _id: name,
      })
      .count();
    if (!!countRes.total) {
      this.noContent();
      return;
    }

    await Collections.people.add({
      _id: name,
    });
    this.noContent();
  }
}
