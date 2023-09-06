import { Console } from "ems-component"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import va from "../../../services/virtual_account"

const FormSwitch = Console.FormSwitch

const ItemCard = ({ data }) => {
  const changeSwitch = async (e, id) => {
    await va.apiUpdateStatus(id, { status: e.target.checked }).then((res) => {

    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="bg-white border shadow px-4 py-2 flex items-center justify-between rounded-xl">
      <div className="flex gap-4 items-center">
        <Console.Image
          key={data?.logo_url}
          src={data?.logo_url}
          alt={data?.name}
          className="h-20 object-cover"
        />
        <div className="text-slate-700 truncate pr-4">{data?.name}</div>
      </div>
      <div>
        <FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
          <FormSwitch.Input
            id="id"
            className=""
            type="checkbox"
            onChange={(e) => { changeSwitch(e, data.id) }}
            defaultChecked={data.status}
          />
        </FormSwitch>
      </div>
    </div>
  )
}

const ItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
      <div className="h-20 animate-pulse rounded-xl shadow bg-gray-200">
      </div>
    </div>
  )
}

const CardComponent = ({ lists = [], isLoading }) => {
  return (
    isLoading ? (
      <ItemSkeleton />
    ) : (
      <div className="flex flex-col gap-2">
        {lists && lists?.map((data, index) => <ItemCard key={index} data={data} />)}
      </div>
    )
  )
}

export default CardComponent
