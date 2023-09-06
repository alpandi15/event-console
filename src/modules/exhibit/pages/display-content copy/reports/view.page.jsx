import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import Pagination from "@/src/components/Pagination"
import { useSessionContext } from "@/src/stores/sessionContext"
import { NextSeo } from 'next-seo'
import ReactSelect from '@/src/components/Base/ReactSelect'
import DateInput from '@/src/components/Base/FilterDate/DateInput'
import ListComponent from './components/list.component'
import { useRouter } from "next/router";

let PageSize = 3

const FakeList = [
  { id: 0, name: 'Team Member', category_id: 1, category: 'Document', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 1, name: 'Team Member', category_id: 2, category: 'Accordion', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 2, name: 'Team Member', category_id: 3, category: 'Hyperlink', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 3, name: 'Team Member', category_id: 4, category: 'Text Editor', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 4, name: 'Team Member', category_id: 1, category: 'Document', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
]

const ListPage = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })
  const [queryString, setQueryString] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const { session: { user } } = useSessionContext()
  const { asPath } = useRouter()

  const fetchAll = useCallback(async () => {
    // const res = await apiGetAll({
    //   search: queryString,
    //   per_page: PageSize,
    //   page: currentPage,
    //   ...filterData
    // })
    // if (res?.success) {
    //   setLists(res?.data)
    //   setTotalData(res?.meta?.total)
    //   setCurrentPage(res?.meta?.current_page)
    // }
  }, [])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  return (
    <>
      <NextSeo title="Display Content | Report Views" noindex />
      <h2 className="mt-6 text-2xl font-medium">Report View</h2>
      <h2 className="mt-2 text-md font-medium">Title Name</h2>
      <div className="p-4 mt-4 box">
        <div className="relative z-[1]">
          {/* <div className="text-sm text-slate-700 font-medium intro-x">Total Data: 100</div> */}
          <div className="mt-2">
            <ListComponent lists={FakeList} />
          </div>
        </div>
        {/* BEGIN: Pagination */}
        <div className="mt-8">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalData}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        {/* END: Pagination */}
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
