import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState } from 'react'
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
  const [actionModal, setActionModal] = useState({ modal: false, data: null })

  const items = [
    {
      label: 'Company',
      render: (row) => row?.company?.company_name
    },
    {
      label: 'Survey Name',
      render: (row) => row.name
    },
    {
      label: 'Start',
      render: (row) => moment(row.time_start).format('DD MMM YYYY HH:mm:ss'),
      class: 'w-32'
    },
    {
      label: 'End',
      render: (row) => moment(row.time_end).format('DD MMM YYYY HH:mm:ss'),
      class: 'w-32'
    },
    {
      label: 'Questions',
      render: (row) => row.no_of_questions
    },
    {
      label: 'Participants',
      render: (row) => (
        <a href={`/survey/exhibit-survey/participants/${row.id}`}>
          {row.participants}
        </a>
      )
    },
    {
      label: 'Status',
      render: (row) => (
        <span
          className={
            clsx(
              "text-xs font-medium px-2.5 py-1.5 rounded-md",
              { 'bg-amber-400': row.status == 'draft' },
              { 'bg-emerald-400': row.status == 'live' },
              { 'bg-gray-600 text-white': row.status == 'ended' }
            )}>
          {row?.status}
        </span>
      ),
    },
    {
      label: 'Action',
      render: (row) => (
        <div className='flex gap-4'>
          <a href={`/survey/exhibit-survey/${row.id}`}>
            <Console.Lucide icon='Edit' className='h-5 w-5' />
          </a>
          <Console.Lucide icon='View' className='h-5 w-5 cursor-pointer' onClick={() => setActionModal({ modal: true, data: row })} />
        </div>
      )
    }
  ]

  const copyText = (url) => {
    navigator.clipboard.writeText(url);
    Toastify({
      text: 'The survey link is copied to the clipboard',
      type: 'success'
    });
  }

  const gotoUrl = (url) => {
    window.open(url, '_blank');
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
        open={actionModal.modal}
        size="lg"
        onClose={() => {
          setActionModal({ modal: false, data: null })
        }}>
        <Console.Dialog.Panel>
          <div className='ml-auto w-fit pr-2 pt-2'>
            <Console.Lucide
              icon="X"
              className="w-8 h-8 text-danger cursor-pointer transition-all hover:rotate-90"
              onClick={() => setActionModal({ modal: false, data: null })}
            />
          </div>
          <h1 className='px-5 font-semibold text-2xl text-center'>Exhibit Survey Link</h1>
          <div className="w-full p-5 flex justify-center items-stretch gap-4">
            <div className='w-full space-y-2'>
              <h2 className='font-semibold text-lg'>Preview</h2>
              <Console.InputGroup>
                <Console.FormInput type='text' readOnly={true} defaultValue={actionModal?.data?.preview_url} disabled />
                <Console.InputGroup.Text className="text-sm font-medium cursor-pointer hover:bg-primary hover:text-dark" onClick={() => copyText(actionModal?.data?.preview_url)}>
                  <Console.Lucide icon='Copy' />
                </Console.InputGroup.Text>
                <Console.InputGroup.Text className="text-sm font-medium cursor-pointer hover:bg-primary hover:text-dark" onClick={() => gotoUrl(actionModal?.data?.preview_url)}>
                  <Console.Lucide icon='ExternalLink' />
                </Console.InputGroup.Text>
              </Console.InputGroup>
              <img src={actionModal?.data?.qrcode_preview} className='w-full' alt='Survey Preview Qr Code' />
            </div>
            <div className='w-px bg-gray-300 mx-2'></div>
            <div className='w-full space-y-2'>
              <h2 className='font-semibold text-lg'>Live</h2>
              <Console.InputGroup>
                <Console.FormInput type='text' readOnly={true} defaultValue={actionModal?.data?.live_url} disabled />
                <Console.InputGroup.Text className="text-sm font-medium cursor-pointer hover:bg-primary hover:text-dark" onClick={() => copyText(actionModal?.data?.live_url)}>
                  <Console.Lucide icon='Copy' />
                </Console.InputGroup.Text>
                <Console.InputGroup.Text className="text-sm font-medium cursor-pointer hover:bg-primary hover:text-dark" onClick={() => gotoUrl(actionModal?.data?.live_url)}>
                  <Console.Lucide icon='ExternalLink' />
                </Console.InputGroup.Text>
              </Console.InputGroup>
              <img src={actionModal?.data?.qrcode_live} className='w-full' alt='Survey Preview Qr Code' />
            </div>
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