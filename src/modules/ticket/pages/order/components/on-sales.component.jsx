import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import { ModernTable } from 'ems-component'
import order from "../../../services/order";

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const items = [
    {
      label: 'Ticket Name',
      render: (row) => row.name
    },
    {
      label: 'On Sales',
      render: (row) => row.order_count
    }
  ]

  return (
    <div className="overflow-x-auto">
      <ModernTable
        datas={lists}
        items={items}
        metaData={meta}
        isLoading={isLoading}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onChangeLimit={onChangeLimit}
      />
    </div>
  )
}

const OnSales = () => {
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await order.apiGetAll({
      status: 'success',
      per_page: PageSize,
      page: currentPage,
      order_by: 'created_at',
      sort: 'desc'
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
    }).catch((err) => {
      console.log(err)
    })
    setLoading(false)
  }, [PageSize, currentPage])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  return (
    <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
      <div className="relative z-[1]">
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
  )
}
export default OnSales