const noContent = require('../../result/noContent')
const badRequest = require('../../result/badRequest')
const { app } = require('../../app')
const db = app.database()
const { throwResBadContent } = require('../../helpers/dbHelper')

module.exports = {
  action: async function ({ data }) {
    const { name, password } = data
    if (!name) return badRequest('请填写人名')
    if (password != 'aixnn99.') return badRequest('管理员密码错误')

    const countRes = await db
      .collection('people')
      .where({
        _id: name
      })
      .count()
    throwResBadContent(countRes)

    if (countRes.total > 0) {
      return noContent()
    }

    const addRes = await db.collection('people').add({
      _id: name
    })
    throwResBadContent(addRes)
    return noContent
  }
}
