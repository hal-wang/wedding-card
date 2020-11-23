const router = require('./router')

exports.main = async event => {
  console.log('event', event)

  const headers = event.headers
  const data = JSON.parse(event.body)
  const path = event.path
  const params = event.queryStringParameters

  return await router({ headers, data, path, params })
}
