import clsx from 'clsx';
import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import { useRef, useState } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import menu from '../../../services/menu';

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
      label: 'Company',
      render: (row) => row.company.company_name
    },
    {
      label: 'Brand Name',
      render: (row) => row.company.brand_name
    },
    {
      label: 'Title',
      render: (row) => row.title
    },
    {
      label: 'Category',
      render: (row) => row.category.name
    },
    {
      label: 'Status',
      render: (row) => (
        <Console.FormSwitch.Input
          id="status"
          className="ml-0 mr-0"
          type="checkbox"
          defaultChecked={row.status}
          onChange={(e) => changeStatus(e, row.id)}
        />
      )
    }
  ]
  const [updateStatusModal, setUpdateStatusModal] = useState({ modal: false, id: null, status: '' });
  const [updating, setUpdating] = useState(false)
  const confirmButtonRef = useRef(null);

  const changeStatus = (e, id) => {
    setUpdateStatusModal({ modal: true, id: id, status: e.target.checked })
  }

  const processUpdateStatus = async (id, status) => {
    setUpdating(true)
    await menu.updateStatusDisplayMenu(id, { status: status }).then(async (res) => {
      await onRefresh()
      Toastify({
        text: 'Success, status has been updated',
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