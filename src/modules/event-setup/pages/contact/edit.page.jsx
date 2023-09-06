import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useState, useEffect } from 'react'
import FormComponent from './components/form.component'
import Link from 'next/link'
import contact from '../../services/contact'

const CreatePage = () => {
  const [isLoading, setLoading] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  })

  const fetchData = async () => {
    await contact.get().then((res) => {
      methods.setValue('email', res.data.contact_email)
      methods.setValue('phone_number', res.data.contact_number)
      methods.setValue('address', res.data.contact_location)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = async (values) => {
    setLoading(true)
    const formData = {
      contact_email: values.email,
      contact_number: values.phone_number,
      contact_location: values.address
    }
    await contact.update(formData).then((res) => {
      Toastify({
        text: 'Success, Contact has been updated',
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
      <NextSeo title="Event Setup | Contact" noindex />
      <div className="mt-8 flex justify-between items-center">
        <div>
          <h2 className="mr-auto text-2xl font-medium">Contact</h2>
          <span>Edit how customer could reach you</span>
        </div>
        <Console.Button
          variant="dark"
          className="shadow-md px-6"
        >
          <Console.Lucide icon="Eye" className="w-5 h-5 mr-2" />
          Preview Page
        </Console.Button>
      </div>
      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-12 lg:col-span-6">
          <div className="p-5 box mt-5">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <FormComponent />
                <div className="mt-12 text-right">
                  <Console.Button
                    variant="warning"
                    type="submit"
                    className="w-fit px-14"
                    isLoading={isLoading}
                    disabled={isLoading}>
                    Submit
                  </Console.Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

CreatePage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default CreatePage
