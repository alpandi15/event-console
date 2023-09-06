import { Console } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route, { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { createValidation } from './validation'
import { NextSeo } from 'next-seo'
import FormComponent from './components/form.component'
import { apiDetail, fetchUsers } from './member.service'
import { useEffect } from 'react'
import { apiGetEventRoles } from '@/src/services/role.service'

const UpdateMemberOrganizer = () => {
  const router = useRouter()
  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const fetchDetail = async () => {
    await apiDetail(router.query.id).then(async (res) => {
      const result = res.data

      let userEmails = {
        label: '',
        value: ''
      }

      await fetchUsers().then((res2) => {
        const find = res2.data.find(obj => obj.email == result.email)
        userEmails.value = find.id
        userEmails.label = find.email
      })

      methods.setValue('users_id', userEmails)
      methods.setValue('first_name', result.first_name)
      methods.setValue('last_name', result.last_name)
      methods.setValue('phone_number', result.phone_number)
      methods.setValue('id_number', result.id_number)
      methods.setValue('id_file', result.id_file)
      methods.setValue('role_event_id', result.event_access?.role?.id)

    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  const onSubmit = async (values) => {
    console.log('SUBMIT ', values)
    // const formData = new FormData()
    // formData.append('email', values?.email)
    // formData.append('first_name', values?.first_name)
    // formData.append('last_name', values?.last_name)
    // formData.append('phone_number', values?.phone_number)
    // formData.append('team_status', true)
    // formData.append('mfa_auth_status', values?.mfa_auth_status)
    // formData.append('role_id', values?.role_id)
    // if (values?.image_profile?.length) {
    //   formData.append('photo', values?.image_profile[0])
    // }

    // const res = await apiCreate(formData)
    // if (!res?.success) {
    //   Toastify({
    //     duration: 3000,
    //     text: res?.message,
    //     className: "info",
    //     style: {
    //       background: "#000000",
    //     }
    //   }).showToast();
    //   return
    // }

    // // success back to list
    // return Route.back()
  }

  return (
    <div>
      <NextSeo title="Team Member | Edit" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">Edit Team Member</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-8">
              <div className="p-5 box mt-5">
                <FormComponent isEdit />
              </div>
              <div className="mt-12 text-right">
                <Console.Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => {
                    Route.back();
                  }}
                  className="w-20 mr-2"
                >
                  Cancel
                </Console.Button>
                <Console.Button
                  variant="warning"
                  type="submit"
                  className="w-[150px]"
                >
                  Submit
                </Console.Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

UpdateMemberOrganizer.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default UpdateMemberOrganizer
