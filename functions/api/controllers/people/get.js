const { app } = require('../../app')
const db = app.database()
const { throwResBadContent } = require('../../helpers/dbHelper')
const ok = require('../../result/ok')
const linq = require('linq')

module.exports = {
  action: async function () {
    const peopleRes = await db.collection('people').field({ _id: true }).get()
    throwResBadContent(peopleRes)

    return ok(
      linq
        .from(peopleRes.data)
        .select(item => item._id)
        .toArray()
    )
  }
}
