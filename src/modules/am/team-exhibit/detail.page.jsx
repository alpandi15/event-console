import Layout from "@/src/components/LayoutsEvent"
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { apiShow } from './services/team-exhibit.service'
import { Console } from 'ems-component'
import { useQRCode } from 'next-qrcode'
import { NextSeo } from "next-seo"
import Router from "next/router"

const DetailItrexTeam = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const { query } = useRouter()
  const { Canvas } = useQRCode()

  const fetchData = useCallback(async () => {
    if (!query?.id) return
    setLoading(true)
    const res = await apiShow(query?.id)
    setLoading(false)
    if (!res.success) {
      return
    }
    setData(res?.data)
    return
  }, [query?.id])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-16">
        <NextSeo title="Organizer | Loading..." noindex />
        <div className="w-12 h-12">
          <Console.LoadingIcon icon="oval" color="#1e40af" />
        </div>
      </div>
    )
  }

  return (
    <>
      <NextSeo title={`Team Exhibit | ${data?.first_name ?? ''} ${data?.last_name ?? ''}`} noindex />
      <div className="flex items-center mt-6">
        <h2 className="mr-auto text-2xl font-bold">Detail Team Exhibit</h2>
      </div>
      <div className="grid grid-cols-12 gap-12 mt-4">
        <div className="col-span-12 lg:!col-span-8">
          <div className="p-5 box mt-5">
            <div className="mt-4">
              <div className="text-sm">Company Name</div>
              <div className="font-medium">{data?.company?.company_name ?? '-'}</div>
            </div>
            <div className="mt-4">
              <div className="text-sm">Brand</div>
              <div className="font-medium">{data?.company?.brand_name ?? '-'}</div>
            </div>
            <div className="mt-4">
              <div className="text-sm">Email</div>
              <div className="font-medium">{data?.email ?? '-'}</div>
            </div>
            <div className="mt-4">
              <div className="text-sm">Phone Number</div>
              <div className="font-medium">{data?.phone_number ?? '-'}</div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm">First Name</div>
                <div className="font-medium">{data?.first_name ?? '-'}</div>
              </div>
              <div>
                <div className="text-sm">Last Name</div>
                <div className="font-medium">{data?.last_name ?? '-'}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm">ID Number</div>
              <div className="font-medium">{data?.id_number ?? '-'}</div>
            </div>
            <div className="mt-4">
              <div className="text-sm">ID File</div>
              <div className="w-[400px] h-[200px] border mt-2">
                <Console.Image
                  alt={data?.first_name}
                  src={data?.id_file}
                  className="w-full h-full"
                />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm">Status Event</div>
              <div className="font-medium">Approved</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

DetailItrexTeam.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default DetailItrexTeam