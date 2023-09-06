import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import FormComponent from './components/form.component'
import schedule from '../../services/schedule'
import moment from 'moment'
import { createValidation } from './components/validation'

const CreatePage = () => {
  const router = useRouter()
  const id = router.query.id

  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const fetchData = async () => {
    await schedule.apiGetDetail(router.query.id).then((res) => {
      methods.setValue('title', res.data.title)
      methods.setValue('date', moment(res.data.date).toDate())
      methods.setValue('start_time', moment(res.data.start_time).toDate())
      methods.setValue('end_time', moment(res.data.end_time).toDate())
      methods.setValue('duration', res.data.duration)
      methods.setValue('live_link', res.data.live_link)
      methods.setValue('on_demand_link', res.data.on_demand_link)
      methods.setValue('speakers_ids', res.data.speakers_id)
      methods.setValue('session_ids', res.data.sessions_id)
    })
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const onSubmit = async (values) => {
    const formData = {
      title: values.title,
      date: moment(values.date).format('YYYY-MM-DD'),
      start_time: values.start_time,
      end_time: values.end_time,
      duration: values.duration,
      live_link: values.live_link,
      on_demand_link: values.on_demand_link
    }
    if (values.speakers_id) {
      values.speakers_id.map((v, k) => {
        formData[`speakers[${k}]`] = v.value
      })
    }
    if (values.session_id) {
      values.session_id.map((v, k) => {
        formData[`sessions[${k}]`] = v.value
      })
    }
    if (id) {
      await schedule.apiUpdate(router.query.id, formData).then((res) => {
        Toastify({
          text: 'Success, Schedule has been updated',
          type: 'success'
        });
        return router.push(`/stage/schedules`)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
        return
      })
    } else {
      await schedule.apiCreate(formData).then((res) => {
        Toastify({
          text: 'Success, Schedule has been created',
          type: 'success'
        });
        return router.push(`/stage/schedules`)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
        return
      })
    }
  }

  return (
    <div>
      <NextSeo title={`Stage | Schedule | ${id ? 'Edit' : 'Add'}`} noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit' : 'Add'} Schedule</h2>
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
                    router.push('/stage/schedules')
                  }}
                  className="w-20 mr-2">
                  Cancel
                </Console.Button>
                <Console.Button
                  variant="primary"
                  type="submit"
                  className="w-[150px]">
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
