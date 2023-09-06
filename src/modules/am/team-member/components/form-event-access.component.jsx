import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { useFormContext } from 'react-hook-form'
import { apiGetAllRoles } from '@/src/services/role.service'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'

const FormEventAccess = () => {
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
      <div className="mt-4">
        <Console.FormLabel htmlFor="event_id" className="text-sm">Event Access<span className="text-danger">*</span></Console.FormLabel>
      </div>
      <div className="mt-2">
        <div className="border border-slate-200 rounded-md shadow-xl bg-white mb-2">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 p-4">
              <div className="flex items-center">
                <div className="h-full w-[70px]">
                  <Console.Image alt="Pesta Rakyat 30 Tahun Dewa Berkarya" />
                </div>
                <div className="ml-2">
                  <div className="truncate font-medium text-slate-700">The 17th National Folklore Festival FEB UI 2023</div>
                  <div className="mt-2">
                    <div className="w-56">
                      {/* <Console.FormLabel htmlFor="role_id" className="text-xs">Role Event<span className="text-danger">*</span></Console.FormLabel> */}
                      <div className="">
                        <ReactSelect
                          id="role_event_id"
                          name="role_event_id"
                          controlStyle={errors?.role_event_id ? { border: '1px solid #ff1e1e' } : {}}
                          control={control}
                          options={[{ value: 1, label: 'Admin' }, { value: 2, label: 'Scheduler' }]}
                          placeholder="Role Event"
                        />
                      </div>
                      {errors.role_event_id && (
                        <div className="mt-2 text-danger text-sm">
                          {typeof errors.role_event_id.message === "string" &&
                            errors.role_event_id.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormEventAccess
