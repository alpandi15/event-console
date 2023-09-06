import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import menu from "../../services/menu";
import { useForm } from "react-hook-form";
import ReactSelect from "@/src/components/Form/ReactSelect";
import ListComponent from "./components/list.component";

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
    await menu.getDisplayMenus({
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
      <NextSeo title="F&B | Display Menu | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Display Menu</h2>
      <div className="py-4 mt-4">
        <div className="mt-2 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
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
                      value: 'true',
                      label: 'Active'
                    },
                    {
                      value: 'false',
                      label: 'Inactive'
                    }
                  ]}
                  control={control}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2 relative z-[1]">
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
