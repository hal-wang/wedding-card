const notFound = require('./result/notFound')

module.exports = async function ({ headers, data, path, params }) {
  let actionModule
  try {
    actionModule = require(`./controllers${path}.js`)
  } catch (err) {
    console.log('require action err', err)
    return notFound('找不到路径：' + err)
  }

  return await actionModule.action({ headers, data, path, params })
}
