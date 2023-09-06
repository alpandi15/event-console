import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import ListComponent from './components/lists.component'
import templates from "../../services/templates";

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
    await templates.apiGetAll({
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
      <NextSeo title="Mail Service | Email Templates | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Email Templates</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/create`)}
        >
          Add New
        </Console.Button>
      </div>
      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
        <div className="mt-2 relative z-[1]">
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
