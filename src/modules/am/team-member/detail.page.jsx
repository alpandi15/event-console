import { Console } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import Route, { useRouter } from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import { createValidation } from './validation'
import { NextSeo } from 'next-seo'
import FormComponent from './components/form.component'
import { apiDetail, fetchUsers } from './member.service'
import { useEffect, useState } from 'react'
import { apiGetEventRoles } from '@/src/services/role.service'

const UpdateMemberOrganizer = () => {
  const router = useRouter()
  const [data, setData] = useState()

  const fetchDetail = async () => {
    await apiDetail(router.query.id).then(async (res) => {
      setData(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  return (
    <div>
      <NextSeo title="Team Member | Detail" noindex />
      <div className="flex items-center mt-8">
        <h2 className="mr-auto text-2xl font-medium">Detail Team Member</h2>
      </div>
      <div className="w-full mt-4 space-y-4 box overflow-hidden">
        <div className="flex gap-16 items-center bg-dark p-5">
          <div className="w-40 aspect-square flex items-center border rounded-xl shadow-md bg-white">
            {data?.photo ?
              <img
                alt={data?.full_name}
                className="w-full"
                src={data?.photo}
              /> :
              <Console.Image
                alt={data?.full_name}
                src={data?.photo}
                className="w-full"
              />
            }
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
        </div>
        <div className="grid grid-cols-3 p-5 gap-4">
          <div className="">
            <div className="text-sm text-gray-400">User Event Access Status</div>
            <div className="font-medium capitalize">{data?.event_access?.user_status || '-'}</div>
          </div>
          <div className="">
            <div className="text-sm text-gray-400">User Role Event</div>
            <div className="font-medium capitalize">{data?.event_access?.role?.name}</div>
          </div>
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
              router.back();
            }}
            className="w-20 mr-2"
          >
            Back
          </Console.Button>
        </div>
      </div>
    </div>
  )
}

UpdateMemberOrganizer.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default UpdateMemberOrganizer
