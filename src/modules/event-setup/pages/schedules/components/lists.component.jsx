import { Console } from "ems-component";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";

const Item = ({ data }) => {
  const { asPath } = useRouter()

  return (
    <Console.Table.Tr key={data?.id} className="intro-x">
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="text-slate-700 font-medium whitespace-nowrap uppercase">
          {data?.id + 1}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          Title
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="whitespace-nowrap">
          {moment().format('MMM DD,YYYY')}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700 w-96">
        <div className="whitespace-nowrap">
          {moment().format('HH:mm A')}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700 w-96">
        <div className="whitespace-nowrap">
          {moment().format('HH:mm A')}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700 w-96">
        <div className="whitespace-nowrap text-center">
          2:30
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700 w-96">
        <div className="whitespace-nowrap">
          Dewa 19
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700 w-96">
        <div className="whitespace-nowrap">
          1
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700 w-96">
        <div className="whitespace-nowrap">
          <Console.Button variant="outline-dark" size="sm">
            Highlight to Home
          </Console.Button>
        </div>
      </Console.Table.Td>
    </Console.Table.Tr>
  )
}

const ListConponent = ({ lists = [] }) => {
  return (
    <div className="overflow-x-auto">
      <Console.Table striped>
        <Console.Table.Thead>
          <Console.Table.Tr>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              #
            </Console.Table.Th>
            <Console.Table.Th className="!border-b w-80 border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Title
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Date
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Time Start
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Time End
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Duration
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Artist/Speakers
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Session
            </Console.Table.Th>
            <Console.Table.Th className="!border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
              Action
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