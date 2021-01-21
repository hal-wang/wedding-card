import axios from 'axios'
import { baseApiUrl } from '@/utils'

const service = axios.create({
  baseURL: baseApiUrl, // url = post url + request url
  timeout: 20000 // request timeout
})

function base(controller, action, data, headers) {
  return new Promise(resolve => {
    service({
      url: `${controller}/${action}`,
      method: 'POST',
      data: data || {},
      headers: headers
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        resolve(err.response)
      })
  })
}

function getErrMsg(res) {
  console.log('res')
  if (!res.data) return 'unknow error'
  if (typeof res.data === 'string') return res.data

  if (res.data.message && typeof res.data.message === 'string') {
    return res.data.message
  }
  return 'unknow error'
}

export default async function post(controller, action, data, headers, showErr = true) {
  const res = await base(controller, action, data, headers)
  if (!res.status || res.status < 200 || res.status >= 300) {
    if (showErr) alert(`错误： ${getErrMsg(res)}`)
    res.success = false
  } else {
    res.success = true
  }
  return res
}
