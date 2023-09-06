import { Console, Toastify, ModernTable } from 'ems-component'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import schedule from '../../../services/schedule';
import Link from 'next/link';
import moment from 'moment';
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
  const items = [
    {
      label: 'Title',
      render: (row) => row.title
    },
    {
      label: 'Date',
      render: (row) => moment(row.date).format('DD MMM YYYY')
    },
    {
      label: 'Start',
      render: (row) => moment(row.start_time).format('HH:mm:ss')
    },
    {
      label: 'End',
      render: (row) => moment(row.end_time).format('HH:mm:ss')
    },
    {
      label: 'Live Link',
      render: (row) => (
        <div className="flex items-center justify-center">
          <Link href={row.live_link}>
            <Console.Lucide icon="ExternalLink" className="w-4 h-4" />
          </Link>
        </div>
      )
    },
    {
      label: 'Updated By',
      render: (row) => (
        <div className='flex flex-col'>
          {row.updated_by ?
            <div className='flex flex-col'>
              <span>{row.updated_by.full_name}</span>
              <small>{row.updated_by.email}</small>
            </div> :
            <div className='flex flex-col'>
              <span>{row.created_by.full_name}</span>
              <small>{row.created_by.email}</small>
            </div>
          }
        </div>
      )
    },
    {
      label: 'Status',
      render: (row) => (
        <span
          className={
            clsx(
              "text-xs font-medium px-2.5 py-1.5 rounded-md",
              { 'bg-amber-400': row.status == 'draft' },
              { 'bg-emerald-400': row.status == 'active' },
              { 'bg-gray-600 text-white': row.status == 'inactive' }
            )}>
          {row?.status}
        </span>
      )
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <Console.Lucide icon='Edit' className='h-5 w-5 cursor-pointer' onClick={() => router.push(`/stage/schedules/edit/${row.id}`)} />
          <Console.Lucide icon='Trash2' className='h-5 w-5 cursor-pointer' onClick={() => deleteData(row.id)} />
        </div>
      )
    }
  ]
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });
  const deleteButtonRef = useRef(null);

  const deleteData = (id) => {
    setDeleteConfirmationModal({ modal: true, id: id })
  }

  const deleteProcess = async () => {
    setDeleteLoading(true)
    await schedule.apiDelete(deleteConfirmationModal.id).then(async (res) => {
      await onRefresh()
      Toastify({
        text: 'Success, Schedule has been deleted',
        type: 'success'
      });
      setDeleteConfirmationModal({ modal: false, id: '' })
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
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
      <Console.Dialog
        open={deleteConfirmationModal.modal}
        onClose={() => {
          setDeleteConfirmationModal({ modal: false, id: '' })
        }}
        initialFocus={deleteButtonRef}>
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <Console.Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal({ modal: false, id: '' })
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Console.Button>
            <Console.Button
              variant="danger"
              type="button"
              className="w-24"
              ref={deleteButtonRef}
              onClick={deleteProcess}
              isLoading={deleteLoading}
            >
              Delete
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
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