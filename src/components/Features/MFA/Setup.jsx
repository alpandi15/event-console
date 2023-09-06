import {useCallback, useEffect, useState, createContext, memo} from 'react'
import {useQRCode} from 'next-qrcode'
import clsx from 'clsx'
import Toastify from 'toastify-js'
import MFAVerifyCode from './VerifyCode'
import {Console} from 'ems-component'
import { setCookie } from 'nookies'
import {apiLogin} from '@/src/modules/auth/auth.service'
import {apiSetupMFA, apiBind} from './mfa.service'
import FormTwoVerfication from './FormTwoVerificationCode'
import { TOKEN } from '@/src/constant'
import { useRouter } from 'next/router'
import MFAContextProvider, {useMfaContext} from './mfa.context'
// import {Console} from '../../../../../../ems_component/dist/cjs'

const MemoFormTwoVerfication = memo(FormTwoVerfication)

const FooterFormBind = ({onClose, credentials = null}) => {
  const [loading, setLoading] = useState(false)
  const {state} = useMfaContext()
  const {push} = useRouter()

  const loginApp = async () => {
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

  const onSubmit = async () => {
    console.log('TEST')
    // setModalVerif(true)
    setLoading(true)
    const res = await apiBind()
    setLoading(false)
    if (!res?.success) return
    await loginApp()
    onClose()
    return
  }

  console.log('FOOTER STATE ', state)

  return (
    <>
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
          type="button"
          className="w-20"
          onClick={onSubmit}
          disabled={(!state?.mfaBind?.varificationCodeOne && !state?.mfaBind?.verificationCodeTwo) || loading}
        >
          Submit
        </Console.Button>
      </Console.Dialog.Footer>
    </>
  )
}

const MFASetup = ({open, onClose, credentials = null}) => {
  const [modalVerif, setModalVerif] = useState(false)
  const [dataSetup, setDataSetup] = useState({
    qrcode: null,
    secretKey: null
  })
  const [loading, setLoading] = useState(true)
  const {Canvas} = useQRCode()

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

  console.log('CREDENTIALS SETUP ', credentials)
  return (
    <MFAContextProvider>
      <Console.Dialog
        staticBackdrop={true}
        open={open}
        size="xl"
        onClose={() => {
          onClose(false);
        }}
        className="flex min-h-full items-center justify-center p-4"
      >
        <Console.Dialog.Panel>
          <div>
            <Console.Dialog.Title>
              <h2 className="mr-auto text-base font-medium">
              Register Two-Factor Authenticator
              </h2>
            </Console.Dialog.Title>
            {
              loading ? (
                <div>Loading</div>
              ) : (
                <>
                  {/* START FORM BIND */}
                  <Console.Dialog.Description className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="pl-4">
                        <ol>
                          <li className="list-decimal text-sm">Download and install an <strong>Authenticator app</strong> on your mobile phone.</li>
                          <li className="list-decimal text-sm">Open an Authenticator app on your mobile phone and <strong>scan the QR Code</strong>.</li>
                        </ol>
                      </div>
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
                    </div>
                    <div>
                      <div className="pl-4">
                        <ol start={3}>
                          <li className="list-decimal text-sm">Enter two MFA <strong>Verification Codes</strong> generated on the app</li>
                        </ol>
                      </div>
                      <div className="mt-4">
                        <MemoFormTwoVerfication />
                      </div>
                    </div>
                  </div>
                  </Console.Dialog.Description>
                  <FooterFormBind credentials={credentials} onClose={onClose} />
                  {/* END OF FORM BIND */}
                </>
              )
            }
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>

      <MFAVerifyCode open={modalVerif} onClose={setModalVerif} credentials={credentials} />
    </MFAContextProvider>
  )
}

export default MFASetup