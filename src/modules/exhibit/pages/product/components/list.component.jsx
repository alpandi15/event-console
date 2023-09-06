import { Console, Toastify, ModernTable } from 'ems-component'
import { useRef, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import product from '../../../services/product';
import { useForm } from 'react-hook-form';
import { local } from '@/src/utils/currency';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const { register, watch } = useForm()
  const { reason } = watch()

  const items = [
    {
      label: 'Company',
      render: (row) => row.company.company_name
    },
    {
      label: 'Product Name',
      render: (row) => row.name
    },
    {
      label: 'Photo',
      render: (row) => (
        <div className='w-20'>
          <div className='w-full pt-[100%] relative border rounded-xl shadow'>
            <img src={row.photo} className='w-full h-full absolute top-0 object-contain' />
          </div>
        </div>
      )
    },
    {
      label: 'Price',
      render: (row) => local(row.price)
    },
    {
      label: 'Stock',
      render: (row) => row.stock
    },
    {
      label: 'Status',
      render: (row) => (
        <select
          defaultValue={row.status}
          className="text-xs font-medium pl-2.5 pr-6 py-0.5 rounded dark:bg-gray-700 border cursor-pointer"
          onChange={(e) => changeStatus(e, row.id)}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          {/* <option value="suspended">Suspended</option> */}
        </select>
      )
    },
    {
      label: 'QR Code',
      render: (row) => (
        <div className='flex w-full justify-center'>
          <Console.Lucide icon='QrCode' className='cursor-pointer' onClick={() => showQr(row.qrcode)} />
        </div>
      )
    },
  ]
  const [updateStatusModal, setUpdateStatusModal] = useState({ modal: false, id: null, status: '' });
  const [updating, setUpdating] = useState(false)
  const [qrModal, setQrModal] = useState({ modal: false, data: '' })
  const confirmButtonRef = useRef(null);

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

    await product.updateStatusProductList(id, formData).then(async (res) => {
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
        }}
      >
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

export const Filter = ({ ...props }) => {
  return (
    <div className="mt-2 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
      {props.children}
    </div>
  )
}

export default ListComponent