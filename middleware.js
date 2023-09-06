import { NextResponse } from 'next/server'
// import {TOKEN} from '@/src/constant'

// const legacyPrefixes = ['/auth', '/forgot-password', '/change-password', '/_next', '/api', '/static']

// const PUBLIC_FILE = /\.(.*)$/;
// export default async function middleware (req) {
//   const { pathname } = req.nextUrl;
//   if (
//     legacyPrefixes.some((prefix) => pathname.startsWith(prefix)) || // exclude static files
//     PUBLIC_FILE.test(pathname) // exclude all files in the public folder
//   ) {
//     return NextResponse.next();
//   }

//   // do something else
//   if (!req.cookies.has(TOKEN)) {
//     let urlLogin = req.nextUrl
//     urlLogin.search = `?redirect_to=${req?.nextUrl?.pathname}`
//     urlLogin.pathname = `/auth`
//     return NextResponse.redirect(urlLogin)
//   }
//   return NextResponse.next()
// }

export default async function middleware (req) {
  return NextResponse.next()
}