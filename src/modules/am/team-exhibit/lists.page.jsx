import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { apiGetAll } from './services/team-exhibit.service'
import Pagination from "@/src/components/Pagination";
import { useSessionContext } from "@/src/stores/sessionContext";
import { NextSeo } from 'next-seo'
import ListConponent from './components/lists.component'
import { numberFormatIDR } from '@/src/utils/currency'
import { EXHIBIT_STATUS } from '@/src/constant/status'
import ReactSelect from '@/src/components/Base/ReactSelect'
import Router from 'next/router'
import { useAuth } from "@/src/stores/authContext";

let PageSize = 20

const ListData = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [PageSize, setPageSize] = useState(25)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })
  const [meta, setMeta] = useState([])
  const [queryString, setQueryString] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const { user } = useAuth()

  const fetchAll = useCallback(async () => {
    setLoading(true)

    const res = await apiGetAll({
      search: queryString,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    })

    setLoading(false)

    if (res?.success) {
      setLists(res?.data)
      setMeta(res.meta)
      setTotalData(res?.meta?.total)
      setCurrentPage(res?.meta?.current_page)
    }
  }, [PageSize, currentPage, filterData, queryString, user])

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
  // console.log('SESSION ', props)
  return (
    <>
      <NextSeo title="Team Exhibit | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Team Exhibit</h2>

      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/invite`)}
        >
          Add Team Exhibit
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
            <Console.FormSelect
              onChange={(e) => filterStatus(e?.target?.value)}
              defaultValue="approved"
              className="cursor-pointer"
            >
              {EXHIBIT_STATUS?.map((value, index) => <option key={index} value={value?.value}>{value?.label}</option>)}
            </Console.FormSelect>
          </div>
        </div>
        <div className="mt-6 relative z-[1]">
          <div className="overflow-hidden mt-2">
            <ListConponent
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
