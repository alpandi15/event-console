import clsx from 'clsx';
import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import { useRef, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import operating from '../../../services/operating';

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
      label: 'Company',
      render: (row) => row.company?.company_name
    },
    {
      label: 'Category',
      render: (row) => row.category.name
    },
    {
      label: 'Menu Name',
      render: (row) => row.name
    },
    {
      label: 'Rate',
      render: (row) => row.review.rate
    },
    {
      label: 'Total Rate',
      render: (row) => row.review.total_rate
    },
    {
      label: 'Action',
      render: (row) => (
        <a href={`/tenant/reviews/detail/${row.id}`}>
          <Console.Lucide icon='ExternalLink' />
        </a>
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