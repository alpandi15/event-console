import { Console } from "ems-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { EXHIBIT_STATUS } from '@/src/constant/status'
import moment from "moment";
import clsx from "clsx";

const checkLink = (category_id) => {
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
          Brand Name
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          File Name
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          itrek@gmail.com
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Putra
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Suhardi
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          21
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          {moment().format('MM/DD/YYYY HH:mm')}
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
              Brand Name
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              File Name
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Participant Email
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              First Name
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Last Name
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              View
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Last Time
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