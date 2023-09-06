import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import ticket from '../../../services/ticket';
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
      label: 'ID',
      render: (row) => row.id
    },
    {
      label: 'Photo',
      render: (row) => (
        <div className='w-10'>
          <Console.Image
            key={row?.id}
            src={row?.img}
            alt={row?.img}
            className="border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
          />
        </div>
      )
    },
    {
      label: 'Email',
      render: (row) => row.participant?.email || '-'
    },
    {
      label: 'First Name',
      render: (row) => row.participant?.first_name || '-'
    },
    {
      label: 'Last Name',
      render: (row) => row.participant?.last_name || '-'
    },
    {
      label: 'Phone No',
      render: (row) => row.participant?.phone_number || '-'
    },
    {
      label: 'Status',
      render: (row) => (
        <span
          className={
            clsx(
              "text-xs font-medium px-2.5 py-1.5 rounded-md",
              {
                'bg-emerald-400': row?.status_event === 'registered',
                'bg-amber-400': row?.status_event === 'invited'
              })}>
          {row?.status_event}
        </span>
      ),
    }
  ]
  const [updateStatusModal, setUpdateStatusModal] = useState({ modal: false, id: null, status: '' });
  const [updating, setUpdating] = useState(false)
  const confirmButtonRef = useRef(null);

  const updateStatus = (id, e) => {
    if (e.target.checked) {
      setUpdateStatusModal({ modal: true, id: id, status: 'active' })
    } else {
      setUpdateStatusModal({ modal: true, id: id, status: 'inactive' })
    }
  }

  const processUpdateStatus = async (id, status) => {
    setUpdating(true)
    await ticket.apiUpdateStatus(eventId, id, { status: status }).then(async (res) => {
      await onRefresh()
      Toastify({
        text: "success",
        type: 'success'
      });
      setUpdateStatusModal({ modal: false, id: null, status: '' });
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setUpdating(false)
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
        bodyClass="text-sm"
      />
      <Console.Dialog
        open={updateStatusModal.modal}
        onClose={() => {
          setUpdateStatusModal({ modal: false, id: null, status: '' });
        }}
        initialFocus={confirmButtonRef}
      >
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <Console.Lucide
              icon="AlertTriangle"
              className="w-16 h-16 mx-auto mt-3 text-warning"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to change status of these data?
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setUpdateStatusModal({ modal: false, id: null, status: '' });
                onRefresh()
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="button"
              className="w-fit"
              ref={confirmButtonRef}
              onClick={() => processUpdateStatus(updateStatusModal.id, updateStatusModal.status)}
              isLoading={updating}
            >
              Confirm
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