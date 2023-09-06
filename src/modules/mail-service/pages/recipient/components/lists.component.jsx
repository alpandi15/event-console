import { Console, ModernTable } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';
import templates from '../../../services/templates';
import { useRef, useState } from 'react';
import ModalUpload from './modal-upload.component';

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
      label: 'List Name',
      render: (row) => row.name
    },
    {
      label: 'Description',
      render: (row) => row.description
    },
    {
      label: 'Total Recipient',
      render: (row) => row.total
    },
    {
      label: 'Created At',
      render: (row) => moment(row.created_at).format('DD MMM YYYY, HH:mm a')
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <Console.Button
            size="sm"
            type="button"
            variant="outline-dark"
            onClick={() => {
              setModalUpload({ modal: true, id: row.id });
            }}
          >
            <Console.Lucide icon="Upload" className="w-4 h-4" />
            Upload
          </Console.Button>
        </div>
      )
    }
  ]
  const [modalUpload, setModalUpload] = useState({ modal: false, id: undefined });
  const closeModalUpload = (show) => {
    setModalUpload(show)
    onRefresh()
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
      <ModalUpload
        isOpen={modalUpload}
        onChange={closeModalUpload}
      />
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