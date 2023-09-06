import { useCallback, useEffect, useState } from 'react'
import { Console } from 'ems-component'
import { useRouter } from 'next/router'
import Image from 'next/image'
import clsx from 'clsx'
import { TOKEN, TOKEN_EXPIRED, TOKEN_CONSOLE } from '@/src/constant'
import { setCookie } from 'nookies'
import { apiAuth } from '../services/auth.service'
import { useAuth } from '@/src/stores/authContext'
import { getSessionStorage, setSessionStorage } from '@/src/utils/storage'
import { NextSeo } from 'next-seo'
// #fbbf24
// #fbc63a
// #e4b63a
const Authorization = () => {
  const [loading, setLoading] = useState(true)
  const [textState, setTextState] = useState('Please wait...')
  const [colorState, setColorState] = useState('text-white')
  const { query, push } = useRouter()
  const { getUser } = useAuth()

  const authorizing = useCallback(async () => {
    setLoading(true)
    if (query?.token && query?.events_id && query?.type) {
      setColorState('text-white')
      setTextState('Please wait...')
      const res = await apiAuth({
        token: query?.token,
        events_id: query?.events_id,
        type: query?.type,
      })

      if (res?.success) {
        setColorState('text-white')
        setTextState('Success')
        // replace token logged
        setSessionStorage(TOKEN, res?.token)
        // setCookie(null, TOKEN, res?.token, {
        //   maxAge: TOKEN_EXPIRED,
        //   path: '/'
        // })

        // simpan token console sementara untuk bisa hit api, nanti di hapus
        // setCookie(null, TOKEN_CONSOLE, query?.token, {
        //   maxAge: TOKEN_EXPIRED,
        //   path: '/'
        // })
        setSessionStorage(TOKEN_CONSOLE, res?.token)
        await getUser()
        setTimeout(() => {
          setColorState('text-white')
          setTextState('Redirecting...')
          setLoading(false)
          push('/')
        }, 1500)
        return
      }

      setTimeout(() => {
        setColorState('text-danger')
        setTextState(res?.message ?? 'Error authenticated..')
        setLoading(false)
      }, 1500)
      return
    }

    setLoading(false)
    // setColorState('text-danger')
    // setTextState('Please open this page from console')
    return
  }, [getUser, push, query?.events_id, query?.token, query?.type])

  useEffect(() => {
    (async () => {
      await authorizing()
    })()
  }, [authorizing])

  return (
    <div className="py-2 bg-primary">
      <NextSeo title="Authentication" noindex />
      <div className="container">
        {/* BEGIN: Error Page */}
        <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
          <Console.Lucide icon="Fingerprint" className={clsx("w-64 h-64", colorState)} />
          <div className="mt-10 text-white flex flex-col items-center justify-center text-center lg:mt-0">
            {/* <div className="font-medium intro-x text-8xl">404</div> */}
            <div
              className={clsx(
                "mt-5 text-xl font-medium intro-x lg:text-3xl",
                colorState
              )}>
              Checking Authentication
            </div>
            <div className="mt-3 text-lg intro-x">
              <div className={clsx(
                "mt-4 font-medium",
                colorState
              )}>{textState}</div>
            </div>
            {loading && (
              <div className="w-12 h-12 mt-4"><Console.LoadingIcon icon="tail-spin" color="#ffffff" /></div>
            )}
            {/* <Console.Button onClick={() => back} className="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200">
              Back to Home
            </Console.Button> */}
          </div>
        </div>
        {/* END: Error Page */}
      </div>
    </div>
  )
}

export default Authorization
