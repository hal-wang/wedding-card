/*
 * @Description: 帮助类返回的内容，含是否成功，返回结果，错误badRequest
 * @Author: wwh
 * @Date: 2020-09-07 22:08:25
 * @LastEditTime: 2020-09-18 11:59:23
 * @LastEditors: wwh
 * @FilePath: \Hubery.Yt.CloudBase\functions\v2\helpers\helperResult.js
 */

const { isResSuccess, resBadContent } = require('../result/index')
const badRequest = require('../result/badRequest')

/**
 * @Description: 成功的返回结果
 * @Author: wwh
 * @Date: 2020-09-07 22:56:52
 * @LastEditTime: Do not edit
 * @LastEditors: wwh
 * @param {type}
 * @return {type}
 */
const getSucResult = function (value) {
  return {
    success: true,
    value
  }
}

/**
 * @Description: 失败的返回结果
 * @Author: wwh
 * @Date: 2020-09-07 22:57:26
 * @LastEditTime: Do not edit
 * @LastEditors: wwh
 * @param {type}
 * @return {type}
 */
const getBadResult = function (content) {
  return {
    success: false,
    badRequest: badRequest(content)
  }
}

/**
 * @Description: res返回结果，根据res判断是否成功，错误则有badRequest
 * @Author: wwh
 * @Date: 2020-09-07 22:57:40
 * @LastEditTime: Do not edit
 * @LastEditors: wwh
 * @param {type}
 * @return {type}
 */
module.exports.getResResult = function (res, getValue) {
  if (isResSuccess(res)) {
    return getSucResult(getValue ? getValue() : undefined)
  } else {
    return getBadResult(resBadContent(res))
  }
}

module.exports.getSucResult = getSucResult

module.exports.getBadResult = getBadResult
