import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import send from "../../services/send";
import FilterDate from "@/src/components/Base/FilterDate";
import moment from "moment";

const ListPage = () => {
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
    await send.getReports({
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
  }, [PageSize, currentPage, filterData])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const filterDate = (values) => {
    const { startDate, endDate } = values

    if (startDate && endDate) {
      setFilterData({
        ...filterData,
        start_date: moment(startDate).toISOString(),
        end_date: moment(endDate).toISOString()
      })
    }

    if (!startDate && !endDate) {
      setFilterData({
        ...filterData,
        start_date: undefined,
        end_date: undefined
      })
    }
  }

  return (
    <>
      <NextSeo title="Mail Service | Delivery Report" noindex />
      <h2 className="mt-6 text-2xl font-medium">Delivery Report</h2>
      <div className="py-4 mt-12 px-6 shadow border rounded-lg bg-white">
        <div className="flex items-center justify-end intro-y gap-4">
          <div className="flex items-center">
            <FilterDate showTimeSelect={false} onChange={(e) => filterDate(e)} />
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
