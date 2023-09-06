import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import FormComponent from './components/form.component'
import Link from 'next/link'
import registration from '../../services/registration'

const FormPage = () => {
  const [isLoading, setLoading] = useState(false)
  const [isInit, setIsInit] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const fetchData = async () => {
    const forms = []
    const form_files = []
    await registration.get().then((res) => {
      res.data.forms.map((v) => {
        if (v.input_type == 'input') {
          forms.push({
            form: v.form,
            title: v.title,
            input_type: v.input_type,
            sort: v.sort
          })
        } else if (v.input_type == 'select' || v.input_type == 'checkbox') {
          forms.push({
            form: v.form,
            title: v.title,
            input_type: v.input_type,
            sort: v.sort,
            options: v.options
          })
        } else if (v.input_type == 'file') {
          form_files.push({
            form: v.form,
            value: v.title,
            input_type: v.input_type,
            sort: v.sort
          })
        }
      })

      let formFile = { input_type: 'file', options: [] }
      form_files.map((v) => {
        formFile.options.push({
          value: v.value,
          form: v.form,
          sort: v.sort
        })
      })

      forms.push(formFile)
      setIsInit(true)
      methods.setValue('form', forms)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = async (values) => {
    setLoading(true)
    const forms = []
    values.form.map((v) => {
      if (v.input_type == 'input') {
        forms.push({
          form: v.form,
          title: v.title,
          input_type: v.input_type,
          sort: v.sort
        })
      } else if (v.input_type == 'select' || v.input_type == 'checkbox') {
        forms.push({
          form: v.form,
          title: v.title,
          input_type: v.input_type,
          options: v.options,
          sort: v.sort
        })
      } else if (v.input_type == 'file') {
        v.options.map((v2) => {
          forms.push({
            form: v2.form,
            title: v2.value,
            input_type: v.input_type,
            sort: v2.sort
          })
        })
      }
    })
    forms.sort((a, b) => a.sort - b.sort);

    const formData = {
      forms: forms
    }
    await registration.update(formData).then((res) => {
      Toastify({
        text: 'Success, Form Registration has been updated',
        type: 'success'
      });
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setLoading(false)
  }

  return (
    <div>
      <NextSeo title="Event Setup | Form Registration" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">Form Registration</h2>
      </div>
      <div className="flex items-center mt-4">
        <div className="mr-auto text-md text-sm !leading-1">
          Customize you form registration for attendees <br />
          You prohibit to edit the form once the event status went live
        </div>
        <div className="">
          <Console.Button as={Link} href="#" variant="soft-primary">
            Preview Page
          </Console.Button>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-6">
              <FormComponent isInit={isInit} setIsInit={(val) => setIsInit(val)} />
              <div className="mt-8 text-right">
                <Console.Button
                  variant="primary"
                  type="submit"
                  className="w-fit px-10"
                  isLoading={isLoading}
                  disabled={isLoading}>
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

FormPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default FormPage
