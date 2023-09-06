import { Console, ModernTable, Toastify } from "ems-component";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { numberFormatIDR } from "@/src/utils/currency";
import clsx from "clsx"
import { removeAccess } from "../services/team-exhibit.service";
import { useMemo, useRef, useState } from 'react'
import { EXHIBIT_STATUS } from '@/src/constant/status'

const Item = ({ data }) => {

  return (
    <Console.Table.Tr key={data?.id} className="intro-x">
      <Console.Table.Td className="text-slate-700 font-medium whitespace-nowrap">
        <div className="font-medium whitespace-nowrap uppercase">
          {data?.id + 1}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap">
        <div className="flex items-center">
          Company Name
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap">
        Brand Name
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap">
        {data?.email}
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap">
        +6281209873743
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap text-center">
        <div className="">
          First Name
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap text-center">
        <div className="">
          Last Name
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap text-center">
        <div className="">
          12345607978544
        </div>
      </Console.Table.Td>
      {/* <Console.Table.Td className="text-slate-700 whitespace-nowrap">
        <span
          className={
            clsx("text-white text-[10px] px-2 py-1 text-center uppercase rounded-xl", {'bg-success': data?.status === 'approved', 'bg-danger': data?.status === 'suspeded'})}>
          {data?.status}
        </span>
      </Console.Table.Td> */}
      <Console.Table.Td>
        <div className="w-[100px]">
          <Console.FormSelect
            onChange={(e) => onChangeStatus({ modal: true, id: data?.id, status: e?.target?.value })}
            defaultValue="approved"
            className="cursor-pointer"
          >
            {EXHIBIT_STATUS?.map((value, index) => <option key={index} value={value?.value}>{value?.label}</option>)}
          </Console.FormSelect>
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="text-slate-700 whitespace-nowrap">
        <div className="flex items-center justify-center">
          <Link
            href={`${asPath}/${data?.id}`}
            className="flex items-center mr-3 text-primary"
          >
            <Console.Lucide icon="Eye" className="w-5 h-5" />
          </Link>
          <a
            className="flex items-center text-danger"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              setDeleteConfirmationModal({
                modal: true,
                id: row?.id
              });

            }}
          >
            <Console.Lucide icon="Trash2" className="w-5 h-5 mr-1" />
          </a>
        </div>
      </Console.Table.Td>
    </Console.Table.Tr>
  )
}

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit,
}) => {
  const { asPath } = useRouter()

  const items = [
    {
      label: 'User Account',
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
              {`${row?.first_name ?? row?.first_name} ${row?.last_name ?? row?.last_name}`}
            </div>
            <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
              {row?.email}
            </div>
          </div>
        </div>
      )
    },
    {
      label: 'Company Name',
      render: (row) => <div className="whitespace-nowrap">{row?.company?.company_name}</div>,
    },
    {
      label: 'Brand',
      render: (row) => <div className="whitespace-nowrap">{row?.company?.brand_name}</div>
    },
    {
      label: 'Phone Number',
      render: (row) => <div className="whitespace-nowrap">{row?.phone_number ?? '-'}</div>
    },
    {
      label: 'ID Number',
      render: (row) => row?.id_number ?? '-'
    },
    {
      label: 'Status',
      render: (row) => (
        <div className="w-[100px]">
          <Console.FormSelect
            onChange={(e) => onChangeStatus({ modal: true, id: data?.id, status: e?.target?.value })}
            defaultValue="approved"
            className={clsx(
              "cursor-pointer text-xs",
              { 'bg-gray-300': row.status_event == 'invited' },
              { 'bg-amber-400': row.status_event == 'waiting_approval' },
              { 'bg-emerald-400': row.status_event == 'approved' },
              { 'bg-rose-500 text-white': row.status_event == 'logged_in' },
              { 'bg-rose-500 text-white': row.status_event == 'attended' },
              { 'bg-gray-600 text-white': row.status_event == 'rejected' },
              { 'bg-gray-600 text-gray-200': row.status_event == 'suspended' }
            )}
          >
            {EXHIBIT_STATUS?.map((value, index) => <option key={index} value={value?.value}>{value?.label}</option>)}
          </Console.FormSelect>
        </div>
      )
    },
    {
      label: 'Action',
      render: (row) => (
        <div className="flex items-center justify-center">
          <Link
            href={`${asPath}/${row?.id}`}
            className="flex items-center mr-3 text-primary"
          >
            <Console.Lucide icon="Eye" className="w-5 h-5" />
          </Link>
          <a
            className="flex items-center text-danger"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              // setDeleteConfirmationModal(true);
            }}
          >
            <Console.Lucide icon="Trash2" className="w-5 h-5 mr-1" />
          </a>
        </div>
      )
    },
  ]
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });
  const deleteButtonRef = useRef(null);

  const deleteData = (id) => {
    setDeleteConfirmationModal({ modal: true, id: id })
  }

  const deleteProcess = async () => {
    setDeleteLoading(true)
    await removeAccess(deleteConfirmationModal.id).then(async (res) => {
      await onRefresh()

      Toastify({
        text: res?.data,
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
    <div className="intro-y">
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
              Do you really want to remove event access? <br />
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