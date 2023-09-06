import {useMemo, useContext} from 'react'
import clsx from 'clsx'
import { debounce } from 'lodash'
import {useMfaContext, types} from './mfa.context'
import {apiSetupVerify} from './mfa.service'
import {Console} from 'ems-component'

const FormTwoVerfication = () => {
  const {state, dispatch} = useMfaContext()

  const verificationCodeOne = useMemo(
    () => debounce(async (q) => {
      if (!q) return
      const res = await apiSetupVerify({
        token: q
      })

      if (!res?.success) {
        return
      }
      dispatch({
        type: types.SET_VERIFICATION_ONE,
        payload: {
          status: true
        }
      })
    }, 1500),
    [dispatch]
  )

  const verificationCodeTwo = useMemo(
    () => debounce(async (q) => {
      if (!q) return
      const res = await apiSetupVerify({
        token: q
      })

      if (!res?.success) {
        return
      }
      dispatch({
        type: types.SET_VERIFICATION_TWO,
        payload: {
          status: true
        }
      })
    }, 1500),
    [dispatch]
  )

  console.log('CONTEXT ', state)
  return (
    <div>
      <Console.FormLabel className="text-sm" htmlFor="verif-code-1">Verification Code 1</Console.FormLabel>
      <Console.FormInput
        id="verif-code-1"
        name="code1"
        type="text"
        className={clsx([
          "block !px-4 !py-3 min-w-full xl:!min-w-[350px]"
        ])}
        placeholder="Enter the first verification code"
        onChange={(e) => verificationCodeOne(e.target.value)}
        disabled={state?.mfaBind?.varificationCodeOne}
      />
      <Console.FormLabel className="text-sm mt-4" htmlFor="verif-code-1">Verification Code 2</Console.FormLabel>
      <Console.FormInput
        id="verif-code-2"
        name="code2"
        type="text"
        className={clsx([
          "block !px-4 !py-3 min-w-full xl:!min-w-[350px]"
        ])}
        placeholder="Enter the second verification code"
        onChange={(e) => verificationCodeTwo(e.target.value)}
        disabled={state?.mfaBind?.verificationCodeTwo}
      />
    </div>
  )
}

export default FormTwoVerfication
