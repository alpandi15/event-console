import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import ListComponent from './components/lists.component'
import exit from "../../services/exit";
import { useForm } from "react-hook-form";
import ReactSelect from "@/src/components/Form/ReactSelect";
import getConfig from 'next/config'

const ListPage = () => {
  const { publicRuntimeConfig } = getConfig()
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [eventId, setEventId] = useState('')
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc'
  })

  const { register, control, watch } = useForm()
  const { search, status } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await exit.apiGetAll({
      search: search || undefined,
      status: status || undefined,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
      setEventId(res.url)
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

  const goToCheckpoint = () => {
    window.open(`${publicRuntimeConfig.APPS_HOST}check-point/${eventId}`, '_blank')
  }

  return (
    <>
      <NextSeo title="Exit Gate | List" noindex />
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-2xl font-medium">Exit Gate</h2>
        {/* <Console.Button
          variant="dark"
          className="shadow-md"
          onClick={goToCheckpoint}>
          Go To Checkpoint Gate
        </Console.Button> */}
      </div>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/create`)}>
          Add Exit Gate
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
          <div className="ml-2 w-40">
            <ReactSelect
              id="status"
              name="status"
              defaultValue=""
              placeholder="Status"
              options={[
                {
                  value: '',
                  label: 'All'
                },
                {
                  value: 'active',
                  label: 'Active'
                },
                {
                  value: 'inactive',
                  label: 'Inactive'
                }
              ]}
              control={control}
            />
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
