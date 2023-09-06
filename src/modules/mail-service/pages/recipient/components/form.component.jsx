import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
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
      <div className="">
        <Console.FormLabel htmlFor="name" className="text-sm">List Name<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("name")}
          id="name"
          name="name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.name }
          ])}
          placeholder="List Name"
          autoComplete="off"
        />
        {errors.name && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.name.message === "string" &&
              errors.name.message}
          </div>
        )}
      </div>
      <div className="mt-4">
        <Console.FormLabel htmlFor="description" className="text-sm">Description</Console.FormLabel>
        <Console.FormTextarea
          {...register("description")}
          id="description"
          name="description"
          placeholder="Address 2"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.description }
          ])}
        ></Console.FormTextarea>
        {errors.description && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.description.message === "string" &&
              errors.description.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default FormInviteOrganizer
