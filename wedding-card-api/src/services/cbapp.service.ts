import tcb = require("@cloudbase/node-sdk");

export class CbappService {
  public readonly app = tcb.init({
    env: process.env.SCF_NAMESPACE,
    secretId: process.env.SECRET_ID,
    secretKey: process.env.SECRET_KEY,
  });
  public readonly db = this.app.database();
}
