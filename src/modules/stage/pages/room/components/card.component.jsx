import { Console, ModernPagination, Toastify } from "ems-component"
import { useState } from 'react'
import room from "../../../services/room"

const CardComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit }) => {

  const listLength = lists.length
  const Sqeleton = () => {
    let sqeleton = []
    for (let i = 0; i < listLength; i++) {
      sqeleton.push(i)
    }
    return sqeleton.map((v, k) => (
      <div className="w-full h-36 bg-gray-300 animate-pulse rounded-lg shadow-md" key={k}></div>
    ))
  }

  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });

  const deleteData = (id) => {
    setDeleteConfirmationModal({ modal: true, id: id })
  }

  const deleteProcess = async () => {
    setDeleteLoading(true)
    await room.apiDelete(deleteConfirmationModal.id).then(async (res) => {
      await onRefresh()
      Toastify({
        text: 'Success, data has been deleted',
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
    <div className="space-y-4">
      {isLoading ?
        <div className="grid grid-cols-5 gap-2 mt-5">
          <Sqeleton />
        </div> :
        lists.length > 0 ?
          <div className="grid grid-cols-5 gap-2 mt-5">
            {lists?.map((v, k) => {
              return (
                <div key={k} className="w-full border rounded-lg shadow-md bg-white">
                  <div className="px-3 py-2">
                    <div className="flex flex-col pb-1">
                      <h2 className="font-medium text-md !line-clamp-2">{v?.room_name}</h2>
                      <span className="text-sm text-gray-500 mt-2">Stage {v.room_no}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <Console.Button variant="danger" className="py-1 w-full" onClick={() => deleteData(v.id)}>
                        Delete
                      </Console.Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div> :
          <div className="w-full flex justify-center py-4 h-96 items-center">
            <h1 className="font-bold text-xl">No matching records found</h1>
          </div>
      }
      <ModernPagination
        className="pagination-bar"
        currentPage={meta?.current_page}
        totalPage={meta?.total_page}
        totalCount={meta?.total}
        pageSize={pageSize}
        onPageChange={(page) => onPageChange(page)}
        onChangeLimit={(limit) => onChangeLimit(limit)}
      />

      <Console.Dialog
        open={deleteConfirmationModal.modal}
        onClose={() => {
          setDeleteConfirmationModal({ modal: false, id: null });
        }}>
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <Console.Lucide
              icon="AlertTriangle"
              className="w-16 h-16 mx-auto mt-3 text-warning"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to delete this data?
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setDeleteConfirmationModal({ modal: false, id: null })
              }}
              className="w-24 mr-1">
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="button"
              className="w-fit"
              onClick={() => deleteProcess()}
              disabled={deleteLoading}
              isLoading={deleteLoading}>
              Confirm
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
    </div>
  )
}

export default CardComponent