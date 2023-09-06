import { Console } from "ems-component"
import Router, { useRouter } from 'next/router'
import clsx from "clsx"
import moment from "moment"
import { checkLink } from "./list.component"

const Item = ({ data }) => {
  const { asPath } = useRouter()

  return (
    <div className="col-span-12 md:!col-span-6 lg:!col-span-4 xl:!col-span-3 2xl:!col-span-2">
      <div className="border rounded border-slate-200">
        <div className="p-4 text-center lg:!text-left">
          <div className="font-medium text-slate-700">Title Name</div>
          <div className="text-sm text-slate-700">Company Name</div>
          <div className="text-sm text-slate-700">Brand Name</div>
          <div className="mt-2 grid grid-cols-12">
            <div className="col-span-6 flex items-center">
              <div className="text-sm text-slate-700 !line-clamp-2">{data?.category}</div>
            </div>
            <div className="col-span-6 flex items-center justify-end">
              <select
                defaultValue={data?.id % 2 === 1 ? 'active' : 'inactive'}
                className={clsx(
                  "text-xs font-medium pl-2.5 pr-6 py-0.5 rounded dark:bg-gray-700 border cursor-pointer",
                  {
                    "bg-red-100 text-red-800 border-red-400 dark:text-red-400": data?.id % 2 === 0,
                    "bg-green-100 text-green-800 border-green-400 dark:text-green-400": data?.id % 2 === 1,
                  }
                )}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="mt-2">
            <div className="text-[12px] text-slate-700">{moment().format('MM/DD/YYYY HH:mm')}</div>
          </div>
        </div>
        <div className="flex items-center justify-between p-2 border-t border-slate-200/60 dark:border-darkmode-400">
          <div>
            <Console.Button
              type="button"
              size="sm"
              className="mr-2"
              onClick={() => Router.push(`${asPath}/report-download/${data?.id}`)}
            >
              Download
            </Console.Button>
            <Console.Button
              type="button"
              size="sm"
              onClick={() => Router.push(`${asPath}/report-view/${data?.id}`)}
            >
              View
            </Console.Button>
          </div>
          <div className="">
            <Console.Button
              type="button"
              size="sm"
              variant="soft-dark"
              onClick={() => Router.push(`${asPath}/${checkLink(data?.category_id)}/${data?.id}`)}
            >
              <Console.Lucide icon="Edit" className="w-4 h-4" />
            </Console.Button>
          </div>
        </div>
      </div>
    </div>
  )
}


const CardComponent = ({ lists = [] }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-5">
        {
          lists?.map((data, key) => {
            return <Item data={data} key={key} />
          })
        }
      </div>
    </>
  )
}

export default CardComponent