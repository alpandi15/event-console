import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import ListComponent from './components/detail-list.component'
import { useForm } from "react-hook-form";
import order from "../../services/order";
import { useRouter } from "next/router";
import FilterDate from "@/src/components/Base/FilterDate";
import moment from "moment";

const DetailPage = () => {
  const router = useRouter()
  const id = router.query.id
  const [company_name, setCompanyName] = useState('')
  const [category, setCategoryName] = useState('')
  const [product, setProductName] = useState('')
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc'
  })

  const { register, watch } = useForm()
  const { search } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await order.apiGetDetail(id, {
      search: search || undefined,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
      setCompanyName(res.company.company_name)
      setCategoryName(res.category.name)
      setProductName(res.product.name)
    }).catch((err) => {
      console.log(err)
    })
    setLoading(false)
  }, [PageSize, currentPage, filterData, search])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const filterDate = (values) => {
    const { startDate, endDate } = values

    if (startDate && endDate) {
      setFilterData({
        ...filterData,
        start_date: moment(startDate).format('YYYY-MM-DD'),
        end_date: moment(endDate).format('YYYY-MM-DD')
      })
    }

    if (!startDate && !endDate) {
      setFilterData({
        ...filterData,
        start_date: undefined,
        end_date: undefined
      })
    }
  }

  return (
    <>
      <NextSeo title="F&B | Order | Detail" noindex />
      <div className="flex items-center my-8 gap-4">
        <Console.Button variant='dark' onClick={() => router.push('/tenant/order')}>
          <Console.Lucide icon='ArrowLeft' className='h-5 w-5' />
        </Console.Button>
        <h2 className="mr-auto text-2xl font-medium">Order Detail</h2>
      </div>
      <div className="w-full flex gap-4 mt-8">
        <div className="box bg-primary p-4 h-fit w-1/4 flex flex-col">
          <h1 className="text-2xl font-semibold">{company_name}</h1>
          <span className="mt-2">{product}</span>
          <span className="italic font-light">{category}</span>
        </div>
        <div className="intro-y w-3/4 box p-4 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap">
            <div className="flex flex-wrap items-center col-span-12 xl:flex-nowrap">
              <div className="flex w-full sm:w-auto">
                <div className="relative w-56 text-slate-500">
                  <Console.FormInput
                    type="text"
                    className="w-56 pr-10"
                    placeholder="Search..."
                    {...register('search')}
                  />
                  <Console.Lucide
                    icon="Search"
                    className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                  />
                </div>
              </div>
              <div className="ml-2 flex items-center">
                <FilterDate showTimeSelect={false} onChange={(e) => filterDate(e)} />
              </div>
            </div>
          </div>
          <div className="relative z-[1]">
            <ListComponent
              lists={lists}
              meta={meta}
              onRefresh={fetchAll}
              isLoading={loading}
              pageSize={PageSize}
              onPageChange={setCurrentPage}
              onChangeLimit={setPageSize}
            />
          </div>
        </div>
      </div>
    </>
  )
}

DetailPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default DetailPage
