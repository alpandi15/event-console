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
  const items = [
    {
      label: 'Badges Name',
      render: (row) => row.name
    },
    {
      label: 'Image',
      render: (row) => (
        <div className='w-20'>
          <img src={row.thumbnail} />
        </div>
      )
    },
    {
      label: 'Total Point',
      render: (row) => row.point
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <a href={`/gamification/badges/${row.id}`}>
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