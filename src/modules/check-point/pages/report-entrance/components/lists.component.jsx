import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const items = [
    {
      label: 'Area Name',
      render: (row) => row.area_name
    },
    {
      label: 'Ticket Name',
      render: (row) => row.ticket_name
    },
    {
      label: 'Photo',
      render: (row) => (
        <div className="w-9 h-9 image-fit zoom-in">
          <Console.Image
            key={row?.id}
            src={row?.photo}
            alt={row?.full_name}
            className="border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
          />
        </div>
      )
    },
    {
      label: 'First Name',
      render: (row) => row.first_name
    },
    {
      label: 'Last Name',
      render: (row) => row.last_name
    },
    {
      label: 'Email',
      render: (row) => row.email
    },
    {
      label: 'Phone Number',
      render: (row) => row.phone_number
    },
    {
      label: 'Check In Time',
      render: (row) => moment(row.check_in_time).format('DD MMM YYYY, HH:mm:ss')
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