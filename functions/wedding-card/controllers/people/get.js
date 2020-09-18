const ok = require('../../result/ok')
const { app } = require('../../app')
const db = app.database()
const { getField } = require('../../helpers/dbHelper')

module.exports = {
  action: async function () {
    const fieldResult = await getField(db, 'wedding_card', 'people', 'people')
    if (!fieldResult.success) return fieldResult.badRequest
    return ok(fieldResult.value)
  }
}
