import { useState, useEffect, useCallback } from 'react'
import { Console, FormGroupComponent } from 'ems-component'
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

const groupWapperClassName = 'md:grid md:grid-cols-12 md:gap-4'
const groupLabelClassName = 'md:col-span-4 md:text-right'
const groupInputClassName = 'md:col-span-8'

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
    <div className="w-full space-y-4">
      <Console.FormGroup name="email" mode='horizontal' label="Contact Us Email" required errors={errors.email}>
        <Console.FormInput
          {...register("email")}
          id="email"
          name="email"
          type="email"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.email }
          ])}
          placeholder="Contact Us Email"
          defaultOptions={true}
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup name="phone_number" mode='horizontal' label="Phone Number" required errors={errors.phone_number}>
        <Console.FormInput
          {...register("phone_number")}
          id="phone_number"
          name="phone_number"
          type="number"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.phone_number }
          ])}
          placeholder="+62 812 3456 7890"
          defaultOptions={true}
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='items-start' name="address" mode='horizontal' label="Office Address" required errors={errors.address}>
        <Console.FormTextarea
          {...register("address")}
          id="address"
          name="address"
          placeholder="St. Pintu Satu Senayan , Gelora, TA, South Jakarta, ID"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.address }
          ])}
        ></Console.FormTextarea>
      </Console.FormGroup>
    </div>
  )
}

export default FormComponent
