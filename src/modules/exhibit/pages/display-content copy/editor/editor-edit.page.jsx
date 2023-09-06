import { Console } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route from 'next/router'
import clsx from 'clsx'
import Toastify from 'toastify-js'
import { useForm, FormProvider } from 'react-hook-form'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { NextSeo } from 'next-seo'
import { useState, useCallback, useEffect } from 'react'
import FormComponent from '../components/form-editor.component'

const CreatePage = () => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (values) => {
    console.log(values)
  }

  return (
    <div>
      <NextSeo title="Display Content | Edit Editor" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">Edit Content Text Editor</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormComponent />
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
        </form>
      </FormProvider>
    </div>
  )
}

CreatePage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default CreatePage
