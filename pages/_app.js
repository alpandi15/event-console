import Router, { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import { store } from '@/src/stores/store'
import '@/styles/app.css'
import { Console } from 'ems-component'
import SessionContext from '@/src/stores/sessionContext'
import NProgress from 'nprogress'
import { AuthProvider, ProtectRoute } from '@/src/stores/authContext'
import { useState } from 'react'
import PageLoading from '@/src/modules/page-loading'

export default function App ({ Component, pageProps: { session, ...pageProps } }) {
  const [loadingPage, setLoadingPage] = useState(false)
  const { asPath } = useRouter()
  const getLayout = Component.getLayout ?? ((page) => page)
  // console.log('PAGE PROPS ', pageProps)

  const onChangePageStart = () => {
    setLoadingPage(true)
    // NProgress.start()
  }
  const onChangePageDone = () => {
    setLoadingPage(false)
    // NProgress.done()
  }
  Router.events.on('routeChangeStart', () => onChangePageStart())
  Router.events.on('routeChangeComplete', () => onChangePageDone())
  Router.events.on('routeChangeError', () => onChangePageDone())

  return (
    <Provider store={store}>
      <AuthProvider>
        <ProtectRoute>
          {getLayout(
            <>
              {loadingPage ? <PageLoading /> : <Component {...pageProps} key={asPath} />}
            </>
          )}
        </ProtectRoute>
      </AuthProvider>
    </Provider>
  )
}
