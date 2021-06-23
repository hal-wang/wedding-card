import { Action } from "@sfajs/router";
import Collections from "../../../lib/Collections";

/**
 * @openapi
 * /people/{name}:
 *   get:
 *     tags:
 *       - people
 *     description: Whether a person exists or not
 *     parameters:
 *       - name: name
 *         required: true
 *         in: path
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exist:
 *                   type: bool
 *                   description: result
 */
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
