const noContent = require('../../result/noContent')
const badRequest = require('../../result/badRequest')
const { app } = require('../../app')
const db = app.database()
const { getField, updateField } = require('../../helpers/dbHelper')

module.exports = {
  action: async function ({ data }) {
    const { name, password } = data
    if (!name) return badRequest('请填写人名')
    if (password != 'aixnn99.') return badRequest('管理员密码错误')

    const fieldResult = await getField(db, 'wedding_card', 'people', 'people')
    if (!fieldResult.success) return fieldResult.badRequest
    const people = fieldResult.value
    if (![people].includes(name)) {
      people.push(name)
      const updateResult = await updateField(db, 'wedding_card', 'people', 'people', people)
      if (!updateResult.success) return updateResult.badRequest
    }
    return noContent
  }
}
