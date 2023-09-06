import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console, Toastify } from 'ems-component'
import { NextSeo } from 'next-seo'
import { SwitchGridList } from '@/src/components/Base'
import ListComponent from './components/lists.component'
import CardComponent from './components/card.component'
import room from "../../services/room";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { createValidation } from "./components/validation";
import clsx from "clsx";


const ListPage = () => {
  const router = useRouter()
  const [viewType, setViewType] = useState(0) // 0:list; 1:grid;
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [PageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })

  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const [formModal, setFormModal] = useState({ modal: false, id: undefined })

  const { register, watch } = useForm();

  const { search } = watch()

  const { room_name, room_no } = methods.watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await room.apiGetAll({
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

  const closeModal = () => {
    setFormModal({ modal: false, id: undefined })
    methods.setValue('room_name', '')
    methods.setValue('room_no', '')
  }

  const showModalAsEdit = (e) => {
    setFormModal({ modal: true, id: e.id })
    methods.setValue('room_name', e.room_name)
    methods.setValue('room_no', e.room_no)
  }

  const submitProcess = async () => {
    const values = methods.getValues()
    const id = formModal.id

    const formData = {
      room_name: values.room_name,
      room_no: values.room_no
    }

    if (id) {
      await room.apiUpdate(id, formData).then((res) => {
        Toastify({
          text: 'Success, Room has been updated',
          type: 'success'
        });
        fetchAll()
        closeModal()
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
        return
      })
    } else {
      await room.apiCreate(formData).then((res) => {
        Toastify({
          text: 'Success, Room has been created',
          type: 'success'
        });
        fetchAll()
        closeModal()
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
        return
      })
    }
  }

  return (
    <>
      <NextSeo title="Stage/Room | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Stage/Room</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={() => setFormModal({ modal: true, id: undefined })}
        >
          Add New
        </Console.Button>
      </div>
      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
        <div className="flex items-center justify-end intro-y gap-4">
          <div className="">
            <SwitchGridList defaultIndex={viewType} onChange={(index) => setViewType(index)} />
          </div>
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
        </div>
        <div className="mt-6 relative z-[1]">
          <div className="overflow-hidden mt-2">
            {viewType === 0 ? (
              <ListComponent
                lists={lists}
                meta={meta}
                onRefresh={fetchAll}
                isLoading={loading}
                pageSize={PageSize}
                onPageChange={setCurrentPage}
                onChangeLimit={setPageSize}
                isEdit={(e) => showModalAsEdit(e)}
              />
            ) : (
              <CardComponent
                lists={lists}
                meta={meta}
                onRefresh={fetchAll}
                isLoading={loading}
                pageSize={PageSize}
                onPageChange={setCurrentPage}
                onChangeLimit={setPageSize} />
            )}
          </div>
        </div>
      </div>
      <Console.Dialog
        open={formModal.modal}
        onClose={() => closeModal()}>
        <Console.Dialog.Panel>
          <div className="px-5 pt-5">
            <h1 className="font-bold">{formModal.id ? 'Edit' : 'Add'} Stage/Room</h1>
          </div>
          <div className="p-5 text-center space-y-2">
            <Console.FormGroup className='w-full' mode='horizontal' name="room_name" label="Room Name" required errors={methods.formState.errors.room_name}>
              <Console.FormInput
                {...methods.register("room_name")}
                id="room_name"
                name="room_name"
                type="text"
                className={clsx([
                  "block min-w-full",
                  { "!border-danger": methods.formState.errors.room_name }
                ])}
                placeholder="Room Name"
                autoComplete="off"
                maxLength={100}
              />
              <Console.FormHelp className="float-right ml-auto">
                {room_name?.length || 0}/100
              </Console.FormHelp>
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="room_no" label="Room Number">
              <Console.FormInput
                {...methods.register("room_no")}
                id="room_no"
                name="room_no"
                type="number"
                maxLength={5}
                className={clsx([
                  "block min-w-full",
                  { "!border-danger": methods.formState.errors.room_no }
                ])}
                placeholder="Room Number"
                autoComplete="off"
              />
              <Console.FormHelp className="float-right ml-auto">
                {room_no?.length || 0}/5
              </Console.FormHelp>
            </Console.FormGroup>
          </div>
          <div className="px-5 pb-8 text-center">
            <Console.Button
              variant="outline-secondary"
              type="button"
              onClick={() => closeModal()}
              className="w-24 mr-1"
            >
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="button"
              className="w-24"
              onClick={() => methods.handleSubmit(submitProcess())}
              isLoading={isLoading}
            >
              Submit
            </Console.Button>
          </div>
        </Console.Dialog.Panel>
      </Console.Dialog>
    </>
  )
}

ListPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListPage
