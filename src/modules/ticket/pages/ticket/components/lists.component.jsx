import { Console, Toastify, ModernTable } from 'ems-component'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router';
import ticket from '../../../services/ticket';
import number from '@/src/utils/number';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const router = useRouter()

  const items = [
    {
      label: 'Ticket Name',
      render: (row) => row.name,
      thClass: 'w-32 inline-table !px-4',
      tdClass: '!px-4'
    },
    {
      label: 'Price',
      render: (row) => {
        if (typeof row.price === 'object') {
          return `${number.currency(row.price[0], 'Rp')} - ${number.currency(row.price[1], 'Rp')}`
        } else {
          return number.currency(row.price, 'Rp')
        }
      },
      thClass: '!px-4',
      tdClass: '!px-4'
    },
    {
      label: 'Discount',
      render: (row) => number.local(row.discount_price),
      thClass: '!px-4',
      tdClass: '!px-4'
    },
    {
      label: 'Final Price',
      render: (row) => {
        if (typeof row.final_price === 'object') {
          return `${number.currency(row.final_price[0], 'Rp')} - ${number.currency(row.final_price[1], 'Rp')}`
        } else {
          return number.currency(row.final_price, 'Rp')
        }
      },
      thClass: '!px-4',
      tdClass: '!px-4'
    },
    {
      label: 'Stock',
      render: (row) => {
        if (row.hasVariant) {
          return number.local(row?.stock)
        } else {
          return (
            row?.stock ?
              <Console.FormInput
                type="number"
                className="w-20 py-1.5 px-1.5 text-xs"
                thousandseparator={true}
                defaultValue={number.local(row?.stock)}
              /> : '-'
          )
        }
      },
      thClass: '!px-4',
      tdClass: '!px-4'
    },
    {
      label: 'Min Order',
      render: (row) => row?.min_purchase ? number.local(row?.min_purchase) : '-',
      class: 'w-10',
      thClass: '!px-4',
      tdClass: '!px-4'
    },
    {
      label: 'Max Order',
      render: (row) => row?.max_purchase ? number.local(row?.max_purchase) : '-',
      class: 'w-10',
      thClass: '!px-4',
      tdClass: '!px-4'
    },
    {
      label: 'Status',
      thClass: '!px-4',
      tdClass: '!px-4',
      render: (row) => (
        <Console.FormSwitch.Input
          id="sub-status"
          // onClick={toggle}
          className="ml-0 mr-0"
          type="checkbox"
          defaultChecked={row.status == "active" ? true : false}
          onChange={(e) => updateStatus(row.id, e)}
        />
      )
    },
    {
      label: 'View',
      thClass: '!px-4',
      tdClass: '!px-4',
      render: (row) => (
        <div className='flex gap-1 items-center'>
          <Console.Lucide icon="Users" className='w-4 h-4' />
          {row.view}
        </div>
      )
    },
    {
      label: 'Purchase',
      thClass: '!px-4',
      tdClass: '!px-4',
      render: (row) => (
        <div className='flex gap-1 items-center'>
          <Console.Lucide icon="Users" className='w-4 h-4' />
          {row.purchase}
        </div>
      )
    },
    {
      label: 'Action',
      thClass: '!px-4',
      tdClass: '!px-4',
      render: (row) => (
        <div className="flex flex-col items-start justify-center gap-2">
          <span className='flex gap-1 cursor-pointer hover:underline' onClick={() => router.push(`/ticket/edit/${row?.id}`)} >
            <Console.Lucide icon="Edit" className="w-4 h-4" />
            Edit
          </span>
          <span className='flex gap-1 cursor-pointer hover:underline' onClick={() => router.push(`/ticket/duplicate/${row?.id}`)}>
            <Console.Lucide icon="Copy" className="w-4 h-4" />
            Duplicate
          </span>
        </div>
      )
    }
  ]
  const [updateStatusModal, setUpdateStatusModal] = useState({ modal: false, id: null, status: '' });
  const [updating, setUpdating] = useState(false)
  const confirmButtonRef = useRef(null);

  const updateStatus = (id, e) => {
    if (e.target.checked) {
      setUpdateStatusModal({ modal: true, id: id, status: 'active' })
    } else {
      setUpdateStatusModal({ modal: true, id: id, status: 'inactive' })
    }
  }

  const processUpdateStatus = async (id, status) => {
    setUpdating(true)
    await ticket.apiUpdateStatus(id, { status: status }).then(async (res) => {
      await onRefresh()
      Toastify({
        text: 'Success, status has been changed',
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
        bodyClass="text-sm"
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
              Do you really want to change status of these data?
            </div>
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
              isLoading={updating}
            >
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