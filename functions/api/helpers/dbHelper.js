const getResBadContent = function (res) {
  if (res.code) return `${res.code}, ${res.message}`
  else return
}
module.exports.getResBadContent = getResBadContent

module.exports.throwResBadContent = function (res) {
  const resBadContent = getResBadContent(res)
  if (resBadContent) throw new Error(resBadContent)
}
