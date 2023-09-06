import clsx from 'clsx';
import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import { useRef, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import operating from '../../../services/operating';
import { formatIDR } from '@/src/utils/currency';

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
      label: 'Order Time',
      render: (row) => moment(row.order_time).format('DD MMM YYYY, HH:mm a')
    },
    {
      label: 'Participant ID',
      render: (row) => row.participant_id
    },
    {
      label: 'Participant',
      render: (row) => row.customer.full_name
    },
    {
      label: 'Phone Number',
      render: (row) => row.customer.phone_number
    },
    {
      label: 'Qty',
      render: (row) => row.qty
    },
    {
      label: 'Price',
      render: (row) => formatIDR(row.price)
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