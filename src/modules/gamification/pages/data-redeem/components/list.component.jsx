import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const router = useRouter()
  const eventId = router.query.eventId
  const items = [
    {
      label: 'Gift Name',
      render: (row) => row.redeem_point.name
    },
    {
      label: 'Redeem by',
      render: (row) => row.participant.full_name
    },
    {
      label: 'Email',
      render: (row) => row.participant.email
    },
    {
      label: 'Phone No',
      render: (row) => row.participant.phone_number
    },
    {
      label: 'Redeem at',
      render: (row) => moment(row.created_at).format('DD MMM YYYY HH:mm:ss'),
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