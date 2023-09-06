import { Console } from 'ems-component'
import { useState, useEffect, useCallback } from 'react'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import InvitationMethods from '@/src/components/CustomForm/InvitationMethods'
import { apiGetEventRoles } from '@/src/services/role.service'
import { fetchUsers as apiGetAll,fetchCompanys as apiGetCompanys } from '../services/team-exhibit.service'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { useAuth } from '@/src/stores/authContext'


const FormInviteOrganizer = ({ isEdit = false }) => {
  const [roles, setRoles] = useState([])

  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useFormContext()

  const { user }= useAuth()

  // watch value if chenged
  const { type, companys_id } = watch()

  const fetchData = useCallback(async () => {
    const res = await apiGetEventRoles({am_type:'exhibitors'})
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
    const query={search:e}
    if(companys_id?.value)query.companys_id = companys_id.value;
    await apiGetAll(query).then((res)=>{
      users.push(...res.data.map(e=>{
        return {
          label:e?.email,
          value:e?.id,
          hookvalue: {
            users_id: e.id,
          }
        }
      }))
    })
    return users;
  }
  const fetchCompanys = async (e) => {
    const users = []
    await apiGetCompanys({search:e}).then((res)=>{
      users.push(...res.data.map(e=>{
        return {
          label:e?.company_name,
          value:e?.id,
          hookvalue: {
            companys_id: e.id,
          }
        }
      }))
    })
    return users;
  }

  return (
    <div className="space-y-4">
      {user.account_type=='admins' && <Console.FormGroup className='w-full' mode='horizontal' name="companys_id" label="Company" required errors={errors.companys_id}>
        <ReactSelectAsync
          id="companys_id"
          name="companys_id"
          control={control}
          controlStyle={errors?.companys_id ? { border: '1px solid #ff1e1e' } : {}}
          placeholder="Select Company"
          defaultOptions={true}
          loadOption={fetchCompanys}
          errorMessage={errors.companys_id ? errors.companys_id.message : undefined}
        />
      </Console.FormGroup>}
      <Console.FormGroup className='w-full' mode='horizontal' name="users_id" label="Email" required errors={errors.users_id}>
        <ReactSelectAsync
          id="users_id"
          name="users_id"
          control={control}
          isDisabled={user.account_type=='admins' && !companys_id}
          controlStyle={errors?.users_id ? { border: '1px solid #ff1e1e' } : {}}
          placeholder="Select Team"
          // defaultOptions={true}
          loadOption={fetchUsers}
          errorMessage={errors.users_id ? errors.users_id.message : undefined}
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="role_event_id" label="Role Event" required>
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
