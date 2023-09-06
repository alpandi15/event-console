import { Console, ModernTable } from "ems-component";
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
          Andra
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          andra@gmail.com
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          081256543211
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Male
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          1992-02-28
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="flex items-center justify-center">
          <div>
            <button>
              <Console.Lucide icon="Trash2" className="w-4 h-4 text-danger" />
            </button>
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
              Name
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Email
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Phone Number
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Gender
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !p-2">
              Birthday
            </Console.Table.Th>
            <Console.Table.Th className="text-center !border-b border-slate-200/60 whitespace-nowrap !p-2">
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