import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import ListComponent from './components/lists.component'
import { useForm } from "react-hook-form";
import schedule from "../../services/schedule";
import FilterDate from '@/src/components/Base/FilterDate'
import moment from "moment";

const ListPage = () => {
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })
  const { register, watch } = useForm();

  const { search } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await schedule.apiGetAll({
      search: search,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
    }).catch((err) => console.log(err))
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
      console.log(new Date(startDate).toISOString())
      setFilterData({
        ...filterData,
        start_date: new Date(startDate).toISOString(),
        end_date: new Date(endDate).toISOString()
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
      <NextSeo title="Stage | Schedules | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Schedules</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/create`)}
        >
          Add Schedules
        </Console.Button>
      </div>
      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
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
          <div className="ml-2 flex items-center">
            <FilterDate onChange={(e) => filterDate(e)} />
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
              onChangeLimit={setPageSize}
            />
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
