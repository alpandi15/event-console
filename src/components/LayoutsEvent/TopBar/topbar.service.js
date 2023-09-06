import Cookies from 'js-cookie'
import { TOKEN, COOKIE_ACCOUNT_TYPE } from '@/src/constant';
import { request } from "@/src/utils/request";
import Router from 'next/router'

export const apiLogout = async () => {
  return request({
    url: '/console/auth-console/logout',
    method: 'get',
    endPointType: 'auth',
    auth: true
  })
}

export const signOut = async () => {
  // const res = await apiLogout()
  // console.log('LOGOU ', res)
  // if (!res?.success) {
  //   if (res?.statusCode === 401) {
  //     // Unauthorize auto logout
  //     Cookies.remove(TOKEN)
  //     Router.replace('/auth')
  //     return
  //   }
  //   return
  // }

  // Success Logout
  Cookies.remove(COOKIE_ACCOUNT_TYPE)
  Cookies.remove(TOKEN)
  Router.replace('/auth')
}