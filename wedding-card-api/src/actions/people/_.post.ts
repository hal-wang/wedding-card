import { Action } from "@sfajs/router";
import Collections from "../../lib/Collections";

/**
 * @openapi
 * /people:
 *   post:
 *     tags:
 *       - people
 *     description: Invite someone
 *     requestBody:
 *       description: User info
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *                 description: someone's name
 *     responses:
 *       204:
 *         description: success
 *     security:
 *       - admin: []
 */
export default class extends Action {
  constructor() {
    super();
    this.metadata.roles = ["admin"];
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
