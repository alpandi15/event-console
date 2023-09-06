import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { apiGetAll } from './member.service'
import Router, { useRouter } from 'next/router'
import Pagination from "@/src/components/Pagination"
import { useSessionContext } from "@/src/stores/sessionContext"
import { NextSeo } from 'next-seo'
import CardComponent from './components/card.component'
import ReactSelectAsync from '@/src/components/Base/ReactSelect/Async'
// import { fetchEvent } from './member.service'


const ItrexTeam = () => {
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })
  const [queryString, setQueryString] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const [PageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAll = useCallback(async () => {
    const res = await apiGetAll({
      search: queryString,
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
  }, [])

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
      <NextSeo title="Team Member | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Team Member</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/invite`)}
        >
          Invite Team Member
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
        </div>
        <div className="mt-6 relative z-[1]">
          <div className="overflow-hidden mt-2">
            <CardComponent lists={lists} onRefresh={fetchAll} />
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
