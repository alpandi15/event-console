import { Console } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route from 'next/router'
import clsx from 'clsx'
import Toastify from 'toastify-js'
import { useForm, FormProvider } from 'react-hook-form'
// import { createValidation } from './validation'
import { addMember } from './services/team-exhibit.service'
import { NextSeo } from 'next-seo'
import { useState, useCallback, useEffect } from 'react'
import FormInvite from './components/form-invite.component'

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
    const formData = new FormData()
    formData.append('id', values?.users_id?.value)
    if (values?.companys_id)
      formData.append('companys_id', values?.companys_id?.value)
    formData.append('role_id', values?.role_event_id)
    const res = await addMember(formData)
    if (!res?.success) {
      Toastify({
        duration: 3000,
        text: res?.message,
        className: "info",
        style: {
          background: "#000000",
        }
      }).showToast();
      return
    }
    return Route.back()
  }

  return (
    <div>
      <NextSeo title="Team Exhibit | Invite" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">Invite Team Exhibit</h2>
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
