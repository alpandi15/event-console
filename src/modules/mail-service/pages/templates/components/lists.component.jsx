import { Console, ModernTable, Toastify } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';
import templates from '../../../services/templates';
import { useRef, useState } from 'react';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const items = [
    {
      label: ' Template Name',
      render: (row) => row.name
    },
    {
      label: 'Review Status',
      render: (row) => (
        <div className="whitespace-nowrap">
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Passed</span>
        </div>
      )
    },
    {
      label: 'Created At',
      render: (row) => moment(row.created_at).format('DD MMM YYYY, HH:mm a')
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <a href={`/mail-service/templates/edit/${row.id}`}>
            <Console.Lucide icon='Edit' className='h-5 w-5' />
          </a>
          <Console.Lucide icon='Trash2' className='h-5 w-5 cursor-pointer' onClick={() => deleteData(row.id)} />
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
    await templates.apiDelete(deleteConfirmationModal.id).then(async (res) => {
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

export const Filter = ({ ...props }) => {
  return (
    <div className="mt-2 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
      {props.children}
    </div>
  )
}

export default ListComponent