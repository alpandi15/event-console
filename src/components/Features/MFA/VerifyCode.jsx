import {useState, useCallback, useEffect} from 'react'
import {useQRCode} from 'next-qrcode'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import Toastify from 'toastify-js'
import {Console} from 'ems-component'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {apiLogin} from '@/src/modules/auth/auth.service'
import { setCookie } from 'nookies'
import { TOKEN } from '@/src/constant'
import {apiSetupMFA, apiSetupVerify} from './mfa.service'

// import {Console} from '../../../../../../ems_component/dist/cjs'

const validationSchema = yupResolver(
  yup.object({
    code: yup.string()
      .required().min(6),
  })
)

const MFAVerifyCode = ({open, onClose, credentials = null, changedPassword}) => {
  const [dataSetup, setDataSetup] = useState({
    qrcode: null,
    secretKey: null
  })
  const [loading, setLoading] = useState(true)
  const {Canvas} = useQRCode()
  const {push} = useRouter()

  const {
    register,
    formState: {errors, isSubmitting, isValid},
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    resolver: validationSchema
  })

  const fetchSetupMFA = useCallback(async () => {
    if (open) {
      setLoading(true)
      const res = await apiSetupMFA()
      setLoading(false)
      if (res?.success) {
        setDataSetup({
          qrcode: res?.data?.otpauth_url,
          secretKey: res?.data?.base32,
        })
        return
      }

      Toastify({
        duration: 3000,
        text: res?.message,
        className: "info",
        style: {
          background: "#000000",
        }
      }).showToast();
      return
    }
  }, [open])

  useEffect(() => {
    (async () => {
      await fetchSetupMFA()
    })()
  }, [fetchSetupMFA])

  const loginApp = async (credentials) => {
    const res = await apiLogin(credentials)
    // login false
    if (!res?.success) {
      Toastify({
        duration: 3000,
        text: res?.message,
        className: "info",
        style: {
          background: "#000000",
        }
      }).showToast();
      return
    }

    // START LOGIN SUCCESS
    // replace token logged
    setCookie(null, TOKEN, res?.token, {
      maxAge: 14 * 24 * 60 * 60,
      path: '/'
    })
    push('/')
  }

  console.log('CREDENTIAL VERIIFY ', credentials)
  const onSubmit = async (values) => {
    const res = await apiSetupVerify({
      token: values?.code
    })

    if (!res?.success) {
      Toastify({
        duration: 3000,
        text: res?.message,
        className: "info",
        style: {
          background: "#000000",
        }
      }).showToast();
      return
    }

    if (credentials) {
      if (changedPassword) {
        // console.log('WAJIB GANTI PASSWORD')
        return push('/change-password')
      }
      return loginApp(credentials)
    }
    Toastify({
      duration: 3000,
      text: 'Success',
      className: "bg-success",
      style: {
        background: "#000000",
      }
    }).showToast();
    return
  }

  return (
    <Console.Dialog
      staticBackdrop={true}
      open={open}
      onClose={() => {
        onClose(false);
      }}
      className="flex min-h-full items-center justify-center p-4"
    >
      <Console.Dialog.Panel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Console.Dialog.Title>
              <h2 className="mr-auto text-base font-medium">
              Register Two-Factor Authenticator
              </h2>
            </Console.Dialog.Title>
            <Console.Dialog.Description className="p-6">
            <div className="flex flex-col items-center">
              {
                dataSetup?.qrcode ? (
                  <Canvas
                    text={dataSetup?.qrcode}
                    options={{
                      level: 'M',
                      margin: 3,
                      scale: 4,
                      width: 200,
                      color: {
                        // dark: '#010599FF',
                        // light: '#FFBF60FF',
                      },
                    }}
                  />
                ) : null
              }
              <div className="text-sm">Or entry the <strong>secret key</strong>.</div>
              {dataSetup?.secretKey ? (
                <div>
                  <Console.FormInput
                    id="secret-key"
                    name="secret-key"
                    type="text"
                    className={clsx([
                      "block !px-4 !py-3 min-w-full xl:!min-w-[350px]"
                    ])}
                    placeholder="Secret Key"
                    readOnly
                    defaultValue={dataSetup?.secretKey}
                  />
                </div>
              ) : null}
              <div className="mt-8">
                <Console.FormLabel htmlFor="verif-code-1">Verification Code</Console.FormLabel>
                <Console.FormInput
                  {...register("code")}
                  id="verif-code"
                  name="code"
                  type="text"
                  className={clsx([
                    "block !px-4 !py-3 min-w-full xl:!min-w-[350px]"
                  ])}
                  placeholder="Verification Code"
                />
                {errors.code && (
                  <div className="mt-2 text-danger text-sm">
                    {typeof errors.code.message === "string" &&
                      errors.code.message}
                  </div>
                )}
              </div>
            </div>
            </Console.Dialog.Description>
            <Console.Dialog.Footer>
              <Console.Button
                type="button"
                variant="outline-secondary"
                onClick={() => {
                  onClose(false);
                }}
                className="w-20 mr-1"
              >
                Cancel
              </Console.Button>
              <Console.Button
                variant="primary"
                type="submit"
                className="w-20"
                disabled={!isValid || isSubmitting}
                // ref={sendButtonRef}
                // onClick={() => push('/')}
              >
                Verif
              </Console.Button>
            </Console.Dialog.Footer>
          </div>
        </form>
      </Console.Dialog.Panel>
    </Console.Dialog>
  )
}

export default MFAVerifyCode