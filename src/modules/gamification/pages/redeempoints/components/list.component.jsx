import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import redeempoint from '../../../services/redeempoint';
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
  const items = [
    {
      label: 'Gift Name',
      render: (row) => row.name
    },
    {
      label: 'Image',
      render: (row) => (
        <div><img src={row.image} className='w-32' /></div>
      )
    },
    {
      label: 'Total Stock',
      render: (row) => row.stock
    },
    {
      label: 'Point Deduction',
      render: (row) => row.point_deduction
    },
    {
      label: 'Sponsored by',
      render: (row) => row.company.company_name
    },
    {
      label: 'Status',
      render: (row) => (
        <Console.FormSelect
          value={row.status}
          onChange={(e) => updateStatus(row.id, e?.target?.value)}
          className={clsx(
            "cursor-pointer text-xs w-fit",
            { 'bg-amber-400': row.status == 'draft' },
            { 'bg-emerald-400': row.status == 'active' },
            { 'bg-gray-600 text-white': row.status == 'inactive' }
          )}>
          <option className='bg-white text-dark' value="draft">Draft</option>
          <option className='bg-white text-dark' value="active">Active</option>
          <option className='bg-white text-dark' value="inactive">Inactive</option>
        </Console.FormSelect>
      )
    }
  ]
  const [statusModal, setStatusModal] = useState({ modal: false, id: null, status: null });
  const [isLoadingStatus, setLoadingStatus] = useState(false)
  const updateStatus = (id, val) => {
    setStatusModal({ modal: true, id: id, status: val })
  }

  const processUpdateStatus = async () => {
    setLoadingStatus(true)

    await redeempoint.apiUpdate(statusModal.id, { status: statusModal.status }).then((res) => {
      Toastify({
        text: 'Success, Status has been updated',
        type: 'success'
      });
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })

    setLoadingStatus(false)
    setStatusModal({ modal: false, id: null, status: null })
    onRefresh()
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
        open={statusModal.modal}
        onClose={() => {
          setStatusModal({ modal: false, id: null, status: null })
        }}>
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <Console.Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to change status of this record?
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setStatusModal({ modal: false, id: null, status: null })
              }}
              className="w-24 mr-1">
              Cancel
            </Console.Button>
            <Console.Button
              variant="danger"
              type="button"
              className="w-24"
              onClick={processUpdateStatus}>
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