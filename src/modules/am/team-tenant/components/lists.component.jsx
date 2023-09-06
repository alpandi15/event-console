import { Console, ModernTable, Toastify } from "ems-component";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { numberFormatIDR } from "@/src/utils/currency";
import clsx from "clsx"
import { EXHIBIT_STATUS } from '@/src/constant/status'
import { useRef, useState } from "react";
import tenantService from "../tenant.service";

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit }) => {
  const router = useRouter()

  const items = [
    {
      label: 'Company Name',
      render: (row) => row.company.company_name
    },
    {
      label: 'Brand Name',
      render: (row) => row.company.brand_name
    },
    {
      label: 'Email',
      render: (row) => row.email
    },
    {
      label: 'Phone Number',
      render: (row) => row.phone_number
    },
    {
      label: 'First Name',
      render: (row) => row.first_name
    },
    {
      label: 'Last Name',
      render: (row) => row.last_name
    },
    {
      label: 'ID Number',
      render: (row) => row.id_number
    },
    {
      label: 'Status Event',
      render: (row) => (
        <Console.FormSelect
          onChange={(e) => setStatusConfirmModel({ modal: true, id: row?.id, status: e?.target?.value })}
          value={row?.status}
          className={clsx(
            "cursor-pointer text-xs w-fit",
            { 'bg-amber-400': row.status == 'invited' },
            { 'bg-rose-500 text-white': row.status == 'suspended' },
            { 'bg-emerald-400': row.status == 'active' },
            { 'bg-blue-400': row.status == 'logged_in' },
            { 'bg-gray-600 text-white': row.status == 'attended' }
          )}>
          <option className='bg-white text-dark' value="invited" selected={row?.status === 'invited'}>Invited</option>
          <option className='bg-white text-dark' value="active" selected={row?.status === 'active'}>Active</option>
          <option className='bg-white text-dark' value="logged_in" selected={row?.status === 'logged_in'}>Logged In</option>
          <option className='bg-white text-dark' value="attended" selected={row?.status === 'attended'}>Attended</option>
          <option className='bg-white text-dark' value="suspended" selected={row?.status === 'suspended'}>Suspended</option>
        </Console.FormSelect>
      )
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <Console.Lucide icon='Edit' className='h-5 w-5 cursor-pointer' onClick={() => router.push(`/am/tenant-team/${row.id}`)} />
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
    await tenantService.apiDelete(deleteConfirmationModal.id).then(async (res) => {
      await onRefresh()
      Toastify({
        text: 'Success, Team Tenant has been deleted',
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

export default ListComponent