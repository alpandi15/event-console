import { createContext, useEffect, useState, useContext, useCallback } from "react"
import { request } from "@/src/utils/request";
import { getCookies } from "../utils/storage";
import { setCookie } from 'nookies'
import Cookies from 'js-cookie'
import { TOKEN, TOKEN_EXPIRED, PUBLIC_PAGES } from '@/src/constant'
import Toastify from 'toastify-js'
import { useRouter } from "next/router";
import PageUnauthenticated from "../modules/unauthenticated";
import PageLoading from "../modules/page-loading";
import moment from "moment-timezone";

export async function apiGetSession () {
  return request({
    url: '/console/auth-event',
    endPointType: 'auth',
    auth: true,
    method: 'get'
  })
}

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: true,
  loadingSession: true,
  textStateAuth: 'Please Wait...',
  colorStateAuth: '',
  getUser: null,
  menuPermissions: []
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const [loading, setLoading] = useState(true)
  const [textState, setTextState] = useState('Please wait...')
  const [colorState, setColorState] = useState(null)
  const { push, replace, pathname, query } = useRouter()
  const [menuPermissions, setMenuPermissions] = useState([])

  const getUser = useCallback(async () => {
    setLoadingSession(true)
    const token = getCookies(TOKEN)
    if (token) {
      const res = await apiGetSession()
      setLoadingSession(false)
      if (res?.success) {
        const { menuList, ...user } = res?.data
        // const user = {
        //   id: 1,
        //   firstName: 'User Test',
        //   lastName: 'Manual',
        //   eventSlug: 'Event-Demo'
        // }
        moment.tz.setDefault(user.event.timezone)
        setUser(user)
        setMenuPermissions(menuList)
        return
      }
      // Logout
      // Cookies.remove(TOKEN)
      // replace('/auth')
      return
    }
  }, [])

  useEffect(() => {
    (async () => {
      await getUser()
    })()
  }, [getUser])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        loadingSession,
        getUser,
        textStateAuth: textState,
        colorStateAuth: colorState,
        menuPermissions,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.displayName = 'AuthContextSessions'

export const useAuth = () => useContext(AuthContext)

const UNAUTH_ROUTE = ['/auth']
export const ProtectRoute = ({ children }) => {
  const { pathname } = useRouter()
  // console.log('ROUTER ', pathname)
  const { isAuthenticated, loadingSession, user } = useAuth();

  if (UNAUTH_ROUTE.includes(pathname)) {
    return children
  }

  if (loadingSession) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <PageLoading />
      </div>
    );
  }

  if (!loadingSession && !isAuthenticated && !user) {
    return <PageUnauthenticated />
  }

  return children;
};