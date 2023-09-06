import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useForm, FormProvider } from 'react-hook-form'
import { Console, Compression, Toastify } from 'ems-component'
import FormComponent from './components/form.component'
import FormPriceComponent from './components/form-price.component'
import FormVariantComponent from './components/form-variant.component'
import FormSaleComponent from './components/form-saleinfo.component'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'
import ticket from '../../services/ticket'
import { apiGetSession } from '@/src/stores/authContext'
import { createValidation } from './components/validation'
import number from '@/src/utils/number'
import { getOnlyTime } from '@/src/utils/helper'

const FormCreate = () => {
  const router = useRouter()
  const ticketId = router.query.ticketId
  // const { user } = useAuth()
  const [eventDetail, setEventDetail] = useState([])
  const pagePath = router.pathname.split('/')[2]

  const [loading, setLoading] = useState(false)
  const [isInvitationTicket, setIsInvitation] = useState(false)

  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const variantForm = methods.watch('variants')

  const [hidePrice, setHidePrice] = useState(false)
  const [benchCache, setBenchCache] = useState([])

  useEffect(() => {
    if (variantForm) {
      if (variantForm.length >= 1) {
        setHidePrice(true)
      } else {
        setHidePrice(false)
      }
    }
  }, [variantForm])

  const fetchData = async (id) => {
    await ticket.apiGetDetail(id).then((res) => {
      if (pagePath == 'edit') {
        methods.setValue('name', res.data.detail_product.name)
      }
      methods.setValue('description', res.data.detail_product.description)
      methods.setValue('photo', res.data.detail_product.photo_1)
      methods.setValue('invitation', res.data.detail_product.invitation)
      methods.setValue('min_purchase', res?.data?.detail_product?.min_purchase != null ? number.local(res?.data?.detail_product?.min_purchase) : '')
      methods.setValue('max_purchase', res?.data?.detail_product?.max_purchase != null ? number.local(res?.data?.detail_product?.max_purchase) : '')

      const variants = []
      if (res.data.variants.length > 0) {
        res.data.variants.map((v) => {
          let variant = {
            variant_name: v.variant_name,
            variant_type: v.variant_type,
            price: number.local(v.price),
            stock: number.local(v.stock)
          }
          if (pagePath == 'edit') {
            variant['variant_id'] = v.id
          }
          if (v.benchs && v.benchs.length > 0) {
            const subvariants = []
            v.benchs.map((v2) => {
              let sub = {
                variant_name: v2.prefix,
              }
              if (v.bench) {
                sub['bench_start'] = number.local(v2.range[0])
                sub['bench_end'] = number.local(v2.range[1])
              }
              subvariants.push(sub)
            })
            variant['subvariants'] = subvariants
          }

          variants.push(variant)
        })
        methods.setValue('variants', variants)
      } else {
        methods.setValue('stock', number.local(res.data.stock))
        methods.setValue('price', number.local(res.data.unit_price))
        methods.setValue('discount_type', res.data.discount?.type)
        methods.setValue('discount_price', number.local(res.data.discount?.discount_price))
      }
      methods.setValue('start_sale_date', moment(res.data.on_sale_start).toDate())
      methods.setValue('start_sale_time', moment(res.data.on_sale_start).toDate())
      methods.setValue('end_sale_date', moment(res.data.on_sale_end).toDate())
      methods.setValue('end_sale_time', moment(res.data.on_sale_end).toDate())
      methods.setValue('entranceDate', res.data.entrance_dates)
      methods.setValue('photo', res.data.detail_product.photo_1)
    }).catch((err) => {
      console.log(err)
    })
  }
  const getEventDetail = async () => {
    await apiGetSession().then((res) => {
      setEventDetail(res.data)
    })
  }

  useEffect(() => {
    getEventDetail()
  }, [])

  useEffect(() => {
    if (ticketId != undefined) {
      fetchData(ticketId)
    }
  }, [ticketId])

  const findOnCache = (v) => {
    const find = benchCache.find((obj) => obj.variant_id == v.variant_id)
    let isChange = false
    let variant = {
      id: v.variant_id,
      variant_name: v.variant_name,
      variant_type: v.variant_type
    }
    if (v.subvariants.length > 0) {
      let subvariants = []
      v.subvariants.map((v2) => {
        if (find.subvariants) {
          const find2 = find.subvariants.find((obj) => obj.variant_id == v2.variant_id)
          if (find2.variant_name != v2.variant_name || find2.bench_start != v2.bench_start || find2.bench_end != v2.bench_end) {
            isChange = true
          }
          subvariants.push({
            id: v2.id,
            variant_name: v2.variant_name,
            range: [number.toNumber(v2.bench_start), number.toNumber(v2.bench_end)],
          })
        } else {
          subvariants.push({
            id: v2.id,
            variant_name: v2.variant_name,
            variant_type: "Bench",
            range: [number.toNumber(v2.bench_start), number.toNumber(v2.bench_end)],
            price: number.toNumber(v2.price),
            stock: (number.toNumber(v2.bench_end) - number.toNumber(v2.bench_start)) + 1,
            bench: true
          })
          isChange = true
        }
      })
      variant['subvariants'] = subvariants
    } else {
      if (find) {
        if (find.variant_name != v.variant_name || find.price != v.price || find.bench_start != v.bench_start || find.bench_end != v.bench_end) {
          variant['bench'] = true
          variant['price'] = number.toNumber(v.price)
          variant['range'] = [number.toNumber(v.bench_start), number.toNumber(v.bench_end)]
          variant['stock'] = (number.toNumber(v.bench_end) - number.toNumber(v.bench_start)) + 1
        }
      }
    }
    if (v.subvariants.length > 0) {
      if (find.variant_name != v.variant_name || isChange) {
        return variant
      }
    } else {
      if (find.variant_name != v.variant_name || find.price != v.price || find.bench_start != v.bench_start || find.bench_end != v.bench_end) {
        return variant
      }
    }
  }

  const onSubmit = async (values) => {
    // console.log(values)
    const formData = {
      companys_id: eventDetail.company.id,
      name: values.name,
      description: values.description,
      min_purchase: number.toNumber(values.min_purchase),
      max_purchase: number.toNumber(values.max_purchase),
      on_sale_start: getOnlyTime(values.start_sale_time,values.start_sale_date).toISOString(),
      // on_sale_start: new Date(`${moment(values.start_sale_date).format('YYYY-MM-DD')} ${moment(values.start_sale_time).format('HH:mm:ss')}`).toISOString(),
      on_sale_end: getOnlyTime(values.end_sale_time,values.end_sale_date).toISOString(),
      // on_sale_end: new Date(`${moment(values.end_sale_date).format('YYYY-MM-DD')} ${moment(values.end_sale_time).format('HH:mm:ss')}`).toISOString(),
      invitation: values.invitation
    }
    if (values.entranceDate) {
      if (values.entranceDate.length > 0) {
        formData['entrance_dates'] = values.entranceDate
      }
    }
    if (values.variants.length > 0) {
      const variants = []
      values.variants.map((v) => {
        let variant = {
          variant_name: v.variant_name,
          variant_type: v.variant_type,
          price: number.toNumber(v.price),
          stock: number.toNumber(v.stock)
        }
        if (ticketId != undefined) {
          variant['id'] = v.variant_id
        }
        if (v.subvariants.length > 0) {
          const benchs = []
          v.subvariants.map((v2) => {
            benchs.push({
              prefix: v2.variant_name,
              range: [v2.bench_start, v2.bench_end]
            })
          })
          variant['benchs'] = benchs
        }
        variants.push(variant)
      })

      formData['variants'] = variants
    } else {
      formData['stock'] = number.toNumber(values.stock)
      formData['unit_price'] = number.toNumber(values.price?values.price:'0')
      formData['discount_type'] = values.discount_type
      formData['discount_price'] = number.toNumber(values.discount_price)
    }

    if (typeof values.photo != 'string') {
      if (values.photo != undefined) {
        const compress = await Compression.imageCompress(values.photo)
        const base64 = await Compression.getBase64(compress)
        formData['photo_1'] = base64
      }
    }

    if (values.deletedIds) {
      formData['deletedIds'] = values.deletedIds
    }
    // return console.log(formData)
    setLoading(true)
    if (pagePath == 'edit') {
      await ticket.apiUpdate(ticketId, formData).then((res) => {
        Toastify({
          text: 'Success, Ticket has been updated',
          type: 'success'
        });
        return router.push(`/ticket/list`)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
      })
    } else {
      await ticket.apiCreate(formData).then((res) => {
        Toastify({
          text: 'Success, Ticket has been created',
          type: 'success'
        });
        return router.push(`/ticket/list`)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
      })
    }
    setLoading(false)
  }

  return (
    <div>
      <NextSeo title="Create Ticket" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">{pagePath == 'edit' ? 'Edit Ticket' : pagePath == 'duplicate' ? 'Duplicate Ticket' : 'Create Ticket'}</h2>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit, (err) => { console.log(err) })}>
          <div className='box mt-5 p-5'>
            <FormComponent eventDetail={eventDetail} mode={pagePath == 'edit' ? 'edit' : pagePath == 'duplicate' ? 'duplicate' : 'new'} />
            <FormPriceComponent hidePrice={hidePrice} mode={pagePath == 'edit' ? 'edit' : pagePath == 'duplicate' ? 'duplicate' : 'new'}
              isInvitation={(e) => {
                setIsInvitation(e)
              }
              } />
            {!isInvitationTicket &&
              <FormVariantComponent mode={pagePath == 'edit' ? 'edit' : pagePath == 'duplicate' ? 'duplicate' : 'new'} isInvitation={isInvitationTicket} />
            }
            {!isInvitationTicket &&
              <FormSaleComponent eventDetail={eventDetail} />
            }
          </div>

          <div className="flex flex-col justify-end gap-2 mt-5 md:!flex-row">
            <Console.Button
              type="button"
              className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:!w-52"
              onClick={() => router.push('/ticket/list')}>
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="submit"
              className="w-full py-3 md:!w-52"
              disabled={loading}
              isLoading={loading}>
              Submit
            </Console.Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

FormCreate.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default FormCreate
