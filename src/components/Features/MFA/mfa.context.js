import {useReducer, createContext, useContext} from 'react'

export const types = {
  SET_VERIFICATION_ONE: 'SET_VERIFICATION_ONE',
  SET_VERIFICATION_TWO: 'SET_VERIFICATION_TWO'
}

export const initialData = {
  mfaBind: {
    varificationCodeOne: false,
    verificationCodeTwo: false,
  }
}

const initialContext = {
  state: initialData,
  dispatch: () => {}
}

export const MFAContext = createContext(initialContext)

export const mfaReducer = (state, action) => {
  switch (action?.type) {
    case types.SET_VERIFICATION_ONE:
      return {
        ...state,
        varificationCodeOne: action?.payload?.status
      }
    case types.SET_VERIFICATION_TWO:
      return {
        ...state,
        verificationCodeTwo: action?.payload?.status
      }
    default:
      return state
  }
}

export const mainReducer = ({mfaBind}, action) => ({
  mfaBind: mfaReducer(mfaBind, action)
})

const MFAContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(mainReducer, initialData)

  return (
    <MFAContext.Provider value={{state, dispatch}}>
      {children}
    </MFAContext.Provider>
  )
}

export const useMfaContext = () => useContext(MFAContext)

export default MFAContextProvider