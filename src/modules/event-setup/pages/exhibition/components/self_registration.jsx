import { Console, Toastify } from "ems-component"
import { useEffect, useState } from "react"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { useForm } from 'react-hook-form'
import exhibition from "../../../services/exhibition"

const Section2 = () => {
  const [isEdit, setIsEdit] = useState(false)
  const { query, push } = useRouter()
  const [isLoading, setLoading] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue
  } = useForm()

  const { self_registration } = watch()

  const fetchDetail = async () => {
    await exhibition.getDetails().then((res) => {
      setValue('self_registration', res.data.self_regis)
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  const onSubmit = async (values) => {
    setLoading(true)
    await exhibition.section2.update({ self_regis: values.self_registration }).then((res) => {
      Toastify({
        text: 'Success, Self Registration has been updated',
        type: 'success'
      });
      setIsEdit(false)
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setLoading(false)
  }

  return (
    <div className="p-5">
      <div className="w-full flex justify-between items-center">
        <div className="font-medium text-xl text-slate-700">Section 2 Activate Feature Register for Exhibitor</div>
        {isEdit ? (
          <Console.Button variant="outline-primary" className="text-sm" onClick={handleSubmit(onSubmit)} isLoading={isLoading} disabled={isLoading}>
            <Console.Lucide icon="SaveIcon" className="w-5 h-5 mr-1" />
            Submit
          </Console.Button>
        ) : (
          <div>
            <Console.Tippy
              content="Edit"
            >
              <Console.Button
                variant="outline-dark"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                <Console.Lucide icon="Edit" className="w-4 h-4" />
              </Console.Button>
            </Console.Tippy>
          </div>
        )}
      </div>
      <div className="mt-2 p-4">
        <Console.FormSwitch className="w-full">
          <Console.FormSwitch.Input
            {...register('self_registration')}
            id="self_registration"
            className="mr-0"
            type="checkbox"
            disabled={!isEdit}
          />
          <Console.FormLabel id="self_registration" className="ml-2 mb-0">Self Registration</Console.FormLabel>
          <div className={clsx("text-sm ml-8", { 'text-danger': !self_registration, 'text-success': self_registration })}>
            {self_registration ? 'Active' : 'Inactive'}
          </div>
        </Console.FormSwitch>

        <div className="mt-4">
          <p className="text-sm">
            If you want exhibitor to able aplly to your exhibit their own. Please select by checking activate self registration.
          </p>
          <p className="text-sm">
            You will need to approve it from Account Menu Exhibit.
          </p>
          <p className="text-sm">
            If you want to invite the exhibitor go directly to menu
            <Link href={`/${query?.eventId}/am/exhibit`} className="underline text-blue-600 ml-1">
              Account Exhibit
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Section2