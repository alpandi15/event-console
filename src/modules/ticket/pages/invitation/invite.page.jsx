import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route, { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { createValidation } from './components/validation'
import { NextSeo } from 'next-seo'
import FormInvite from './components/form-invite.component'
import invitation from '../../services/invitation'

const CreateItrexTeam = () => {
  const router = useRouter()
  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange',
  })

  const onSubmit = async (values) => {
    const formData = {
      ev_products_id: values.ticket_id.value.ev_products_id,
      qty: values.qty
    }

    if (values.email != '') {
      formData['email'] = values.email
    }

    if (values.phone_number != '') {
      formData['phone_number'] = values.phone_number
    }

    if (values.ticket_id.value.ev_variants_id != undefined) {
      formData['ev_variants_id'] = values.ticket_id.value.ev_variants_id
    }

    if (values.ticket_id.value.ev_subvariants_id != undefined) {
      formData['ev_subvariants_id'] = values.ticket_id.value.ev_subvariants_id
    }

    await invitation.apiCreate(formData).then((res) => {
      Toastify({
        text: 'Success create invitation',
        type: 'success'
      });
      return router.push('/ticket/ticket-invitation')
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }

  return (
    <div>
      <NextSeo title="Ticket Invitation | Invite" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">Invite</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-6">
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
