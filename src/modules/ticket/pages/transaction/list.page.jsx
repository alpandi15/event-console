import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import DateInput from '@/src/components/Base/FilterDate/DateInput'
import ListComponent from './components/lists.component'
import transaction from "../../services/transaction";
import { useForm } from "react-hook-form";

const ListPage = () => {
  const { register, watch } = useForm();
  const { search } = watch()
  const [date, setDate] = useState()
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await transaction.apiGetAll({
      search: search,
      per_page: PageSize,
      page: currentPage,
      date: date,
      ...filterData
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
    }).catch((err) => {
      console.log(err)
    })
    setLoading(false)
  }, [search, date])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  return (
    <>
      <NextSeo title="Ticket Transaction | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Ticket Transaction</h2>
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
          <div className="ml-2 flex items-center">
            <div className="w-44">
              <DateInput placeholder="Date" onChange={(e) => setDate(e)} />
            </div>
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
