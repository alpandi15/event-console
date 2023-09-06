import Layout from "@/src/components/LayoutsEvent"
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Console } from 'ems-component'
import { NextSeo } from "next-seo"
import Router from "next/router"
import { apiGetDetail } from "../sarvices/member.service"

const DetailItrexTeam = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { query, asPath } = useRouter()

  const fetchData = async () => {
    if (!query?.exhibitId) return
    setLoading(true)
    await apiGetDetail(query?.exhibitId).then((res) => {
      setData(res?.data)
    }).catch((err) => {
      console.log(err)
    })
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <NextSeo title={`Exhibit | ${data?.first_name || ''} ${data?.last_name || ''}`} noindex />
      <div className="flex items-center mt-6">
        <h2 className="mr-auto text-2xl font-bold">Detail Exhibit</h2>
      </div>
      <div className="w-full mt-4 space-y-4 box overflow-hidden">
        <div className="flex gap-16 items-center bg-dark p-5">
          <div className="w-40 aspect-square flex items-center border rounded-xl shadow-md bg-white">
            {data?.company?.logo ?
              <img
                alt="image"
                className="w-full"
                src={data?.company?.logo}
              /> :
              <Console.Image
                alt={data?.company?.company_name}
                src={data?.company?.logo}
                className="w-full"
              />
            }
          </div>
          <div className="space-y-2">
            <div className="">
              <div className="text-sm text-gray-300">Company Name</div>
              <div className="font-medium text-white">{data?.company?.company_name}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-300">Brand</div>
              <div className="font-medium text-white">{data?.company?.brand_name}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="">
              <div className="text-sm text-gray-300">CEO Name</div>
              <div className="font-medium text-white">{data?.company?.ceo_name || '-'}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-300">PIC Name</div>
              <div className="font-medium text-white">{data?.company?.pic_name || '-'}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 p-5 gap-4">
          <div>
            <div className="text-sm text-gray-400">First Name</div>
            <div className="font-medium">{data?.first_name || '-'}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Last Name</div>
            <div className="font-medium">{data?.last_name || '-'}</div>
          </div>
          <div className="">
            <div className="text-sm text-gray-400">Gender</div>
            <div className="font-medium">{data?.gender || '-'}</div>
          </div>
          <div className="">
            <div className="text-sm text-gray-400">Email</div>
            <div className="font-medium">{data?.email}</div>
          </div>
          <div className="">
            <div className="text-sm text-gray-400">Phone Number</div>
            <div className="font-medium">{data?.phone_number || '-'}</div>
          </div>
          <div className="">
            <div className="text-sm text-gray-400">ID Number</div>
            <div className="font-medium">{data?.id_number || '-'}</div>
          </div>
          <div className="">
            <div className="text-sm text-gray-400">User Event Access</div>
            <div className="font-medium capitalize">{data?.event_access?.user_status || '-'}</div>
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
        <hr></hr>
        <div className="space-y-4 p-5">
          <div>
            <h2 className="font-bold">Company Detail Information</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="">
                <div className="text-sm text-gray-400">Address 1</div>
                <div className="font-medium">{data?.company?.address_1 || '-'}</div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">Address 2</div>
                <div className="font-medium">{data?.company?.address_2 || '-'}</div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">Country</div>
                <div className="font-medium">{data?.company?.country.name || '-'}</div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">Province</div>
                <div className="font-medium">{data?.company?.province.name || '-'}</div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">City</div>
                <div className="font-medium">{data?.company?.city.name || '-'}</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="">
                <div className="text-sm text-gray-400">Office Phone Number</div>
                <div className="font-medium">{data?.company?.phone_number || '-'}</div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">Web Site</div>
                <div>
                  <a href={data?.company?.website} target="__blank" className="font-medium underline text-blue-500">
                    {data?.company?.website || '-'}
                  </a>
                </div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">NIB Number</div>
                <div className="font-medium">{data?.company?.nib || '-'}</div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">Tax No</div>
                <div className="font-medium">{data?.company?.tax_number || '-'}</div>
              </div>
              <div className="">
                <div className="text-sm text-gray-400">Billing Email</div>
                <div className="font-medium">{data?.company?.billing_email || '-'}</div>
              </div>

            </div>
          </div>
          <div className="space-y-4 !mt-8 grid grid-cols-3">
            <div className="">
              <div className="text-sm text-gray-400">Data 1</div>
              <div className="font-medium">{data?.company?.data_a || '-'}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-400">Data 2</div>
              <div className="font-medium">{data?.company?.data_b || '-'}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-400">Data 3</div>
              <div className="font-medium">{data?.company?.data_c || '-'}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-400">Data 4</div>
              <div className="font-medium">{data?.company?.data_d || '-'}</div>
            </div>
            <div className="">
              <div className="text-sm text-gray-400">Data 5</div>
              <div className="font-medium">{data?.company?.data_e || '-'}</div>
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