import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import ListComponent from './components/list.component'
import { useForm } from "react-hook-form";
import operating from "../../services/operating";
import ReactSelect from "@/src/components/Form/ReactSelect";

const ListPage = () => {
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc'
  })

  const { register, control, watch } = useForm()
  const { search, status } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await operating.apiGetAll({
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

  return (
    <>
      <NextSeo title="F&B | Operating Hours | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Operating Hours</h2>
      <div className="mt-4">
        <div className="p-4 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
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
            <div className="ml-2 w-40">
              <ReactSelect
                name="status"
                placeholder="Status"
                defaultValue=""
                options={[
                  {
                    value: '',
                    label: 'All'
                  }, {
                    value: 'open',
                    label: 'Open'
                  }, {
                    value: 'close',
                    label: 'Closed'
                  }
                ]}
                isSearchable={false}
                control={control}
              />
            </div>
          </div>
        </div>
        <div className="mt-2 relative z-[1] px-4 pb-4">
          <div className="mt-2">
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
