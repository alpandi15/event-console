import Layout from "@/src/components/LayoutsEvent"
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { apiShow } from '../services/participants.service'
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
      <NextSeo title={`Participant | ${data?.first_name ?? ''} ${data?.last_name ?? ''}`} noindex />
      <div className="flex items-center mt-6">
        <h2 className="mr-auto text-2xl font-bold">Detail Participant</h2>
      </div>
      <div className="w-full mt-4 space-y-4 box overflow-hidden">
        <div className="flex gap-16 items-center bg-dark p-5">
          <div className="w-40 aspect-square flex items-center border overflow-hidden rounded-xl shadow-md bg-white">
            <Console.Image
              alt={`${data?.first_name ?? ''} ${data?.last_name ?? ''}`}
              src={data?.photo}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-sm text-gray-300">First Name</div>
              <div className="font-medium text-white">{data?.first_name || '-'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-300">Last Name</div>
              <div className="font-medium text-white">{data?.last_name || '-'}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="">
              <div className="text-sm text-gray-300">Email</div>
              <div className="font-medium text-white">{data?.email}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-300">Phone Number</div>
              <div className="font-medium text-white">{data?.phone_number || '-'}</div>
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Business Card</div>
            <div className="w-52 aspect-[16/9] border mt-2">
              <Console.Image
                alt={data?.first_name}
                src="/assets/images/id-card.png"
                className="w-full h-full "
              />
            </div>
          </div>
        </div>
        <div className="p-5 space-y-4">
          <div className="">
            <div className="text-sm text-gray-400">ID Number</div>
            <div className="font-medium">{data?.id_number || '-'}</div>
          </div>
          <div className="">
            <div className="text-sm text-gray-400">ID File</div>
            <div className="w-[400px] h-[200px] border mt-2">
              <Console.Image
                alt={data?.id_file}
                src="/assets/images/id-card.png"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-12 p-5 text-right">
          <Console.Button
            type="button"
            variant="outline-secondary"
            onClick={() => {
              Router.back();
            }}
            className="w-20 mr-2"
          >
            Back
          </Console.Button>
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