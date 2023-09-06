import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import area from '../../../services/area';
import { createValidation } from './validation';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

const ListComponent = ({
  lists = [],
  meta = [],
  onRefresh,
  isLoading,
  pageSize,
  onPageChange,
  onChangeLimit
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    getValues
  } = useForm({
    resolver: createValidation
  })

  const items = [
    {
      label: 'Area Name',
      render: (row) => row.area_name
    },
    {
      label: 'Created At',
      render: (row) => moment(row.created_at).format('DD MMM YYYY HH:mm:ss')
    },
    {
      label: 'Created By',
      render: (row) => (
        <div className='flex flex-col'>
          <span>{row.created_by.full_name}</span>
          <small>{row.created_by.email}</small>
        </div>
      )
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <Console.Lucide icon='Edit' className='h-5 w-5 cursor-pointer' onClick={() => editData(row.id, row.area_name)} />
          <Console.Lucide icon='Trash2' className='h-5 w-5 cursor-pointer' onClick={() => deleteData(row.id)} />
        </div>
      )
    }
  ]
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null });
  const deleteButtonRef = useRef(null);

  const [editLoading, setEditLoading] = useState(false)
  const [editModal, setEditModal] = useState({ modal: false, id: null, name: null });
  const editButtonRef = useRef(null);

  const editData = (id, name) => {
    setValue('name', name)
    setEditModal({ modal: true, id: id, name: name })
  }

  const deleteData = (id) => {
    setDeleteConfirmationModal({ modal: true, id: id })
  }

  const editProcess = async () => {
    setEditLoading(true)
    const name = getValues('name')
    await area.apiUpdate(editModal.id, { area_name: name }).then(async (res) => {
      await onRefresh()
      Toastify({
        text: 'Success, Area has been updated',
        type: 'success'
      });
      setEditModal({ modal: false, id: '', name: '' })
      setValue('name', '')
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setEditLoading(false)
  }

  const deleteProcess = async () => {
    setDeleteLoading(true)
    await area.apiDelete(deleteConfirmationModal.id).then(async (res) => {
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
        open={editModal.modal}
        onClose={() => {
          setEditModal({ modal: false, id: '', name: '' })
        }}
        initialFocus={editButtonRef}>
        <Console.Dialog.Panel>
          <div className="p-5 text-center">
            <Console.FormGroup className='w-full' mode='horizontal' name="name" label="Area Name" required errors={errors.name}>
              <Console.FormInput
                {...register("name")}
                id="name"
                name="name"
                type="text"
                className={clsx([
                  "block",
                  { "!border-danger": errors.name }
                ])}
                placeholder="Area Name"
                autoComplete="off"
              />
            </Console.FormGroup>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => {
                setEditModal({ modal: false, id: '', name: '' })
              }}
              className="w-24 mr-1"
            >
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="button"
              className="w-24"
              ref={editButtonRef}
              onClick={editProcess}
              isLoading={editLoading}
            >
              Submit
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>

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