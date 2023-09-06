import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useState, useEffect } from 'react'
import FormComponent from './components/form.component'
import { createValidation } from './components/validation'
import templates from '../../services/templates'

const FormPage = () => {
  const router = useRouter()
  const id = router.query.id
  const [isLoading, setIsLoading] = useState()

  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const fetchData = async () => {
    await templates.apiDetail(id).then((res) => {
      const result = res.data
      methods.setValue('template_name', result.name)
      methods.setValue('subject', result.subject)
      methods.setValue('template', result.html_body)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const onSubmit = async (values) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('name', values.template_name)
    formData.append('subject', values.subject)
    formData.append('html_body', values.template)

    if (id) {
      await templates.apiUpdate(id, formData).then((res) => {
        Toastify({
          text: 'Success, Template has been updated',
          type: 'success'
        });
        return router.push('/mail-service/templates')
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
      })
    } else {
      await templates.apiCreate(formData).then((res) => {
        Toastify({
          text: 'Success, Template has been created',
          type: 'success'
        });
        return router.push('/mail-service/templates')
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
      })
    }
    setIsLoading(false)
  }

  return (
    <div>
      <NextSeo title={`Mail Service | Mail Templates | ${id ? 'Edit' : 'Add'}`} noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit' : 'Add'} Mail Template</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormComponent />
          <div className="mt-12 text-right">
            <Console.Button
              type="button"
              variant="outline-secondary"
              onClick={() => router.push('/mail-service/templates')}
              className="w-20 mr-2">
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="submit"
              className="w-[150px]"
              isLoading={isLoading}
              disabled={isLoading}>
              Submit
            </Console.Button>
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
