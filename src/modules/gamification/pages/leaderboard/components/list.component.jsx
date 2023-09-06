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
      label: 'Participant Full Name',
      render: (row) => row.participant.full_name,
      class: 'whitespace-nowrap'
    },
    {
      label: 'Email',
      render: (row) => row.participant.email
    },
    {
      label: 'Phone No',
      render: (row) => row.participant.phone_number || '-',
    },
    {
      label: 'Total Point',
      render: (row) => row.total_point
    },
    {
      label: 'Total Score',
      render: (row) => row.total_score,
    },
    {
      label: 'Total Data',
      render: (row) => row.total_data
    },
    {
      label: 'Action',
      render: (row) => (
        <a href={`/gamification/leaderboard/detail/${row.participants_id}`}><Console.Lucide icon='Eye' className='h-5 w-5' /></a>
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