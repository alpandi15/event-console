import { request } from "@/src/utils/request";

export const apiSetupMFA = async (data) => {
  return request({
    url: '/console/auth-console/mfa/setup',
    data,
    method: 'get',
    endPointType: 'auth',
    auth: true // <- untuk kirim token di header cookies
  })
}

export const apiSetupVerify = async (data) => {
  return request({
    url: '/console/auth-console/mfa/setup-verify',
    data,
    method: 'patch',
    endPointType: 'auth',
    auth: true // <- untuk kirim token di header cookies
  })
}

export const apiBind = async () => {
  return request({
    url: '/console/auth-console/mfa/bind',
    method: 'patch',
    endPointType: 'auth',
    auth: true // <- untuk kirim token di header cookies
  })
}
