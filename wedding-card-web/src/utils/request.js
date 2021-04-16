import axios from 'axios'

const tcbEnv = window._tcbEnv
const service = axios.create({
  baseURL: `https://${tcbEnv.TCB_SERVICE_DOMAIN}/${tcbEnv.API_NAME}`,
  timeout: 20000
})

service.interceptors.request.use(
  async config => {
    config.headers['content-type'] = 'application/json'
    config.headers['short-url-origin'] = `${window.location.protocol}//${window.location.host}`
    config.validateStatus = num => num >= 200 && num < 300
    return config
  },
  resErr => {
    return Promise.reject('request error')
  }
)

function getErrText(error) {
  if (error.data && error.data.message) {
    return error.data.message
  } else if (error.data && typeof error.data === 'string') {
    return error.data
  } else {
    return error.statusText
  }
}

service.interceptors.response.use(
  res => {
    return res
  },
  error => {
    const res = error.response
    console.log('err', error.message, res)
    if (!res) {
      alert('request error')
    } else {
      alert(getErrText(res))
    }
    return Promise.reject(res)
  }
)

export default service
