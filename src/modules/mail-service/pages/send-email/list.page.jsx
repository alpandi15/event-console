import _ from "lodash";
import { useCallback, useEffect, useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console, Toastify } from 'ems-component'
import { NextSeo } from 'next-seo'
import ListComponent from './components/lists.component'
import send from "../../services/send";
import { createValidation } from "./components/validation";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import ReactSelectAsync from "@/src/components/Form/ReactSelect/Async";

const ListPage = () => {
  const {
    register,
    control,
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
    await send.apiGetAll({
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

  const fetchRecipient = async (e) => {
    const recipients = []
    await send.getRecipients({ search: e }).then((res) => {
      res.data.map((v) => {
        recipients.push({
          value: v.id,
          label: v.name
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    return recipients
  }
  const fetchTemplate = async (e) => {
    const templates = []
    await send.getTemplates({ search: e }).then((res) => {
      res.data.map((v) => {
        templates.push({
          value: v.id,
          label: v.name
        })
      })
    }).catch((err) => {
      console.log(err)
    })
    return templates
  }

  const sendMail = async (values) => {
    setAddLoading(true)
    const formData = {
      recipients_id: values.recipient_id.value,
      templates_id: values.template_id.value
    }

    await send.apiCreate(formData).then((res) => {
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
      <NextSeo title="Mail Service | Send Email | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Send Email</h2>
      <div className="mt-8 flex items-center justify-start">
        <Console.Button
          variant="primary"
          className="shadow-md"
          type="button"
          onClick={() => setAddModal(true)}
        >
          <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
          New Send
        </Console.Button>
      </div>
      <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
        <div className="relative z-[1]">
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
      <Console.Dialog
        open={addModal}
        onClose={() => {
          setAddModal(false)
        }}>
        <Console.Dialog.Panel>
          <form onSubmit={handleSubmit(sendMail)}>
            <div className="p-5 space-y-4">
              <Console.FormGroup className='w-full' mode='vertical' name="recipient_id" label="Select Recipient" required errors={errors.recipient_id}>
                <ReactSelectAsync
                  id="recipient_id"
                  name="recipient_id"
                  control={control}
                  placeholder="Select Recipient"
                  defaultOptions={true}
                  loadOption={fetchRecipient}
                  errorMessage={errors.recipient_id ? errors.recipient_id.message : undefined}
                />
              </Console.FormGroup>
              <Console.FormGroup className='w-full' mode='vertical' name="template_id" label="Select Template" required errors={errors.template_id}>
                <ReactSelectAsync
                  id="template_id"
                  name="template_id"
                  control={control}
                  placeholder="Select Template"
                  defaultOptions={true}
                  loadOption={fetchTemplate}
                  errorMessage={errors.template_id ? errors.template_id.message : undefined}
                />
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
                Send
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
