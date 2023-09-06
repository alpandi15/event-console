import { Console, ModernPagination, Toastify } from "ems-component"
import Router from 'next/router'
import { useState, useRef } from 'react'
import { useQRCode } from 'next-qrcode'
import { formatIDR } from "@/src/utils/currency"
import menu from "../../../services/menu"

const CardComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit }) => {
  const [updateStatusModal, setUpdateStatusModal] = useState({ modal: false, id: null, status: '' });
  const [updating, setUpdating] = useState(false)
  const [qrModal, setQrModal] = useState({ modal: false, data: '' })
  const confirmButtonRef = useRef(null);
  const listLength = lists.length
  const Sqeleton = () => {
    for (let i = 0; i < listLength; i++) {
      return (
        <div className="w-full h-96 bg-gray-300 animate-pulse rounded-lg shadow-md"></div>
      )
    }
  }

  const showQr = (qr) => {
    setQrModal({ modal: true, data: qr })
  }

  const changeStatus = (e, id) => {
    setUpdateStatusModal({ modal: true, id: id, status: e.target.value })
  }

  const processUpdateStatus = async (id, status) => {
    setUpdating(true)
    const formData = {
      status: status
    }

    if (status == 'suspended') {
      formData['notes'] = reason
    }

    await menu.updateStatusMenuList(id, formData).then(async (res) => {
      await onRefresh()
      Toastify({
        text: 'Success, status has been updated!',
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
                  <div className="w-full">
                    <div className="w-full relative after:content-[''] after:absolute after:bottom-0 after:w-full after:h-[100px] after:bg-gradient-to-t after:from-white">
                      <Console.Image
                        key={v?.photo}
                        src={v?.photo}
                        alt={v?.name}
                        className="w-full aspect-square object-contain"
                      />
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <div className="flex flex-col pb-1">
                      <h2 className="font-medium text-md !line-clamp-2">{v?.name}</h2>
                      <span className="text-sm text-gray-500">{v.category.name}</span>
                      <span className="text-sm text-gray-500 mt-2">{v.company.company_name}</span>
                      <div className="flex items-end justify-between">
                        <span className="text-md font-semibold text-primary">{formatIDR(v.price)}</span>
                        <span className="text-xs">Stock <b>{v.stock}</b></span>
                      </div>
                    </div>
                    <div className="flex justify-between pt-1 border-t">
                      <div className="">
                        <Console.Lucide icon='QrCode' className='cursor-pointer w-10 h-10 transition-all hover:rotate-90 hover:text-primary' onClick={() => showQr(v.qrcode)} />
                      </div>
                      <div className="flex items-center justify-end">
                        <div className="text-right">
                          <select
                            defaultValue={v.status}
                            className="border-none w-full text-xs bg-gray-200 font-medium pl-3 pr-6 py-1 rounded-xl cursor-pointer focus:shadow-none focus:outline-none focus:border-none focus:ring-0"
                            onChange={(e) => changeStatus(e, v.id)}>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            {/* <option value="suspended">Suspended</option> */}
                          </select>
                        </div>
                      </div>
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
        open={updateStatusModal.modal}
        onClose={() => {
          setUpdateStatusModal({ modal: false, id: null, status: '' });
        }}
        initialFocus={confirmButtonRef}>
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <Console.Lucide
              icon="AlertTriangle"
              className="w-16 h-16 mx-auto mt-3 text-warning"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to change status of this data?
            </div>
            {updateStatusModal.status == 'suspended' && (
              <div className='flex flex-col items-start w-full mt-4'>
                <Console.FormLabel htmlFor="reason" className="text-sm">Please give the reason</Console.FormLabel>
                <Console.FormTextarea
                  {...register('reason')}
                  id="reason"
                  name="reason"
                  type="text"
                  className="block min-w-full"
                  placeholder="Type Reason Here..."
                  autoComplete="off"
                />
              </div>
            )}
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
              disabled={updateStatusModal.status == 'suspended' && !reason?.length > 0}
              isLoading={updating}
            >
              Confirm
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
      <Console.Dialog
        open={qrModal.modal}
        onClose={() => {
          setQrModal({ modal: false, data: '' });
        }}>
        <Console.Dialog.Panel>
          <div className='flex justify-end py-2 px-2'>
            <Console.Lucide icon='X' className='cursor-pointer transition-all hover:rotate-90' onClick={() => setQrModal({ modal: false, data: '' })} />
          </div>
          <div className="p-5 pt-0 text-center">
            <img src={qrModal.data} className='w-full' />
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
    </div>
  )
}

export default CardComponent