import { Console, ModernTable, Toastify } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';
import templates from '../../../services/templates';
import { useRef, useState } from 'react';

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
      label: 'Created At',
      render: (row) => moment(row.created_at).format('DD MMM YYYY, HH:mm a')
    },
    {
      label: 'Total',
      render: (row) => row.total
    },
    {
      label: 'Success',
      render: (row) => row.success
    },
    {
      label: 'Failed',
      render: (row) => row.failed
    },
    {
      label: 'Invalid Address',
      render: (row) => row.invalidAddress
    },
    {
      label: 'Success Rate',
      render: (row) => row.success_rate
    },
    {
      label: 'Invalid Rate',
      render: (row) => row.invalid_rate
    },
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