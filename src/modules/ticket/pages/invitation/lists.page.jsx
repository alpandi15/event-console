import _ from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import ReactSelect from '@/src/components/Base/ReactSelect'
import Router from 'next/router'
import invitation from "../../services/invitation";
import { useForm } from "react-hook-form";
import ButtonSwitcher from "@/src/components/Base/ButtonSwitcher";
import ticket from "../../services/ticket";
import ReactSelectAsync from "@/src/components/Form/ReactSelect/Async";

const ListData = () => {
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [importModal, setImportModal] = useState(false)
  const [importing, setImporting] = useState(false)
  const [importSwitcher, setImportSwitcher] = useState(false)
  const { register, control, watch, resetField, getValues } = useForm();
  const { search } = watch()

  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status_event: undefined
  })

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await invitation.apiGetAll({
      search: search,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    }).then((res) => {
      setLists(res?.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
    }).catch((err) => {
      console.log(err)
    })
    setLoading(false)
  }, [PageSize, currentPage, filterData, search])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const filterStatus = async (status_event) => {
    if (!status_event) {
      setFilterData({
        ...filterData,
        status_event: undefined
      })
      return
    }
    setFilterData({
      ...filterData,
      status_event
    })
  }

  const getTickets = async (e) => {
    const tickets = []
    await ticket.apiSearch({ invitation: true, search: e }).then((res) => {
      res.data.map((v) => {
        if (v.subvariant != undefined) {
          tickets.push({
            value: {
              ev_products_id: v.product.id,
              ev_variants_id: v.variant.id,
              ev_subvariants_id: v.subvariant.id
            },
            label: `${v.product.detail_product.name} - ${v.variant.variant_name} - ${v.subvariant.variant_name}`
          })
        } else if (v.variant != undefined) {
          tickets.push({
            value: {
              ev_products_id: v.product.id,
              ev_variants_id: v.variant.id,
            },
            label: `${v.product.detail_product.name} - ${v.variant.variant_name}`
          })
        } else {
          tickets.push({
            value: {
              ev_products_id: v.product.id
            },
            label: `${v.product.detail_product.name}`
          })
        }
      })
    })
    return tickets
  }

  const showImportModal = () => {
    setImportModal(true)
    setImportSwitcher(false)
  }

  const closeImportModal = () => {
    setImportModal(false)
    resetField("ticket_id")
    resetField("file")
  }

  const importData = async () => {
    const formData = {
      ev_products_id: getValues('ticket_id').value.ev_products_id,
      file: getValues('file')[0]
    }
    if (getValues('ticket_id').value.ev_variants_id != undefined) {
      formData['ev_variants_id'] = getValues('ticket_id').value.ev_variants_id
    }
    if (getValues('ticket_id').value.ev_subvariants_id != undefined) {
      formData['ev_subvariants_id'] = getValues('ticket_id').value.ev_subvariants_id
    }
  }

  return (
    <>
      <NextSeo title="Ticket Invitation | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Ticket Invitation</h2>

      <div className="mt-8 flex items-center justify-between">
        <Console.Button
          variant="primary"
          className="px-4 shadow-md"
          onClick={() => Router.push(`${Router.asPath}/invite`)}
        >
          <Console.Lucide icon="Send" className="mr-2 w-4 h-4" />
          Invite
        </Console.Button>
        <ButtonSwitcher icon="Sheet" label="Import" variant="excel" show={importSwitcher} setShow={(show) => setImportSwitcher(show)}>
          <a href={'https://staging-upload.identix.events/examples/invitation_example.xlsx'} className="px-4 py-2 border-r hover:bg-primary text-center">
            Download Template
          </a>
          <div className="px-4 py-2 hover:bg-primary text-center" onClick={() => showImportModal()}>
            Upload File
          </div>
        </ButtonSwitcher>
      </div>

      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
        <div className="flex items-center justify-end intro-y gap-4">
          <div className="relative w-56 text-slate-500">
            <Console.FormInput
              type="text"
              className="w-56 pr-10"
              placeholder="Search..."
              {...register('search')}
            />
            <Console.Lucide
              icon="Search"
              className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
            />
          </div>
          <div className="ml-2 w-48">
            <ReactSelect
              placeholder="Status"
              onChange={(e) => filterStatus(e.value)}
              options={[
                { value: '', label: 'All' },
                { value: 'invited', label: 'Invited' },
                { value: 'registered', label: 'Registered' }
              ]}
            />
          </div>
        </div>
        <div className="mt-6 relative z-[1]">
          <div className="overflow-hidden mt-2">
            <ListComponent
              lists={lists}
              meta={meta}
              onRefresh={fetchAll}
              isLoading={loading}
              pageSize={PageSize}
              onPageChange={setCurrentPage}
              onChangeLimit={setPageSize}
            />
          </div>
        </div>
      </div>

      <Console.Dialog
        open={importModal}
        onClose={() => closeImportModal()}>
        <Console.Dialog.Panel>
          <div className="p-5">
            <div className="text-center">
              <h1 className="font-semibold text-2xl">Import Ticket Invitation</h1>
            </div>
            <div className="w-full mt-4">
              <Console.FormLabel htmlFor="ticket_id" className="text-sm">Search Ticket<span className="text-danger">*</span></Console.FormLabel>
              <ReactSelectAsync
                id="ticket_id"
                name="ticket_id"
                control={control}
                placeholder="Search Ticket..."
                defaultOptions={true}
                loadOption={getTickets}
              />
            </div>
            <div className="w-full mt-4">
              <Console.FormLabel htmlFor="ticket_id" className="text-sm">Upload File<span className="text-danger">*</span></Console.FormLabel>
              <input type="file" name="file" {...register('file')} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            </div>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => closeImportModal()}
              className="w-24 mr-1">
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="button"
              className="w-fit"
              onClick={() => importData()}
              disabled={importing}
              isLoading={importing}>
              Import
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
    </>
  )
}

ListData.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListData
