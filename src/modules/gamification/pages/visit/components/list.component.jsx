import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router';
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
  const router = useRouter()
  const eventId = router.query.eventId
  const items = [
    {
      label: 'Task Name',
      render: (row) => row.name
    },
    {
      label: 'Date',
      render: (row) => moment(row.start_time).format('DD MMM YYYY'),
      class: 'w-32'
    },
    {
      label: 'Start',
      render: (row) => moment(row.start_time).format('HH:mm:ss'),
      class: 'w-32'
    },
    {
      label: 'End',
      render: (row) => moment(row.end_time).format('HH:mm:ss'),
      class: 'w-32'
    },
    {
      label: 'Category',
      render: (row) => row?.category || 'All'
    },
    {
      label: 'Type',
      render: (row) => row.type
    },
    {
      label: 'Points',
      render: (row) => row.total_point,
      class: 'whitespace-nowrap'
    },
    {
      label: 'Participants',
      render: (row) => row.participants,
      class: 'whitespace-nowrap'
    },
    {
      label: 'Status',
      render: (row) => (
        <span
          className={
            clsx(
              "text-xs font-medium px-2.5 py-1.5 rounded-md",
              {
                'bg-amber-400': row?.status === 'draft',
                'bg-blue-400': row?.status === 'upcoming',
                'bg-emerald-400': row?.status === 'live',
                'bg-gray-600 text-white': row?.status === 'ended'
              })}>
          {row?.status}
        </span>
      ),
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <a href={`/gamification/visit/edit/${row.id}`}>
            <Console.Lucide icon='Edit' className='h-5 w-5' />
          </a>
          <a href={`/gamification/visit/detail/${row.id}`}>
            <Console.Lucide icon='Eye' className='h-5 w-5' />
          </a>
        </div>
      )
    }
  ]
  const [updating, setUpdating] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });
  const deleteButtonRef = useRef(null);

  const [statusConfirmModal, setStatusConfirmModel] = useState({ modal: false, id: null, status: null });
  const statusButtonRef = useRef(null);
  // const [detailData, setDetailData] = useState(null)

  const onDelete = async () => {
    console.log(deleteConfirmationModal?.id)
  }

  const onUpdateStatus = async () => {
    if (!statusConfirmModal?.id) return
    setUpdating(true)
    const res = await apiEditStatus(statusConfirmModal?.id, { status: statusConfirmModal?.status })
    setUpdating(false)

    // response false
    if (!res?.success) {
      Toastify({
        text: res?.message,
        type: 'error'
      });
      return
    }
    await onRefresh()
    Toastify({
      text: res?.data,
      type: 'success'
    });
    setStatusConfirmModel({ ...statusConfirmModal, modal: false })
  }

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