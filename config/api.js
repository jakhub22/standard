import { message } from 'antd'
import axios from 'axios'
export const apiClient = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/txt;charset=UTF-8',
  },
  maxContentLength: `Infinity`,
})

apiClient['interceptors'].response.use(
  function (response) {
    if (
      response?.data?.['sucmod'] ||
      response.data.message === 'Зөвшөөрөлгүй хандалт байна!'
    ) {
      message.error(response.data.message)
    }
    return response?.data || {}
  },
  function (error) {
    message.error(error)
    return Promise.reject(error)
  }
)

export const apiServer = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  rejectUnauthorized: false,
  // timeout: 54 * 1000,
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.GATEWAY_URL
      : 'http://10.41.200.92:701/gateway/',
})

apiServer['interceptors'].response.use(
  function (response) {
    return response?.data || {}
  },
  function (error) {
    return error.code
  }
)

export const apiServerSimple = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
  rejectUnauthorized: false,
  // timeout: 54 * 1000,
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.SIMPLE_GATEWAY_URL
      : 'http://10.41.200.32:8081/mbank-gateway-service/',
})

apiServerSimple['interceptors'].response.use(
  function (response) {
    return response?.data || {}
  },
  function (error) {
    return error.code
  }
)
