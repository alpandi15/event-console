import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import FormInvite from './components/form-invite.component'
import tenantService, { apiInvite } from "./tenant.service"

const CreateItrexTeam = () => {
  const methods = useForm({
    mode: 'onChange',
    // resolver: createValidation,
    reValidateMode: 'onChange',
    defaultValues: {
      type: 'email'
    }
  })

  const onSubmit = async (values) => {
    console.log('SUBMIT ', values)
    const formData = new FormData()
    formData.append('email', values?.email)
    const res = await tenantService.apiInvite(formData).then((res) => {
      Toastify({
        duration: 3000,
        text: "SUccess",
      })
    })
    // success back to list
    return Route.back()
  }

  return (
    <div>
      <NextSeo title="Tenant F&B | Invite" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">Invite Tenant F&B</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-8">
              <div className="p-5 box mt-5">
                <FormInvite />
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
                  variant="primary"
                  type="submit"
                  className="w-[150px]"
                >
                  Invite
                </Console.Button>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

CreateItrexTeam.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default CreateItrexTeam
