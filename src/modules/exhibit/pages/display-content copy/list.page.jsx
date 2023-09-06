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
import CardComponent from './components/card.component'
import { useRouter } from "next/router";
import { SwitchGridList } from '@/src/components/Base'

let PageSize = 3

const FakeList = [
  { id: 0, name: 'Team Member', category_id: 1, category: 'Document', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 1, name: 'Team Member', category_id: 2, category: 'Accordion', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 2, name: 'Team Member', category_id: 3, category: 'Hyperlink', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 3, name: 'Team Member', category_id: 4, category: 'Text Editor', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 4, name: 'Team Member', category_id: 1, category: 'Document', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
]

const ListPage = () => {
  const [viewType, setViewType] = useState(0) // 0:list; 1:grid;
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
      <NextSeo title="Exhibit | Display Content" noindex />
      <h2 className="mt-6 text-2xl font-medium">Display Content</h2>
      <div className="flex items-center justify-end">
        <div className="">
          <Console.HeadlessMenu>
            <Console.HeadlessMenu.Button as={Console.Button} variant="primary">
              <Console.Lucide icon="Plus" className="w-5 h-5 mr-2" />
              Create New
            </Console.HeadlessMenu.Button>
            <Console.HeadlessMenu.Items className="w-56">
              <Console.HeadlessMenu.Item href={`${asPath}/document/create`}>
                <Console.Lucide icon="Files" className="w-4 h-4 mr-2" />
                New Document
              </Console.HeadlessMenu.Item>
              <Console.HeadlessMenu.Item href={`${asPath}/editor/create`}>
                <Console.Lucide icon="FileText" className="w-4 h-4 mr-2" />
                New Text Editor
              </Console.HeadlessMenu.Item>
              <Console.HeadlessMenu.Item href={`${asPath}/hyperlink/create`}>
                <Console.Lucide icon="Link" className="w-4 h-4 mr-2" />
                New Hyperlink
              </Console.HeadlessMenu.Item>
              <Console.HeadlessMenu.Item href={`${asPath}/accordion/create`}>
                <Console.Lucide icon="LayoutList" className="w-4 h-4 mr-2" />
                New Accordion
              </Console.HeadlessMenu.Item>
            </Console.HeadlessMenu.Items>
          </Console.HeadlessMenu>
        </div>
      </div>
      <div className="p-4 mt-4 box">
        <div className="mt-2 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
          <div className="flex flex-wrap items-center col-span-12 xl:flex-nowrap">
            <div className="flex w-full sm:w-auto">
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
              <div className="ml-2 w-32">
                <ReactSelect
                  placeholder="Category"
                  options={[]}
                  isSearchable={false}
                  className="cursor-pointer"
                />
              </div>
              <div className="ml-2 w-28">
                <ReactSelect
                  placeholder="Status"
                  options={[]}
                  isSearchable={false}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="">
              <SwitchGridList defaultIndex={viewType} onChange={(index) => setViewType(index)} />
            </div>
          </div>
        </div>
        <div className="relative z-[1]">
          <div className="text-sm text-slate-700 font-medium intro-x">Total Data: 100</div>
          <div className="mt-2">
            {viewType === 0 ? (
              <div>
                <ListComponent lists={FakeList} />
              </div>
            ) : null}
            {viewType === 1 ? (
              <CardComponent lists={FakeList} />
            ) : null}
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
