import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route, { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useState, useEffect } from 'react'
import FormComponent from './components/form.component'
import artist from '../../services/artist'
import { createValidation } from './components/validation'

const CreatePage = () => {
  const router = useRouter()
  const id = router.query.id

  const [isLoading, setLoading] = useState(false)
  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const fetchDetail = async () => {
    await artist.apiGetDetail(id).then((res) => {
      const result = res.data
      methods.setValue('name', result.name)
      methods.setValue('title', result.job_title)
      methods.setValue('photo', result.photo)
      methods.setValue('profile', result.profile)
    }).catch((err) => console.log(err))
  }

  useEffect(() => {
    if (id) {
      fetchDetail()
    }
  }, [id])

  const onSubmit = async (values) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('job_title', values.title)
    formData.append('profile', values.profile)
    formData.append('photo', values.photo)

    if (id) {
      await artist.apiUpdate(id, formData).then((res) => {
        Toastify({
          text: 'Success, Speaker has been updated',
          type: 'success'
        });
        return router.push(`/stage/artist`)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
        Object.keys(err?.response?.data?.errors)?.map((v) => {
          methods.setError(v, { message: err?.response?.data?.errors[v][0] })
        })
      })
    } else {
      await artist.apiCreate(formData).then((res) => {
        Toastify({
          text: 'Success, Speaker has been created',
          type: 'success'
        });
        return router.push(`/stage/artist`)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
        Object.keys(err?.response?.data?.errors)?.map((v) => {
          methods.setError(v, { message: err?.response?.data?.errors[v][0] })
        })
      })
    }
    setLoading(false)
  }

  return (
    <div>
      <NextSeo title={`Stage | Artist/Speaker | ${id ? 'Edit' : 'Add'}`} noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit' : 'Add'} Artist/Speaker</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="p-5 box mt-5">
                <FormComponent />
              </div>
              <div className="mt-12 text-right">
                <Console.Button
                  type="button"
                  variant="outline-secondary"
                  onClick={() => {
                    Route.back();
                  }}
                  className="w-20 mr-2">
                  Cancel
                </Console.Button>
                <Console.Button
                  variant="primary"
                  type="submit"
                  className="w-[150px]"
                  isLoading={isLoading}>
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

CreatePage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default CreatePage
