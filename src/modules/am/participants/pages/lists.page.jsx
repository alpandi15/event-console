import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { apiGetAll } from '../services/participants.service'
import Pagination from "@/src/components/Pagination";
import { useSessionContext } from "@/src/stores/sessionContext";
import { NextSeo } from 'next-seo'
import ListComponent from '../components/lists.component'
import { numberFormatIDR } from '@/src/utils/currency'
import { PARTICIPANT_STATUS } from '@/src/constant/status'
import axios from "axios"
import { TOKEN } from "@/src/constant";
import FileDownload from "js-file-download";
import { request } from '@/src/utils/request'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const ListParticipant = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const deleteButtonRef = useRef(null);
  const [meta, setMetas] = useState([])
  const [lists, setLists] = useState([])
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
  const [totalTicket, setTotalTicket] = useState(0)

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
      setTotalTicket(res?.totalTicket)
    }
  }, [PageSize, currentPage, filterData, queryString])

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

  const onExportData = async () => {
    const COOKIE = sessionStorage.getItem(TOKEN)
    const config = { responseType: 'blob' };
    const headers = {
      Authorization: `Bearer ${COOKIE}`
    }

    const blobUrl = `${publicRuntimeConfig.API_HOST_EVENT}/console/participant-event`
    await axios.post(blobUrl, null, { ...config, headers }).then(response => {
      FileDownload(response?.data, 'participants.xls')
    });
  }
  return (
    <>
      <NextSeo title="Participant | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Participants</h2>
      <div className="mt-8 flex items-center justify-end">
        <Console.Button
          type="button"
          onClick={onExportData}
          className="w-fit mr-2 !bg-emerald-700 text-white hover:!bg-emerald-900">
          <span className="flex items-center justify-center px-4 gap-2">
            <Console.Lucide icon="FileX2" className="w-4 h-4" />
            Export
          </span>
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
          <div>
            <Console.FormSelect className="ml-2 cursor-pointer" onChange={(e) => filterStatus(e?.target.value)}>
              <option value="">All</option>
              {PARTICIPANT_STATUS?.map((value, index) => <option key={index} value={value?.value}>{value?.title}</option>)}
            </Console.FormSelect>
          </div>
        </div>
        <div className="mt-6 relative z-[1]">
          <div className="overflow-hidden mt-2">
            <div className="text-sm text-end text-slate-700 font-medium intro-x">Total Data Participants: <b>{totalData}</b></div>
            <div className="text-sm text-end text-slate-700 font-medium intro-x">Total Data Ticket: <b>{numberFormatIDR(totalTicket)}</b></div>
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

ListParticipant.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListParticipant
