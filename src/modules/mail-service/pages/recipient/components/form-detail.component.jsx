import { useState, useEffect, useCallback } from 'react'
import { Console, FormGroupComponent } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'

const FormInviteOrganizer = ({ isEdit = false }) => {
  const [roles, setRoles] = useState([])

  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useFormContext()

  // watch value if chenged
  const { mfa_auth_status } = watch()

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
    <div className="">
      {/* BEGIN: Form Layout */}
      <FormGroupComponent
        control={control}
        mainClassName="col-span-12"
        fields={[
          {
            name: 'name',
            id: 'name',
            type: 'text',
            placeholder: 'Name',
            label: 'Name',
            errorMessage: errors?.name?.message,
            required: true,
            autoComplete: 'off'
          },
          {
            id: 'gender',
            name: 'gender',
            type: 'selection',
            placeholder: 'Gender',
            label: 'Gender',
            required: true,
            options: [
              {value: 'M', label: 'Male'},
              {value: 'F', label: 'Female'},
            ]
          },
          {
            name: 'email',
            id: 'email',
            type: 'email',
            placeholder: 'Email',
            label: 'Email',
            errorMessage: errors?.email?.message,
            required: true
          },
          {
            name: 'phone_number',
            id: 'phone_number',
            type: 'text',
            placeholder: 'Prone Number',
            label: 'Prone Number',
            errorMessage: errors?.phone_number?.message,
            required: true,
            autoComplete: 'off'
          },
          {
            id: 'birthday',
            name: 'birthday',
            type: 'datepicker',
            placeholder: "Birthday",
            label: "Birthday",
            required: true,
            maxDate: new Date,
          }
        ]}
      />
    </div>
  )
}

export default FormInviteOrganizer
