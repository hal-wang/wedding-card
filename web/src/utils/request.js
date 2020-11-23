import axios from 'axios'
import { baseApiUrl } from '@/utils'

const service = axios.create({
  baseURL: baseApiUrl, // url = post url + request url
  timeout: 20000 // request timeout
})

export default async function post(controller, action, data, headers) {
  const res = await service({
    url: `${controller}/${action}`,
    method: 'POST',
    data: data || {},
    headers: headers
  }).catch(err => err.response)
  console.log('b request', res)
  res.isErr = function () {
    if (!res.status || res.status < 200 || res.status >= 300) {
      alert(`错误： ${res.data || res}`)
      return true
    } else {
      return false
    }
  }

  return res
}
