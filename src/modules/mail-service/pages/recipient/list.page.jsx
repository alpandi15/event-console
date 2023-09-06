import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console, Toastify } from 'ems-component'
import { NextSeo } from 'next-seo'
import { useForm } from 'react-hook-form'
import ListComponent from './components/lists.component'
import recipient from "../../services/recipient";
import { createValidation } from "./components/validation";
import clsx from "clsx";

const ListPage = () => {
  const {
    register,
    formState: { errors },
    getValues,
    reset,
    handleSubmit
  } = useForm({
    resolver: createValidation
  })

  const [lists, setLists] = useState([])
  const [meta, setMetas] = useState([])
  const [loading, setLoading] = useState(false)
  const [PageSize, setPageSize] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [addModal, setAddModal] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })

  const fetchAll = useCallback(async () => {
    setLoading(true)
    await recipient.apiGetAll({
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
  }, [PageSize, currentPage, filterData])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const addProcess = async (values) => {
    setAddLoading(true)
    const formData = {
      name: values.name,
      description: values.description
    }

    await recipient.apiCreate(formData).then((res) => {
      Toastify({
        text: 'Success, Recipient List has been created',
        type: 'success'
      });
      fetchAll()
      setAddModal(false)
      reset()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setAddLoading(false)
  }

  return (
    <>
      <NextSeo title="Mail Service | Recipient List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Recipient List</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="shadow-md"
          type="button"
          onClick={() => setAddModal(true)}
        >
          <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
          New Recipient List
        </Console.Button>
      </div>
      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
        <div className="mt-2 relative z-[1]">
          <ListComponent
            lists={lists}
            meta={meta}
            onRefresh={fetchAll}
            isLoading={loading}
            pageSize={PageSize}
            onPageChange={setCurrentPage}
            onChangeLimit={setPageSize}
          />
          <div className="mt-4">
            <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-100 dark:bg-gray-800 dark:text-yellow-300" role="alert">
              <span className="font-medium">Notes:</span>
              <div className="pl-4">
                <ul className="list-disc">
                  <li>Each List can be uploaded with maximum 5,000 data.</li>
                  <li>Email of recipient list must be unique.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Console.Dialog
        open={addModal}
        onClose={() => {
          setAddModal(false)
        }}>
        <Console.Dialog.Panel>
          <form onSubmit={handleSubmit(addProcess)}>
            <div className="p-5 space-y-4">
              <Console.FormGroup className='w-full' mode='vertical' name="name" label="List Name" required errors={errors.name}>
                <Console.FormInput
                  {...register("name")}
                  id="name"
                  name="name"
                  type="text"
                  className={clsx([
                    "block min-w-full",
                    { "!border-danger": errors.name }
                  ])}
                  placeholder="List Name"
                  autoComplete="off"
                />
              </Console.FormGroup>
              <Console.FormGroup className='w-full' mode='vertical' name="description" label="Description" required errors={errors.description}>
                <Console.FormTextarea
                  {...register("description")}
                  id="description"
                  name="description"
                  placeholder="Description"
                  className={clsx([
                    "block min-w-full",
                    { "!border-danger": errors.description }
                  ])}
                ></Console.FormTextarea>
              </Console.FormGroup>
            </div>
            <div className="px-5 pb-8 text-center">
              <Console.Button
                variant="outline-secondary"
                type="button"
                onClick={() => {
                  setAddModal(false)
                  reset()
                }}
                className="w-24 mr-1" >
                Cancel
              </Console.Button>
              <Console.Button
                variant="primary"
                type="submit"
                className="w-24"
                isLoading={addLoading} >
                Submit
              </Console.Button>
            </div>
          </form>
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
