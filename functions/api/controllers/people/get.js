const { app } = require('../../app')
const db = app.database()
const { throwResBadContent } = require('../../helpers/dbHelper')

module.exports = {
  action: async function () {
    const peopleRes = await db.collection('people').get()
    throwResBadContent(peopleRes)

    return peopleRes.data
  }
}
