import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import Pagination from "@/src/components/Pagination"
import { useSessionContext } from "@/src/stores/sessionContext"
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import { SwitchGridList } from '@/src/components/Base'
import ListComponent from './components/list.component'
import CardComponent from "./components/card.component";
import menu from "../../services/menu";
import { useForm } from "react-hook-form";
import ReactSelect from "@/src/components/Form/ReactSelect";
import ReactSelectAsync from "@/src/components/Form/ReactSelect/Async";

const ListPage = () => {
  const [viewType, setViewType] = useState(0) // 0:list; 1:grid;
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
  const { search, status, category } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await menu.getMenuList({
      search: search || undefined,
      status: status || undefined,
      category: category?.value || undefined,
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
  }, [PageSize, currentPage, filterData, search, status, category])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const fetchCategory = async (e) => {
    const categories = []

    await menu.getCategories({ search: e }).then((res) => {
      res.data.map((v) => {
        categories.push({
          value: v.id,
          label: v.name
        })
      })
    }).catch((err) => {
      console.log(err)
    })

    return categories
  }

  return (
    <>
      <NextSeo title="F&B | Menu | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Menu List</h2>
      <div className="mt-2 flex items-center justify-end">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`/tenant/menu/add-menu`)}
        >
          Add Menu
        </Console.Button>
      </div>
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
              <div className="ml-2 w-40">
                <ReactSelect
                  id="status"
                  name="status"
                  placeholder="Status"
                  defaultValue=""
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
                    },
                    {
                      value: 'suspended',
                      label: 'Suspended'
                    }
                  ]}
                  isSearchable={false}
                  control={control}
                />
              </div>
              <div className="ml-2 w-52">
                <ReactSelectAsync
                  id="category"
                  name="category"
                  placeholder="Category"
                  defaultOptions={true}
                  loadOption={fetchCategory}
                  isClearable={true}
                  isSearchable={false}
                  control={control}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="">
              <SwitchGridList defaultIndex={viewType} onChange={(index) => setViewType(index)} />
            </div>
          </div>
        </div>
        <div className="mt-2 relative z-[1] px-4 pb-4">
          <div className="mt-2">
            {viewType === 0 ? (
              <div>
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
            ) : viewType === 1 ? (
              <CardComponent
                lists={lists}
                meta={meta}
                onRefresh={fetchAll}
                isLoading={loading}
                pageSize={PageSize}
                onPageChange={setCurrentPage}
                onChangeLimit={setPageSize} />
            ) : null}
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
