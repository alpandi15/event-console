import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import FormComponent from './components/form.component'
import area from "../../services/area";

const ListPage = () => {
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

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await area.apiGetAll({
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

  return (
    <>
      <NextSeo title="Stage | Area | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Stage Area</h2>
      <div className="py-4 mt-4">
        <div className="box py-4 px-8">
          <FormComponent onRefresh={fetchAll} />
        </div>
        <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
          <div className="mt-4 relative z-[1]">
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
