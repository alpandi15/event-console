import { Console } from "ems-component";
import Link from "next/link";
import { useRouter } from "next/router";
import { EXHIBIT_STATUS } from '@/src/constant/status'
import moment from "moment";
import { useState } from "react";

const Item = ({ data, number }) => {
  const [expand, setExpand] = useState(false)
  const { asPath } = useRouter()

  return (
    <>
      <Console.Table.Tr key={data?.id} className="intro-x">
        <Console.Table.Td className="!p-2">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setExpand(!expand)}
          >
            {expand ? (
              <Console.Lucide icon="Minus" className="w-4 h-4 text-slate-700" />
            ) : (
              <Console.Lucide icon="Plus" className="w-4 h-4 text-slate-700" />
            )}
          </div>
        </Console.Table.Td>
        <Console.Table.Td className="!p-2 text-slate-700">
          <div className="flex items-center whitespace-nowrap font-medium">
            {data?.title}
          </div>
        </Console.Table.Td>
        <Console.Table.Td className="!p-2">
          <div className="flex items-center justify-center">
            <div>
              <Link
                href={`${asPath}/edit/${data?.id}`}
                className="flex items-center mr-3 text-dark"
              >
                <Console.Lucide icon="Edit" className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Console.Table.Td>
      </Console.Table.Tr>
      {expand && (
        <Console.Table.Tr>
          <Console.Table.Td className="!p-2" colSpan={3}>
            <div className="px-4 text-slate-700 text-sm">
              {data?.description}
            </div>
          </Console.Table.Td>
        </Console.Table.Tr>
      )}
    </>
  )
}

const ListComponent = ({ lists = [] }) => {
  return (
    <div className="overflow-x-auto">
      <Console.Table className="border boder-slate-200">
        <Console.Table.Thead className="bg-slate-100">
          <Console.Table.Tr>
            <Console.Table.Th className="text-slate-700 text-center !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4 w-[50px]">
              #
            </Console.Table.Th>
            <Console.Table.Th className="text-slate-700 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Title
            </Console.Table.Th>
            {/* <Console.Table.Th className="text-slate-700 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4 w-96">
              Description
            </Console.Table.Th> */}
            <Console.Table.Th className="text-center text-slate-700 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Actions
            </Console.Table.Th>
          </Console.Table.Tr>
        </Console.Table.Thead>
        <Console.Table.Tbody>
          {lists?.map((data, index) => <Item data={data} key={index} number={index + 1} />)}
        </Console.Table.Tbody>
      </Console.Table>
    </div>
  )
}

export default ListComponent