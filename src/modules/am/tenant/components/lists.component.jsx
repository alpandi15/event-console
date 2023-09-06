import { Console, ModernTable, Toastify } from "ems-component";
import clsx from "clsx"
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import tenantService from "../tenant.service";

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit }) => {
  const { asPath } = useRouter()
  const items = [
    {
      label: "Account",
      class: "whitespace-nowrap",
      render: (row) => (
        <div className="flex items-center">
          <div className="w-9 h-9 image-fit zoom-in">
            <Console.Image
              key={row?.id}
              src={row?.photo}
              className="text-slate-700 border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
            />
          </div>
          <div className="ml-4">
            <div className="text-slate-700 font-medium whitespace-nowrap">
              {`${row?.first_name ?? ''} ${row?.last_name ?? ''}`}
            </div>
            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
              {row?.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: 'ID Number',
      render: (row) => row.id_number
    },
    {
      label: 'Phone Number',
      render: (row) => row.phone_number
    },
    {
      label: 'Company',
      render: (row) => row?.company?.company_name || '-'
    },
    {
      label: 'Brand',
      render: (row) => row?.company?.brand_name || '-'
    },
    {
      label: 'F&B Category',
      render: (row) => row?.company?.business_categorys?.name || '-'
    },
    {
      label: 'Company Status',
      render: (row) => (
        <span
          className={
            clsx("text-white text-[10px] px-2 py-1 text-center uppercase rounded-xl", { 'bg-success': row?.company?.status === 'active', 'bg-danger': row?.company?.status === 'suspeded' })}>
          {row?.company?.status}
        </span>
      )
    },
    {
      label: 'Status',
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
        <div className='flex flex-col gap-4'>
          <a
            href={`${asPath}/detail/${row?.id}`}
            className="flex items-center mr-3 gap-2 whitespace-nowrap hover:underline"
          >
            <Console.Lucide icon="Eye" className="w-4 h-4" />
            Details
          </a>
          <div>
            <a
              onClick={() => deleteData(row.id)}
              className="flex items-center mr-3 gap-2 whitespace-nowrap text-danger cursor-pointer hover:underline">
              <Console.Lucide icon="Trash2" className="w-4 h-4" />
              Remove Access
            </a>
          </div>
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
        text: 'Success, Tenant has been removed',
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