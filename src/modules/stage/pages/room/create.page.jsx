import { Console, Toastify } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import FormComponent from './components/form.component'
import { createValidation } from './components/validation'
import room from '../../services/room'

const CreatePage = () => {
  const router = useRouter()
  const id = router.query.id

  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const fetchAreas = async (id) => {
    const areas = []
    await room.fetchAreas({ search: '' }).then((res) => {
      res.data.map((v) => {
        areas.push({
          label: v.area_name,
          value: v.id
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    const find = areas.find((obj) => obj.value == id)

    return find
  }

  const fetchData = async () => {
    await room.apiGetDetail(router.query.id).then(async (res) => {
      methods.setValue('room_name', res.data.room_name)
      methods.setValue('room_no', res.data.room_no)
      await fetchAreas(res.data.areas_id).then((res) => {
        methods.setValue('areas_id', res)
      })
    })
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id])

  const onSubmit = async (values) => {
    const formData = {
      room_name: values.room_name,
      room_no: values.room_no,
      areas_id: values.areas_id.value,
    }

    if (id) {
      await room.apiUpdate(router.query.id, formData).then((res) => {
        Toastify({
          text: 'Success, Room has been updated',
          type: 'success'
        });
        return router.push(`/stage/room`)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
        return
      })
    } else {
      await room.apiCreate(formData).then((res) => {
        Toastify({
          text: 'Success, Room has been created',
          type: 'success'
        });
        return router.push(`/stage/room`)
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
      <NextSeo title={`Stage | Room | ${id ? 'Edit' : 'Add'}`} noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit' : 'Add'} Room/Stage</h2>
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
                    router.push('/stage/room')
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
