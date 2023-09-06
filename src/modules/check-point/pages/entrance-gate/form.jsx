import { Console } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import { useRouter } from 'next/router'
import Toastify from 'toastify-js'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useState, useEffect } from 'react'
import FormComponent from './components/form.component'
import entrance from '../../services/entrance'
import moment from 'moment'
import { createValidation } from './components/validation'
import { getOnlyTime } from '@/src/utils/helper'

const CreatePage = () => {
  const router = useRouter()
  const id = router.query.id
  const [isLoading, setIsLoading] = useState()
  const [pin, setPin] = useState('')

  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation({ mode: id ? 'edit' : 'new' }),
    reValidateMode: 'onChange'
  })

  const fetchData = async () => {
    if (id) {
      await entrance.apiDetail(id).then((res) => {
        methods.setValue('gate_name', res.data.name)
        methods.setValue('areasId', res.data.areas_id)
        methods.setValue('selectedTickets', res.data.tickets)
        methods.setValue('url', res.data.url)
        methods.setValue('pin', res.data.pin)
        methods.setValue('max_devices', res.data.max_devices)
        methods.setValue('open_time', moment(res.data.open_time).toDate())
        methods.setValue('close_time', moment(res.data.close_time).toDate())
        setPin(res.data.pin)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [id])

  const onSubmit = async (values) => {
    setIsLoading(true)

    const formData = {
      name: values.gate_name,
      areas_id: values.areas_id.value,
      max_devices: values.max_devices,
      open_time: getOnlyTime(values.open_time).toISOString(),
      close_time: getOnlyTime(values.close_time).toISOString(),
    }

    if (pin != values.pin) {
      if (values.pin.length < 4 && values.pin.length > 0) {
        methods.setError('pin', { minLength: 4, message: 'Pin must be 4 digit number' })
        setIsLoading(false)
        return false
      } else if (values.pin.length == 0) {
        methods.setError('pin', { type: 'required', message: 'This field is required' })
        setIsLoading(false)
        return false
      } else {
        if (values.pinConfirmation) {
          if (values.pinConfirmation.length < 4 && values.pinConfirmation.length > 0) {
            methods.setError('pinConfirmation', { minLength: 4, message: 'Pin must be 4 digit number' })
            setIsLoading(false)
            return false
          } else {
            if (values.pinConfirmation != values.pin) {
              methods.setError('pinConfirmation', { message: 'Pin Confirmation not match' })
              setIsLoading(false)
              return false
            } else {
              formData['pin'] = values.pin
            }
          }
        } else {
          methods.setError('pinConfirmation', { type: 'required', message: 'This field is required' })
          setIsLoading(false)
          return false
        }
      }
    }

    if (values.tickets) {
      const tickets = []
      values.tickets.map((v) => {
        tickets.push(v.hookvalue)
      })
      formData['tickets'] = JSON.stringify(tickets)
    }

    if (id) {
      await entrance.apiUpdate(id, formData).then((res) => {
        Toastify({
          text: 'Success, Entrance Gate has been updated',
          type: 'success'
        });
        return router.push('/check-point/entrance-gate')
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
      })
    } else {
      await entrance.apiCreate(formData).then((res) => {
        Toastify({
          text: 'Success, Entrance Gate has been created',
          type: 'success'
        });
        return router.push('/check-point/entrance-gate')
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
      <NextSeo title={`Check Point | Entrance Gate | ${id ? 'Edit' : 'Add'}`} noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit' : 'Add'} Entrance Gate</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-6">
              <div className="p-5 box mt-5">
                <FormComponent isEdit={id != undefined} />
              </div>
              <div className="mt-12 text-right">
                <Console.Button
                  type="button"
                  variant="dark"
                  onClick={() => router.push('/check-point/entrance-gate')}
                  className="w-fit mr-2">
                  Cancel
                </Console.Button>
                <Console.Button
                  variant="primary"
                  type="submit"
                  className="w-fit"
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
