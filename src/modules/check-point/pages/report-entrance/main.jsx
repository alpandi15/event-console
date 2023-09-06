import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import report from "../../services/report";
import { useForm } from "react-hook-form";
import ReactSelectAsync from "@/src/components/Form/ReactSelect/Async";
import FilterDate from "@/src/components/Base/FilterDate";
import moment from "moment";
import { saveAs } from 'file-saver';

const ListPage = () => {
  const [errorArea, setErrorArea] = useState(false)
  const [errorDate, setErrorDate] = useState(false)
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [PageSize, setPageSize] = useState(20)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })

  const { register, control, watch } = useForm()
  const { search, area_name, ticket_name } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await report.getEntrances({
      search: search || undefined,
      areas_id: area_name?.value || undefined,
      tickets_id: ticket_name?.value || undefined,
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
  }, [PageSize, currentPage, filterData, search, area_name, ticket_name])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const fetchArea = async (e) => {
    const areas = []
    await report.findArea({ search: e }).then((res) => {
      res.data.map((v) => {
        areas.push({
          value: v.id,
          label: v.area_name
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    return areas
  }

  const fetchTicket = async (e) => {
    const tickets = []
    await report.findTicket({ search: e }).then((res) => {
      res.data.map((v) => {
        tickets.push({
          value: v.product.id,
          label: v.product.detail_product.name
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    return tickets
  }

  const filterDate = (values) => {
    const { startDate, endDate } = values

    if (startDate && endDate) {
      setFilterData({
        ...filterData,
        start_date: moment(startDate).format('YYYY-MM-DD'),
        end_date: moment(endDate).format('YYYY-MM-DD')
      })
      if (errorDate) setErrorDate(false)
    }

    if (!startDate && !endDate) {
      setFilterData({
        ...filterData,
        start_date: undefined,
        end_date: undefined
      })
    }
  }

  const exportReport = async () => {
    if (area_name == undefined) {
      setErrorArea(true)
    }
    if (filterData.start_date == undefined || filterData.end_date == undefined) {
      setErrorDate(true)
    }

    if (area_name != undefined && filterData.start_date != undefined && filterData.end_date != undefined) {
      const params = {
        areas_id: area_name.value,
        start_date: filterData.start_date,
        end_date: filterData.end_date
      }

      const out = [];

      Object.keys(params).map((v) => {
        out.push(v + '=' + params[v])
      })

      const parameter = out.join('&')

      const link = document.createElement("a");
      link.href = `${report.exportEntance()}&${parameter}`
      link.click();
    }
  }

  useEffect(() => {
    if (area_name != undefined) {
      if (errorArea) setErrorArea(false)
    }
  }, [area_name])
  return (
    <>
      <NextSeo title="Check Point | Report Entrance Gate | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Report Entrance Gate</h2>
      <div className="mt-8 flex items-center justify-end">
        <Console.Button
          type="button"
          onClick={exportReport}
          className="w-fit mr-2 !bg-emerald-700 text-white hover:!bg-emerald-900">
          <span className="flex items-center justify-center px-4 gap-2">
            <Console.Lucide icon="FileX2" className="w-4 h-4" />
            Export
          </span>
        </Console.Button>
      </div>
      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
        <div className="flex items-start justify-end intro-y gap-4">
          <div className="relative w-56 text-slate-500">
            <Console.FormInput
              type="text"
              className="w-56 pr-10"
              placeholder="Search..."
              {...register('search')}
            />
            <Console.Lucide
              icon="Search"
              className="absolute inset-y-0 top-0 bottom-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </div>
          <div className="ml-2 w-40">
            <ReactSelectAsync
              id="area_name"
              name="area_name"
              control={control}
              placeholder="Area Name"
              defaultOptions={true}
              isClearable={true}
              loadOption={fetchArea}
              errorMessage={errorArea ? 'Please select area first!' : undefined}
            />
          </div>
          <div className="ml-2 w-40">
            <ReactSelectAsync
              id="ticket_name"
              name="ticket_name"
              control={control}
              placeholder="Ticket Name"
              defaultOptions={true}
              isClearable={true}
              loadOption={fetchTicket}
            />
          </div>
          <div className="ml-2">
            <FilterDate showTimeSelect={false} onChange={(e) => filterDate(e)} />
            {errorDate &&
              <div className="mt-2 text-danger text-sm">
                Please fill date range!
              </div>
            }
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
