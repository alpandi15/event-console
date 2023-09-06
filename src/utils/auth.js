import nookies from 'nookies'
import { TOKEN, COOKIE_ACCOUNT_TYPE } from '@/src/constant'
import { request } from "@/src/utils/request";
import { destroyCookie, parseCookies } from 'nookies';

export async function apiGetSession (ctx = null) {
  return request({
    url: '/console/auth-console',
    endPointType: 'auth',
    auth: true,
    method: 'get',
    context: ctx
  })
}

export const UseSession = async (ctx) => {
  // BYPASS: biar bisa masuk dashboard sementara
  const allCookies = nookies.get(ctx)
  return ({
    session: {
      user: {name: 'Pandi', email: 'pandi@mail.com'},
      token: allCookies[TOKEN] || null,
      account_type: allCookies[COOKIE_ACCOUNT_TYPE] || null,
    }
  });


  // return new Promise(async resolve => {
  //   const allCookies = nookies.get(ctx)
  //   console.log('COOKIES SERVER ', allCookies)
  //   let user = null
  
  //   const res = await apiGetSession(ctx)
  //   if (res?.success) {
  //     user = res?.data
  //     return resolve({
  //       session: {
  //         user,
  //         token: allCookies[TOKEN] || null,
  //         account_type: allCookies[COOKIE_ACCOUNT_TYPE] || null,
  //       }
  //     });
  //   }

  //   console.log('Unauthorize ', res);
  //   destroyCookie(ctx, TOKEN)
  //   return ctx?.res?.writeHead(302, {
  //     Location: '/auth'
  //   }).end();
  // });
}

export function unauthPage(ctx) {
  return new Promise(async resolve => {
    const res = await apiGetSession(ctx)
    if (!res?.success) {
      console.log('Unauthorize ', res);
      destroyCookie(ctx, TOKEN)
      return resolve('unauthorized');
    } 

    return ctx?.res?.writeHead(302, {
      Location: '/'
    }).end();
  });
}