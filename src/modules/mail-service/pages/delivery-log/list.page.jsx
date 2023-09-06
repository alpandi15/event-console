import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import send from "../../services/send";
import FilterDate from "@/src/components/Base/FilterDate";
import ReactSelect from "@/src/components/Form/ReactSelect";
import { useForm } from "react-hook-form";
import moment from "moment";

const ListPage = () => {
  const { control, register, watch } = useForm()
  const { search, status } = watch()
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc'
  })

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await send.getLogs({
      search: search || undefined,
      status: status || undefined,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
    }).catch((err) => {
      console.log(err)
    })
    setLoading(false)
  }, [PageSize, currentPage, filterData, search, status])

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
        start_date: moment(startDate).toISOString(),
        end_date: moment(endDate).toISOString()
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
      <NextSeo title="Mail Service | Delivery Log" noindex />
      <h2 className="mt-6 text-2xl font-medium">Delivery Log</h2>
      <div className="py-4 mt-12 px-6 shadow border rounded-lg bg-white">
        <div className="flex items-center justify-end intro-y gap-4">
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
          <div className="ml-2 w-28">
            <ReactSelect
              placeholder="Status"
              name="status"
              control={control}
              defaultValue=""
              options={[
                {
                  label: 'All',
                  value: ''
                },
                {
                  label: 'Success',
                  value: 'OK'
                },
                {
                  label: 'Error',
                  value: 'ERROR'
                },
              ]}
            />
          </div>
          <div className="ml-2 flex items-center">
            <FilterDate showTimeSelect={false} onChange={(e) => filterDate(e)} />
          </div>
        </div>
        <div className="mt-6 relative z-[1]">
          <div className="overflow-hidden mt-2">
            <ListComponent
              lists={lists}
              meta={meta}
              onRefresh={fetchAll}
              isLoading={loading}
              pageSize={PageSize}
              onPageChange={setCurrentPage}
              onChangeLimit={setPageSize} />
          </div>
        </div>
      </div>
    </>
  )
}

ListPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListPage
