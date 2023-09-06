import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console, Toastify } from 'ems-component'
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import session from "../../services/session";
import { FormProvider, useForm } from "react-hook-form";
import { createValidation } from "./components/validation";
import clsx from "clsx";

const ListPage = () => {
  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(25)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })
  const { register, watch } = useForm();

  const { search } = watch()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await session.apiGetAll({
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

  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const [modal, setModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const showModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
    methods.reset({
      name: '',
      title: '',
      photo: null,
      profile: ''
    })
  }

  const onSubmit = async (values, e) => {
    e.preventDefault()
    setIsLoading(true)
    await session.apiCreate({ name: values.name }).then((res) => {
      Toastify({
        text: 'Success, Session has been created',
        type: 'success'
      });
      fetchAll()
      closeModal()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
      Object.keys(err?.response?.data?.errors)?.map((v) => {
        methods.setError(v, { message: err?.response?.data?.errors[v][0] })
      })
    })

    setIsLoading(false)
  }

  return (
    <>
      <NextSeo title="Sessions | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Sessions</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="mr-2 shadow-md"
          onClick={showModal}
        >
          Add Session
        </Console.Button>
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
        size="lg"
        open={modal}
        onClose={closeModal}>
        <Console.Dialog.Panel>
          <div className="px-5 pt-5">
            <h1 className="text-xl">Add New Session</h1>
          </div>
          <FormProvider {...methods}>
            <div className="p-5 space-y-4">
              <Console.FormGroup className='w-full' mode='horizontal' name="name" label="Name" required errors={methods.formState.errors.name}>
                <Console.FormInput
                  {...methods.register("name")}
                  id="name"
                  name="name"
                  type="text"
                  className={clsx([
                    "block min-w-full",
                    { "!border-danger": methods.formState.errors.name }
                  ])}
                  placeholder="Name"
                  autoComplete="off"
                />
              </Console.FormGroup>
            </div>
            <div className="px-5 pb-8 text-end">
              <Console.Button
                variant="outline-secondary"
                type="button"
                onClick={closeModal}
                className="w-24 mr-1"
              >
                Cancel
              </Console.Button>
              <Console.Button
                variant="primary"
                type="button"
                className="w-24"
                isLoading={isLoading}
                onClick={methods.handleSubmit(onSubmit)}
              >
                Submit
              </Console.Button>
            </div>
          </FormProvider>
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
