import { Console, PerfectScrollbar, Toastify } from "ems-component"
import Router, { useRouter } from 'next/router'
import { deleteAccess } from "../member.service"
import { useRef, useState } from "react"

const Item = ({ data, removeAccess }) => {
  const { asPath } = useRouter()

  return (
    <div className="border border-slate-200 shadow-xl bg-white rounded-lg">
      <div className="flex items-start px-5 pt-5">
        <div className="flex flex-col items-center w-full lg:flex-row">
          <div className="w-20 h-20 image-fit border rounded-full overflow-hidden">
            <Console.Image
              className="w-full h-full"
            />
          </div>
          <div className="mt-3 text-center lg:mt-0">
            <a className="font-medium">
              {data?.name}
            </a>
            <div className="text-slate-500 text-xs mt-0.5">
              {data?.email}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">
              {data?.phone_number || '-'}
            </div>
            <div className="flex items-center justify-center mt-1 text-slate-500">
              <div className="text-gray-800 text-xs bg-primary px-2 py-1 rounded-xl">Role {data?.role?.name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 mt-4 text-center lg:!text-left">
        <div className="mt-3 pb-2 w-full relative overflow-hidden">
          <div className="font-medium text-sm text-slate-700">Event Access:</div>
          <div className="mt-2 h-24">
            <PerfectScrollbar className="overflow-x-auto pr-2">
              {data.events.map((e, index) => {
                return (
                  <div key={index} className="p-2 border border-slate-200 rounded-lg mb-2">
                    <div className="text-sm text-slate-700 truncate">{e.event.name}</div>
                    <span className="text-xs rounded-xl">Role: {e.role.name}</span>
                  </div>
                )
              })}
            </PerfectScrollbar>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-2 border-t border-slate-200/60 dark:border-darkmode-400">
        <Console.Button
          type="button"
          variant="dark"
          size="sm"
          onClick={() => Router.push(`${asPath}/${data?.id}`)}
        >
          <Console.Lucide icon="Eye" className="w-4 h-4" />
          Details
        </Console.Button>
        <Console.Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => removeAccess(data?.id)}
        >
          <Console.Lucide icon="X" className="w-4 h-4" />
          Remove Access
        </Console.Button>
      </div>
    </div>
  )
}


const CardComponent = ({ lists = [], onRefresh }) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });
  const deleteButtonRef = useRef(null);

  const removeAccess = (id) => {
    setDeleteConfirmationModal({ modal: true, id: id })
  }

  const deleteProcess = async () => {
    setDeleteLoading(true)
    await deleteAccess(deleteConfirmationModal.id).then(async (res) => {
      await onRefresh()
      Toastify({
        text: "Success, Team Member has been removed",
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
    <>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {
          lists?.map((data, key) => {
            return <Item data={data} key={key} removeAccess={(id) => removeAccess(id)} />
          })
        }
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
    </>
  )
}

export default CardComponent