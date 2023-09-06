import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import tenantService from './tenant.service'
import Pagination from "@/src/components/Pagination";
import { useSessionContext } from "@/src/stores/sessionContext";
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import { numberFormatIDR } from '@/src/utils/currency'
import { EXHIBIT_STATUS } from '@/src/constant/status'
import ReactSelect from '@/src/components/Base/ReactSelect'
import Router from 'next/router'

const ListData = () => {
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
  const [queryString, setQueryString] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const { session: { user } } = useSessionContext()
  console.log('USER ', user)

  const fetchAll = useCallback(async () => {
    await tenantService.apiGetAll({
      search: queryString,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
    })
  }, [currentPage, filterData, queryString])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const onSearch = useMemo(
    () => debounce(async (q) => {
      setCurrentPage(1)
      setQueryString(q)
      console.log('SEARCH ', q)
    }, 1500),
    []
  )

  const filterStatus = async (status) => {
    if (!status) {
      setFilterData({
        ...filterData,
        status: undefined
      })
      return
    }
    setFilterData({
      ...filterData,
      status
    })
    console.log('SEARCH ', status)
  }
  // console.log('SESSION ', props)
  return (
    <>
      <NextSeo title="Team Tenant | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Team Tenant</h2>

      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/invite`)}
        >
          Invite Team Tenant
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
            <ReactSelect
              placeholder="Status Event"
              options={EXHIBIT_STATUS}
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

ListData.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListData
