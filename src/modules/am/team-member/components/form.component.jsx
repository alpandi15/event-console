import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { useFormContext } from 'react-hook-form'
import { apiGetEventRoles } from '@/src/services/role.service'
import FormEventAccess from './form-event-access.component'
import FileUpload from '@/src/components/Form/FileUpload'
import ImageUploader from '@/src/components/Form/ImageUploader'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import { fetchUsers as apiGetAll } from '../member.service'

const FormInviteOrganizer = ({ isEdit = false }) => {
  const [roles, setRoles] = useState([])

  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useFormContext()

  // watch value if chenged
  const { role_event_id } = watch()
  const fetchData = useCallback(async () => {
    const res = await apiGetEventRoles({ am_type: 'organizers' })
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
  const fetchUsers = async (e) => {
    const users = []
    await apiGetAll({ search: e }).then((res) => {
      users.push(...res.data.map(e => {
        return {
          label: e?.email,
          value: e?.id,
          hookvalue: {
            users_id: e.id,
          }
        }
      }))
    })
    return users;
  }

  useEffect(() => {
    console.log(role_event_id)
  }, [role_event_id])

  return (
    <div className="space-y-4">
      {/* BEGIN: Form Layout */}
      <Console.FormGroup className='w-full' mode='horizontal' name="users_id" label="Email" required errors={errors.users_id}>
        <ReactSelectAsync
          id="users_id"
          name="users_id"
          control={control}
          placeholder="Select Team"
          defaultOptions={true}
          loadOption={fetchUsers}
          errorMessage={errors.users_id ? errors.users_id.message : undefined}
        />
      </Console.FormGroup>
      {
        isEdit && (
          <>
            <Console.FormGroup className='w-full' mode='horizontal' name="first_name" label="First Name" required errors={errors.first_name}>
              <Console.FormInput
                {...register("first_name")}
                id="first_name"
                name="first_name"
                type="text"
                className={clsx([
                  "block min-w-full",
                  { "border-danger": errors.first_name }
                ])}
                placeholder="First Name"
                autoComplete="off"
              />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="last_name" label="Last Name" required errors={errors.last_name}>
              <Console.FormInput
                {...register("last_name")}
                id="last_name"
                name="last_name"
                type="text"
                className={clsx([
                  "block min-w-full",
                  { "border-danger": errors.last_name }
                ])}
                placeholder="Last Name"
                autoComplete="off"
              />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="phone_number" label="Phone Number" required errors={errors.phone_number}>
              <Console.FormInput
                {...register("phone_number")}
                id="phone_number"
                name="phone_number"
                type="text"
                className={clsx([
                  "block min-w-full",
                  { "border-danger": errors.phone_number }
                ])}
                placeholder="Phone Number"
                autoComplete="off"
              />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="id_number" label="ID Number" required errors={errors.id_number}>
              <Console.FormInput
                {...register("id_number")}
                id="id_number"
                name="id_number"
                type="text"
                className={clsx([
                  "block min-w-full",
                  { "border-danger": errors.id_number }
                ])}
                placeholder="ID Number"
                autoComplete="off"
              />
            </Console.FormGroup>
            <Console.FormGroup className="w-full items-start" mode='horizontal' name="id_file" label="ID File" required errors={errors.id_file}>
              <div className='w-2/5'>
                <ImageUploader control={control} name="id_file" ratio="16/9" />
              </div>
            </Console.FormGroup>
          </>
        )
      }

      <Console.FormGroup className='w-full' mode='horizontal' name="role_event_id" label="Event Access" required>
        <ReactSelect
          id="role_event_id"
          name="role_event_id"
          controlStyle={errors?.role_event_id ? { border: '1px solid #ff1e1e' } : {}}
          control={control}
          options={roles}
          errorMessage={errors?.role_event_id?.message}
          placeholder="Role Event"
        />
      </Console.FormGroup>
    </div>
  )
}

export default FormInviteOrganizer
