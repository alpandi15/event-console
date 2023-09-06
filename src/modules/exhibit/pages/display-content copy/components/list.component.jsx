import { Console } from "ems-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { EXHIBIT_STATUS } from '@/src/constant/status'
import moment from "moment";
import clsx from "clsx";

export const checkLink = (category_id) => {
  if (category_id == 1) return 'document/edit'
  if (category_id == 4) return 'editor/edit'
  if (category_id == 3) return 'hyperlink/edit'
  if (category_id == 2) return 'accordion/edit'
  return 'edit'
}

const Item = ({ data }) => {
  const { asPath } = useRouter()

  return (
    <Console.Table.Tr key={data?.id} className="intro-x">
      <Console.Table.Td className="!p-2 text-slate-700 !px-4 !py-2">
        <div className="text-slate-700 font-medium whitespace-nowrap uppercase">
          {data?.id + 1}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Company Name
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Brand Name
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Title
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          {data?.category}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          {/* {data?.id % 2 === 0 ? (
            <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Active</span>

          ) : (
            <>
              <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Inactive</span>
            </>
          )} */}
          <div className="">
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
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Admin
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Admin
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          {moment().format('MM/DD/YYYY HH:mm')}
        </div>
      </Console.Table.Td>
      {/* <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          21
        </div>
      </Console.Table.Td> */}
      {/* <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          <a href="#">
            <span className="text-sm underline text-primary">Download</span>
          </a>
        </div>
      </Console.Table.Td> */}
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="flex items-center justify-center">
          <div>
            <Link
              href={`${asPath}/report-download/${data?.id}`}
              className="flex items-center mr-3 text-primary text-xs"
            >
              {/* <Console.Lucide icon="DownloadCloud" className="w-5 h-5" /> */}
              Download
            </Link>
          </div>
          <div>
            <Link
              href={`${asPath}/report-view/${data?.id}`}
              className="flex items-center mr-3 text-primary text-xs"
            >
              {/* <Console.Lucide icon="Eye" className="w-5 h-5" /> */}
              View
            </Link>
          </div>
          <div>
            <Link
              href={`${asPath}/${checkLink(data?.category_id)}/${data?.id}`}
              className="flex items-center mr-3 text-dark"
            >
              <Console.Lucide icon="Edit" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Console.Table.Td>
    </Console.Table.Tr>
  )
}

const ListConponent = ({ lists = [] }) => {
  return (
    <div className="overflow-x-auto">
      <Console.Table className="border boder-slate-200">
        <Console.Table.Thead variant="light">
          <Console.Table.Tr>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-4 !py-2">
              #
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Company
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Brand Name
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Title
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Category
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Status
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Created By
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Update By
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Time
            </Console.Table.Th>
            {/* <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              View
            </Console.Table.Th> */}
            {/* <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Downoload
            </Console.Table.Th> */}
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Actions
            </Console.Table.Th>
          </Console.Table.Tr>
        </Console.Table.Thead>
        <Console.Table.Tbody>
          {lists?.map((data, index) => <Item data={data} key={index} />)}
        </Console.Table.Tbody>
      </Console.Table>
    </div>
  )
}

export default ListConponent