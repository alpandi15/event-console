import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console, Toastify } from 'ems-component'
import { NextSeo } from 'next-seo'
import Link from "next/link";
import moment from "moment";
import schedule from "../../services/schedule";

const ListPage = () => {
  const [dates, setDates] = useState([])
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState('')

  const getFilters = async () => {
    await schedule.getFilters().then((res) => {
      setDates(res.dates)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    getFilters()
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)

    await schedule.getAll({
      date: selectedDate || undefined
    }).then((res) => {
      setLists(res.data)
    }).catch((err) => {
      console.log(err)
    })
    setLoading(false)
  }, [selectedDate])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  const checkCurrentDate = (v) => {
    const selected = moment(selectedDate).format('DD MMM YYYY')
    const current = moment(v).format('DD MMM YYYY')
    if (selected == current) {
      return true
    } else {
      return false
    }
  }

  const setHighlight = async (e, id) => {
    await schedule.setHighlight(id, { value: e.target.checked }).then((res) => {
      Toastify({
        text: e.target.checked ? "The schedule has been set to landing page highlight" : "The schedule has been unset from landing page highlight",
        type: 'success'
      });
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }

  return (
    <>
      <NextSeo title="Schedules | List" noindex />
      <div className="mt-8 flex justify-between items-center">
        <div>
          <h2 className="mr-auto text-2xl font-medium">Schedules</h2>
          <span>Select and check which schedules that you want to highlight in Landing Page. <br />
            The full schedules will appear on schedules page</span>
        </div>
        <Console.Button as={Link} href="#" variant="dark" className="text-sm">
          <Console.Lucide icon="Eye" className="w-4 h-4 mr-1" />
          Preview Page
        </Console.Button>
      </div>
      <div className="mt-8 flex gap-2">
        {dates?.map((v, k) => {
          return (
            <div key={k}>
              <Console.Button className="text-sm" variant={checkCurrentDate(v) ? "primary" : "secondary"} onClick={() => setSelectedDate(v)}>{moment(v).format('DD MMM YYYY')}</Console.Button>
            </div>
          )
        })}
      </div>
      {loading ? (
        <div className="mt-8 space-y-4 animate-pulse">
          <div className="w-full h-64 rounded bg-gray-200"></div>
          <div className="w-full h-64 rounded bg-gray-200"></div>
          <div className="w-full h-64 rounded bg-gray-200"></div>
          <div className="w-full h-64 rounded bg-gray-200"></div>
          <div className="w-full h-64 rounded bg-gray-200"></div>
        </div>
      ) : (
        <div className="mt-2">
          {lists?.speakers?.map((v, k) => {
            return (
              <div key={k} className="border px-4 pt-2 pb-4 w-full mb-4 bg-white rounded">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center text-sm">
                    <div>{`Date: ${moment(v?.date).format('DD MMM YYYY')}`}</div>
                    <div className="ml-2 text-green-500">{v?.room_name} {moment(v.start_time).format('HH:mm')} - {moment(v.end_time).format('HH:mm')} GMT+7</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input type="checkbox" id={`setHl_${k}`} className="focus:!outline-none focus:!ring-0 focus:!shadow-none focus:!border-none" checked={v.on_highlight} onChange={(e) => setHighlight(e, v.schedules_id)} />
                    <label for={`setHl_${k}`} className="cursor-pointer text-sm hover:underline">Highlight to landing page</label>
                  </div>
                </div>
                <div className="mt-4 flex gap-8">
                  <div className="w-1/5 aspect-square rounded-lg overflow-hidden">
                    <Console.Image
                      key={v?.speaker.photo}
                      alt="artist"
                      src={v?.speaker.photo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-4/5">
                    <h1 className="font-semibold text-2xl">{v?.title}</h1>
                    <h3>by <b>{v?.speaker.name}</b> | {v.speaker.job_title}</h3>
                    <p className="text-sm mt-2">
                      {v.speaker.profile}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

ListPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListPage
