const global = require('./global')

const tcb = require('@cloudbase/node-sdk')
const app = tcb.init({
  env: global.env
})

module.exports.app = app

const db = function () {
  return app.database()
}

module.exports.db = db
