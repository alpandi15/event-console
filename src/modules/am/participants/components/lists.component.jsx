import { Console, ModernTable, Toastify } from "ems-component";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { numberFormatIDR } from "@/src/utils/currency";
import clsx from "clsx";
import { PARTICIPANT_STATUS } from "@/src/constant/status";
import { useMemo } from "react";
import { apiEdit, apiDelete } from '../services/participants.service'

const ListComponent = ({ lists = [], meta, isLoading, pageSize, onRefresh, onPageChange, onChangeLimit }) => {
  const { asPath } = useRouter();
  const [modalStatus, setModalStatus] = useState({
    modal: false,
    id: null,
    user: null,
    status: {
      value: null,
      title: null
    },
  });
  const [modalDelete, setModalDelete] = useState({
    modal: false,
    id: null,
    user: null,
  });

  const onChangeStatus = (id, user, status) => {
    const find = PARTICIPANT_STATUS?.find((v) => v?.value === status)
    setModalStatus({
      modal: true,
      id,
      user,
      status: find,
    })
  }

  const onSubmitStatus = async () => {
    if (!modalStatus?.id) return

    const res = await apiEdit(modalStatus?.id, { status_event: modalStatus?.status?.value })

    if (!res?.success) {
      Toastify({
        type: 'error',
        text: res?.data?.message
      })
      return
    }

    Toastify({
      type: 'success',
      text: 'Success'
    })

    setModalStatus({
      ...modalStatus,
      modal: false
    })
    await onRefresh()
    return
  }

  const onSubmitDelete = async () => {
    if (!modalDelete?.id) return

    const res = await apiDelete(modalDelete?.id)

    if (!res?.success) {
      Toastify({
        type: 'error',
        text: res?.data?.message
      })
      return
    }

    Toastify({
      type: 'success',
      text: 'Success'
    })

    setModalDelete({
      ...modalStatus,
      modal: false
    })
    await onRefresh()
    return
  }
  const items = useMemo(
    () => [
      {
        label: "Account",
        tdClass: 'w-72',
        render: (row) => (
          <div className="flex items-center">
            <div className="w-9 h-9 image-fit zoom-in shrink-0">
              <Console.Image
                key={row?.id}
                src={row?.participant?.photo}
                className="w-full h-full text-slate-700 border-white rounded-lg shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
              />
            </div>
            <div className="ml-4">
              <div className="text-slate-700 font-medium whitespace-nowrap">
                {row?.participant?.full_name}
              </div>
              <div className="text-slate-500 text-xs mt-0.5 break-all">
                {row?.participant?.email}
              </div>
            </div>
          </div>
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
        label: "Ticket",
        class: "whitespace-nowrap",
        render: (row) => row?.order?.qty,
      },
      {
        label: "Invitation",
        class: "whitespace-nowrap",
        render: (row) => (
          <div className="whitespace-nowrap">
            {row?.invited ? "True" : "False"}
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
              value={row?.status_event}
              className={clsx(
                "cursor-pointer text-xs",
                { 'bg-gray-300': row.status_event == 'invited' },
                { 'bg-blue-400': row.status_event == 'registered' },
                { 'bg-amber-400': row.status_event == 'waiting_approval' },
                { 'bg-emerald-400': row.status_event == 'approved' },
                { 'bg-rose-500 text-white': row.status_event == 'logged_in' },
                { 'bg-rose-500 text-white': row.status_event == 'attended' },
                { 'bg-gray-600 text-white': row.status_event == 'rejected' },
                { 'bg-gray-600 text-gray-200': row.status_event == 'suspended' }
              )}
            >
              {PARTICIPANT_STATUS?.map((value, index) => (
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
          <div className="flex items-center justify-center">
            <Link
              href={`${asPath}/${row?.id}`}
              className="flex items-center mr-3 text-primary"
            >
              <Console.Lucide icon="Eye" className="w-5 h-5" />
            </Link>
          </div>
        ),
      },
    ],
    [asPath]
  );

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
      {/* BEGIN: Delete Confirmation Modal */}
      <Console.Dialog
        open={modalStatus?.modal}
        onClose={() => setModalStatus({
          ...modalStatus,
          modal: false
        })
        }
      >
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <div className="mt-5 text-3xl">{modalStatus?.user}</div>
            <div className="mt-2 text-slate-500">
              Do you really want to chang status these records?
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => setModalStatus({
                ...modalStatus,
                modal: false
              })}
              className="w-24 mr-4"
            >
              Cancel
            </Console.Button>
            <Console.Button
              variant="warning"
              type="button"
              onClick={onSubmitStatus}
            >
              {modalStatus?.status?.title}
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
      {/* END: Delete Confirmation Modal */}

      {/* BEGIN: Delete Confirmation Modal */}
      <Console.Dialog
        open={modalDelete?.modal}
        onClose={() => setModalDelete({
          ...modalStatus,
          modal: false
        })
        }
      >
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <div className="mt-5 text-3xl">{modalDelete?.user}</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete these records?
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => setModalDelete({
                ...modalStatus,
                modal: false
              })}
              className="w-24 mr-4"
            >
              Cancel
            </Console.Button>
            <Console.Button
              variant="danger"
              type="button"
              className="px-8"
              onClick={onSubmitDelete}
            >
              Delete
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
      {/* END: Delete Confirmation Modal */}
    </div>
  );
};

export default ListComponent;
