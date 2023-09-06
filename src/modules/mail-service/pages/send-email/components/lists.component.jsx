import { ModernTable } from 'ems-component'
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
      label: 'Recipient List Name',
      render: (row) => row.recipient?.name
    },
    {
      label: 'Template Name',
      render: (row) => row.template?.name
    },
    {
      label: 'Delivery Status',
      render: (row) => row.status
    },
    {
      label: 'Number of Request',
      render: (row) => row.number_of_request || '-'
    },
    {
      label: 'Created At',
      render: (row) => moment(row.created_at).format('DD MMM YYYY, HH:mm a')
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