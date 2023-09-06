import { Console, ModernTable } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';
import getConfig from 'next/config'
import clsx from 'clsx';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const { publicRuntimeConfig } = getConfig()
  const items = [
    {
      label: 'Gate Name',
      render: (row) => row.name
    },
    {
      label: 'Area Name',
      render: (row) => row.area.area_name
    },
    {
      label: 'Ticket Name',
      render: (row) => (
        <div className="whitespace-nowrap">
          {row.tickets && row.tickets.map((v, k) => (
            <div key={k}>
              <div className="font-medium">{v.ticket_name}</div>
              {v.variant != null &&
                <div className="flex items-center text-slate-500">
                  <span className="text-xs bg-emerald-500 rounded py-0.5 px-1.5 text-white mr-1">{v.variant.name}</span>
                </div>
              }
            </div>
          ))}
        </div>
      )
    },
    {
      label: 'URL',
      class: 'block w-44',
      render: (row) => (
        <a href={`${publicRuntimeConfig.APPS_HOST}gate/entrance/${row.url}`} target='_blank' rel="noreferrer" className='hover:text-blue-500 break-all'>
          {`${publicRuntimeConfig.APPS_HOST}gate/entrance/${row.url}`}
        </a>
      )
    },
    {
      label: 'PIN',
      render: (row) => row.pin
    },
    {
      label: 'Max Devices',
      render: (row) => row.max_devices
    },
    {
      label: 'Status',
      render: (row) => (
        <span
          className={
            clsx(
              "text-xs font-medium px-2.5 py-1.5 rounded-md",
              {
                'bg-emerald-400': row?.status === 'active',
                'bg-gray-600 text-white': row?.status === 'inactive'
              })}>
          {row?.status}
        </span>
      ),
    },
    {
      label: 'Open Gate',
      render: (row) => moment(row.open_time).format('HH:mm a')
    },
    {
      label: 'Closed Gate',
      render: (row) => moment(row.close_time).format('HH:mm a')
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <a href={`/check-point/entrance-gate/edit/${row.id}`}>
            <Console.Lucide icon='Edit' className='h-5 w-5' />
          </a>
        </div>
      )
    }
  ]

  return (
    <div className="intro-y transition-all duration-500 group">
      <ModernTable
        datas={lists}
        items={items}
        metaData={meta}
        isLoading={isLoading}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onChangeLimit={onChangeLimit}
      />
    </div>
  )
}

export const Filter = ({ ...props }) => {
  return (
    <div className="mt-2 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
      {props.children}
    </div>
  )
}

export default ListComponent