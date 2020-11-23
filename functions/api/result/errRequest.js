const base = require('./base')

module.exports = function (body, headers) {
  return base(500, body, headers)
}
