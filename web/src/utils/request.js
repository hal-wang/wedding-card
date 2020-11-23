import axios from 'axios'
import { baseApiUrl } from '@/utils'

const service = axios.create({
  baseURL: baseApiUrl, // url = post url + request url
  timeout: 20000 // request timeout
})

export default async function post(controller, action, data) {
  return service({
    url: `${controller}/${action}`,
    method: 'POST',
    data: data || {}
  })
}
