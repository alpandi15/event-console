import axios from 'axios'
import getConfig from 'next/config'
import { parseCookies } from 'nookies'
import https from 'https'
import { TOKEN } from '@/src/constant'
import { getCookies, getSessionStorage, getSessionStorage2 } from './storage'

const { publicRuntimeConfig } = getConfig()
// axios.defaults.httpsAgent = new https.Agent({
//   rejectUnauthorized: true
// })
// At request level
const agent = new https.Agent({
  rejectUnauthorized: false
});

export const baseURL = ({ endPointType }) => {
  let token = getSessionStorage2(TOKEN)
  let endPoint = ''
  switch (endPointType) {
    case 'admin': {
      endPoint = `${publicRuntimeConfig.API_HOST_ADMIN}`
      break
    }
    case 'event': {
      endPoint = `${publicRuntimeConfig.API_HOST_EVENT}`
      break
    }
    case 'auth': {
      endPoint = `${publicRuntimeConfig.API_HOST_AUTH}`
      break
    }
  }
  return { endPoint: endPoint, token: token }
}

export const api = ({ endPointType, type = 'json' }) => {
  let endPoint = ''
  let token = getSessionStorage2(TOKEN)
  let headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'en'
  }

  switch (endPointType) {
    case 'admin': {
      endPoint = `${publicRuntimeConfig.API_HOST_ADMIN}`
      break
    }
    case 'event': {
      endPoint = `${publicRuntimeConfig.API_HOST_EVENT}`
      break
    }
    case 'auth': {
      endPoint = `${publicRuntimeConfig.API_HOST_AUTH}`
      break
    }
  }
  switch (type) {
    case 'json': {
      headers = {
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
      }
      break
    }
    case 'form-data': {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Language': 'en'
      }
      break
    }
    default:
  }

  headers.Authorization = `Bearer ${token}`

  return axios.create({
    headers: headers,
    baseURL: endPoint,
    withCredentials: true,
  })
}


export async function request({
  fullUrl = false,
  url,
  data,
  auth = false,
  requiredToken = false,
  responseHtml = false,
  headers = {
    'Content-Type': 'application/json',
    'Accept-Language': 'en'
  },
  params = {},
  type = 'json',
  method,
  context,
  token,
  endPointType = 'admin', //auth|admin|events|logs|transaction
}) {
  // console.log('CONSOLE ', axios.defaults.headers.head)
  let endPoint = ''
  switch (endPointType) {
    case 'admin': {
      endPoint = `${publicRuntimeConfig.API_HOST_ADMIN}${url}`
      break
    }
    case 'event': {
      endPoint = `${publicRuntimeConfig.API_HOST_EVENT}${url}`
      break
    }
    case 'auth': {
      endPoint = `${publicRuntimeConfig.API_HOST_AUTH}${url}`
      break
    }
  }
  const useUrl = (fullUrl ? url : endPoint)
  const timeout = Number(publicRuntimeConfig?.REQUEST_TIMEOUT) || 10000
  // let token: string
  if (!token) {
    if (context) {
      token = parseCookies(context)[TOKEN]
    } else {
      token = await getSessionStorage(TOKEN)
    }
  }

  switch (type) {
    case 'json': {
      headers = {
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
      }
      break
    }
    case 'form-data': {
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Language': 'en'
      }
      break
    }
    default:
  }

  if ((!token && auth && !requiredToken) || (typeof token === 'object' && auth && !requiredToken)) {
    return {
      success: false,
      message: 'Unauthenticated'
    }
  }

  if (auth && !!token) {
    headers.Authorization = `Bearer ${token}`
    // headers['Cookie'] = `${token}`
  }

  let response = {}

  try {
    switch (method) {
      case 'get': {
        response = await axios.get(`${useUrl}`, { timeout, httpsAgent: agent, maxContentLength: 2000, params: { ...data, ...params }, headers, withCredentials: true })
        break
      }
      case 'post': {
        response = await axios.post(`${useUrl}`, data, { timeout: 30000, httpsAgent: agent, params, headers, withCredentials: true })
        break
      }
      case 'put': {
        response = await axios.put(`${useUrl}`, data, { timeout: 30000, httpsAgent: agent, headers, withCredentials: true })
        break
      }
      case 'patch': {
        response = await axios.patch(`${useUrl}`, data, { timeout: 30000, httpsAgent: agent, headers, withCredentials: true })
        break
      }
      case 'delete': {
        response = await axios.delete(`${useUrl}`, { timeout, httpsAgent: agent, data, headers, withCredentials: true })
        break
      }
      default:
    }
    if (responseHtml) {
      return Promise.resolve({
        success: true,
        data: response.data
      })
    }

    return Promise.resolve({
      success: true,
      ...response.data
    })
  } catch (error) {
    // const { response } = error
    let msg
    let dat
    let statusCode
    let detailData = ''
    let statusRes
    if (error && error?.response instanceof Object) {
      const { data, statusText } = error?.response
      statusCode = error?.response.status
      // console.log('STATUS CODE ', data)
      const { detail, status } = data
      detailData = detail
      statusRes = status
      msg = data.message || statusText
      dat = {
        ...data
      } || {}
    } else {
      statusCode = 600
      if (Object.prototype.hasOwnProperty.call(error, 'message')) {
        msg = error.message || 'Request Failed'
      } else {
        msg = error
      }
    }
    return {
      success: false,
      detail: detailData,
      statusCode,
      status: statusRes,
      message: msg,
      data: dat
    }
  }
}