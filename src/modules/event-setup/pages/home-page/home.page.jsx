import { Console } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route from 'next/router'
import clsx from 'clsx'
import Toastify from 'toastify-js'
import { useForm, FormProvider } from 'react-hook-form'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { NextSeo } from 'next-seo'
import { useState, useCallback, useEffect } from 'react'
import FormSponsors from './components/form.sponsors'
import FormBanner from './components/form.banner'
import FormFooter from './components/form.footer'
import Link from 'next/link'

const FormPage = () => {
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const onSubmit = async (values) => {
    console.log(values)
  }

  return (
    <div>
      <NextSeo title="Event Setup | Home Page" noindex />
      <div className="mt-8 flex justify-between items-center">
        <div>
          <h2 className="mr-auto text-2xl font-medium">Home Page</h2>
          <span>Customize your website content here</span>
        </div>
        <Console.Button as={Link} href="#" variant="dark" className="text-sm">
          <Console.Lucide icon="Eye" className="w-4 h-4 mr-1" />
          Preview Page
        </Console.Button>
      </div>
      <div className="mt-6">
        <FormBanner />
        <FormSponsors />
        <FormFooter />
      </div>
    </div>
  )
}

FormPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default FormPage
