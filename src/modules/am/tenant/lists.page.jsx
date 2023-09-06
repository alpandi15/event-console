import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import tenant from './tenant.service'
import Router, { useRouter } from 'next/router'
import { useSessionContext } from "@/src/stores/sessionContext"
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import ReactSelect from '@/src/components/Base/ReactSelect'
import { TENANT_STATUS } from '@/src/constant/status'

const ItrexTeam = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
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

  const fetchAll = useCallback(async () => {
    await tenant.apiGetAll({
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
  }

  return (
    <>
      <NextSeo title="Tenant F&B | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Tenant F&B</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/invite`)}
        >
          Invite Tenant
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
          <div className="ml-2 w-40">
            <ReactSelect
              placeholder="Status..."
              options={TENANT_STATUS}
            />
          </div>
          <div className="ml-2 w-40">
            <ReactSelect
              placeholder="F&B Category..."
              options={[]}
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
