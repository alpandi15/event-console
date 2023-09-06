import _, { debounce } from "lodash";
import { useCallback, useEffect, useState, useMemo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { apiBusinessCategories, apiGetAll } from '../sarvices/member.service'
import Router from 'next/router'
import { useSessionContext } from "@/src/stores/sessionContext"
import { NextSeo } from 'next-seo'
import ListComponent from '../components/lists.component'
import ReactSelectAsync from "@/src/components/Form/ReactSelect/Async";
import { useForm } from "react-hook-form";

const ItrexTeam = () => {
  const [meta, setMetas] = useState([])
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })
  const [queryString, setQueryString] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const { session: { user } } = useSessionContext()
  const { control, watch } = useForm()
  const { businsess_category } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const res = await apiGetAll({
      search: queryString,
      business_categorys_id: businsess_category?.value || undefined,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    })
    if (res?.success) {
      setLists(res?.data)
      setMetas(res.meta)
      setTotalData(res?.meta?.total)
      setCurrentPage(res?.meta?.current_page)
    }
    setLoading(false)
  }, [PageSize, currentPage, filterData, queryString, businsess_category])

  const fetchBusinessCategories = async (e) => {
    const bc = []
    await apiBusinessCategories({ search: e }).then((res) => {
      res.data.map((v) => {
        bc.push({
          value: v.id,
          label: v.name
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    return bc
  }

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const onSearch = useMemo(
    () => debounce(async (q) => {
      setCurrentPage(1)
      setQueryString(q)
    }, 1500),
    []
  )

  return (
    <>
      <NextSeo title="Exhibit | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Exhibit</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/invite`)}
        >
          Invite Exhibit
        </Console.Button>

      </div>
      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
        <div className="flex items-center justify-end intro-y gap-4">
          <div className="relative w-56 text-slate-500">
            <Console.FormInput
              type="text"
              className="w-56 pr-10"
              placeholder="Search..."
              onChange={(e) => onSearch(e.target.value)}
            />
            <Console.Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </div>
          <div className="ml-2 w-56">
            <ReactSelectAsync
              name="businsess_category"
              placeholder="Business Category"
              defaultOptions={true}
              loadOption={fetchBusinessCategories}
              control={control}
              isClearable
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

ItrexTeam.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ItrexTeam
