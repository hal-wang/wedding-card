const tcb = require('@cloudbase/node-sdk')
const app = tcb.init()

module.exports.app = app

const db = function () {
  return app.database()
}

module.exports.db = db
