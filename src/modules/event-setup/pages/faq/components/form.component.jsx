import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { useFormContext } from 'react-hook-form'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'
import DatePickerComponent from "@/src/components/Form/DatetimePicker/DatePicker"
import TimePickerComponent from "@/src/components/Form/DatetimePicker/TimePicker"
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import moment from 'moment'
import { ExampleList, examplePromiseOptions } from '@/src/services/example.service'
// import Grapes from '@/src/components/Form/GrapesJs/grapes'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('@/src/components/ReactQuill'), { ssr: false })

const FormComponent = ({ isEdit = false }) => {
  const [roles, setRoles] = useState([])

  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useFormContext()

  // watch value if chenged
  const { ticket_id } = watch()

  const fetchData = useCallback(async () => {
    const res = await apiGetRoles()
    if (!res.success) {
      return
    }
    setRoles(() => res?.data?.map((d) => ({ value: d?.id, label: d?.name, menu_permission: d?.menu_permission })))
    return
  }, [])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12">
        <div className="p-5 box mt-5">
          {/* BEGIN: Form Layout */}
          <div className="">
            <Console.FormLabel htmlFor="title" className="text-sm">Title<span className="text-danger">*</span></Console.FormLabel>
            <Console.FormInput
              {...register("title")}
              id="title"
              name="title"
              type="number"
              className={clsx([
                "block min-w-full",
                { "border-danger": errors.title }
              ])}
              placeholder="Template Name"
              autoComplete="off"
            />
            {errors.title && (
              <div className="mt-2 text-danger text-sm">
                {typeof errors.title.message === "string" &&
                  errors.title.message}
              </div>
            )}
          </div>
          <div className="mt-4">
            <Console.FormLabel htmlFor="description" className="text-sm">Description<span className="text-danger">*</span></Console.FormLabel>
            <ReactQuill />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormComponent
