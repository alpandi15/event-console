import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import apiintegration from '../../../services/apiintegration';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });
  const [deleteLoading, setDeleteLoading] = useState(false);
const copyToClipboard = (type, val)=>{
navigator.clipboard.writeText(val);
Toastify({
        text: `${type} has copied to clipboard`,
        type: 'success'
      });
}

  const items = [
    {
      label: 'Company',
      render: (row) => row.company.company_name,
      class: 'w-44'
    },
    {
      label: 'Client ID',
      render: (row) => (
        <div className='border bg-white break-all flex gap-2 rounded shadow overflow-hidden'>
          <div className='px-2 py-1'>
            {row.id}
          </div>
          <div className='bg-gray-100 px-2 flex items-center justify-center transition-all cursor-pointer hover:bg-primary active:bg-primary/50' onClick={()=>copyToClipboard('Client Id',row.id)}>
            <Console.Lucide icon='Copy' className='h-5 w-5' />
          </div>
        </div>
      ),
    },
    {
      label: 'Secret Key',
      render: (row) => (
        <div className='border bg-white break-all flex gap-2 rounded shadow overflow-hidden'>
          <div className='px-2 py-1'>
            {row.secret_key}
          </div>
          <div className='bg-gray-100 px-2 flex items-center justify-center transition-all cursor-pointer hover:bg-primary active:bg-primary/50' onClick={()=>copyToClipboard('Secret Key',row.secret_key)}>
            <Console.Lucide icon='Copy' className='h-5 w-5' />
          </div>
        </div>
      ),
    },
    {
      label: 'Created By',
      render: (row) => row.created_by.full_name,
      class: 'whitespace-nowrap'
    },
    {
      label: 'Valid Until',
      render: (row) => moment(row.valid_until).format('DD-MM-YYYY HH:mm:SS'),
      class: 'whitespace-nowrap'
    },
    {
      label: 'Action',
      render: (row) => (
        <Console.Button variant="danger" className="shadow-md text-md" onClick={() => setDeleteConfirmationModal({ modal: true, id: row.id })}>
          Revoke
        </Console.Button>
      ),
      class: 'whitespace-nowrap'
    }
  ]

  const deleteProcess = async () => {
    setDeleteLoading(true)
    await apiintegration.apiDelete(deleteConfirmationModal.id).then((res) => {
      Toastify({
        text: 'Success, Secret Key has been deleted',
        type: 'success'
      });
      setDeleteConfirmationModal({ modal: false, id: '' })
      onRefresh()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })

    setDeleteLoading(false)
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
        }}>
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <Console.Lucide
              icon="XCircle"
              className="w-16 h-16 mx-auto mt-3 text-danger"
            />
            <div className="mt-5 text-3xl">Are you sure?</div>
            <div className="mt-2 text-slate-500">
              Do you really want to revoke these secret key? <br />
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

export const Filter = ({ ...props }) => {
  return (
    <div className="mt-2 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
      {props.children}
    </div>
  )
}

export default ListComponent