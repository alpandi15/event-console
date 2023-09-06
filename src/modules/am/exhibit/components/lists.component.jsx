import clsx from "clsx";
import { Console, ModernTable, Toastify } from "ems-component";
import Link from "next/link";
import { useRouter } from "next/router";
// import { EXHIBIT_STATUS } from '@/src/constant/status'
import { useMemo, useRef, useState } from 'react'
import { apiDelete } from "../sarvices/member.service";

const EXHIBIT_STATUS = [
  { value: 'active', title: 'Active' },
  { value: 'nonactive', title: 'Non Active' },
]

const ListConponent = ({
  lists = [],
  meta,
  isLoading,
  pageSize,
  onRefresh,
  onPageChange,
  onChangeLimit
}) => {
  const { asPath } = useRouter()

  const items = useMemo(
    () => [
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
        label: "ID Number",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="whitespace-nowrap">{row?.id_number ?? "-"}</div>
        ),
      },
      {
        label: "Phone Number",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="whitespace-nowrap">{row?.phone_number ?? "-"}</div>
        ),
      },
      {
        label: "Company",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="whitespace-nowrap">{row?.company?.company_name ?? "-"}</div>
        ),
      },
      {
        label: "Brand",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="whitespace-nowrap">{row?.company?.brand_name ?? "-"}</div>
        ),
      },
      {
        label: "Business Category",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="whitespace-nowrap">{row?.company?.business_categorys?.name ?? "-"}</div>
        ),
      },
      {
        label: "Company Status",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="whitespace-nowrap">
            {row?.company?.status ? "Active" : "Nonactive"}
          </div>
        ),
      },
      {
        label: "Status",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="w-[100px]">
            <Console.FormSelect
              onChange={(e) =>
                onChangeStatus(row?.id, row?.participant?.full_name, e?.target?.value)
              }
              value={row?.status}
              className={clsx(
                "cursor-pointer text-xs",
                { '!bg-emerald-400': row.status == 'active' },
                { '!bg-gray-600 text-gray-200': row.status == 'nonactive' }
              )}
            >
              {EXHIBIT_STATUS?.map((value, index) => (
                <option className='bg-white text-dark' key={index} value={value?.value}>
                  {value?.title}
                </option>
              ))}
            </Console.FormSelect>
          </div>
        ),
      },
      {
        label: "Actions",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className='flex flex-col gap-4'>
            <a
              href={`${asPath}/${row?.id}`}
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
        ),
      },
    ],
    [asPath]
  );

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });
  const deleteButtonRef = useRef(null);

  const deleteData = (id) => {
    setDeleteConfirmationModal({ modal: true, id: id })
  }

  const deleteProcess = async () => {
    setDeleteLoading(true)
    await apiDelete(deleteConfirmationModal.id).then(async (res) => {
      await onRefresh()

      Toastify({
        text: "Success, Exhibitor has been removed",
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

export default ListConponent