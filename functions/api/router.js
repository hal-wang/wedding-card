const notFound = require('./result/notFound')
const errRequest = require('./result/errRequest')

module.exports = async function ({ headers, data, path, params }) {
  let actionModule
  try {
    actionModule = require(`./controllers${path}.js`)
  } catch (err) {
    console.log('require action err', err)
    return notFound('找不到路径：' + err)
  }

  try {
    return await actionModule.action({ headers, data, path, params })
  } catch (err) {
    return errRequest(err.message)
  }
}
