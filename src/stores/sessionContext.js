import { createContext, useContext } from 'react'

const initialData = {
  session: {
    user: null,
    account_type: null,
  }
}

const SessionContext = createContext(initialData)

export const useSessionContext = () => useContext(SessionContext)

export default SessionContext