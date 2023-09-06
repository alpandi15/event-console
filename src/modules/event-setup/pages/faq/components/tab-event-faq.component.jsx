import { Console, Toastify } from "ems-component"
import _, { debounce } from "lodash";
import { useEffect, useRef, useState } from "react"
import { useForm, FormProvider, useFormContext, useFieldArray } from "react-hook-form"
import dynamic from 'next/dynamic'
import faq from "../../../services/faq"
import clsx from "clsx";

const ReactQuill = dynamic(() => import('@/src/components/ReactQuill'), { ssr: false })

const TabEventFAQ = () => {
  const {
    control,
    register,
    watch,
    handleSubmit,
    reset
  } = useForm()

  const [newPost, setNewPost] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [lists, setLists] = useState([])
  const addBox = useRef(null)

  const addFaq = async () => {
    await setNewPost(true)
    addBox.current.scrollIntoView()
    window.addEventListener('scrollend', debounce(() => {
      document.getElementById('title').focus()
    }, 150), { once: true })
  }

  const fetchData = async () => {
    setIsLoading(true)
    await faq.get({ type: 'event' }).then((res) => {
      setLists(res.data)
    }).catch((err) => {
      console.log(err)
    })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onSubmit = async (values) => {
    setLoading(true)
    const formData = {
      title: values.title,
      html: values.html,
      type: 'event'
    }

    await faq.create(formData).then((res) => {
      Toastify({
        text: "Success!, Faq has been created",
        type: 'success'
      });
      setNewPost(false)
      reset()
      fetchData()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })

    setLoading(false)
  }

  return (
    <div className="mt-4">
      <div className="flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
        <div className="">
          <h2 className="text-xl font-bold">
            Create your FAQ for participants
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button onClick={addFaq} type="button" className="bg-primary w-[45px] h-[45px] rounded-full flex items-center justify-center">
          <Console.Lucide icon="Plus" className="text-white w-6 h-6" />
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {isLoading ?
          <div className="box w-full p-6 bg-gray-300 animate-pulse"></div> :
          lists && lists.map((v, k) =>
            <Items field={v} key={k} refetch={() => fetchData()} />
          )
        }
      </div>
      {newPost &&
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="box p-4 mt-4" ref={addBox}>
            <div className="flex items center justify-between">
              <div className="w-full mr-auto">
                <Console.FormInput
                  {...register('title')}
                  control={control}
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Type FAQ Title Here..."
                />
              </div>
            </div>
            <div className="mt-2">
              <ReactQuill name={`html`} control={control} {...register(`html`)} />
            </div>
            <div className="flex flex-col justify-end gap-2 mt-5 md:!flex-row">
              <Console.Button
                variant="dark"
                type="button"
                className="w-fit px-10 py-3"
                disabled={loading}
                onClick={() => setNewPost(false)}>
                Cancel
              </Console.Button>
              <Console.Button
                variant="primary"
                type="submit"
                className="w-fit px-10 py-3"
                disabled={loading}
                isLoading={loading}>
                Submit
              </Console.Button>
            </div>
          </div>
        </form>
      }
    </div>
  )
}

const Items = ({ field, refetch }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [expand, setExpand] = useState(false)
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [formData, setFormData] = useState({
    id: null,
    title: null,
    html: null
  })
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState({ modal: false, id: null })

  const {
    control,
    register,
    setValue,
    handleSubmit
  } = useForm()

  useEffect(() => {
    setValue('id', formData.id)
    setValue('title', formData.title)
    setValue('html', formData.html)
  }, [formData])

  const toggleExpand = () => {
    expand ? setExpand(false) : setExpand(true)
  }

  const toggleEdit = (id, title, html) => {
    if (isEdit) {
      setIsEdit(false)
      setFormData({
        id: null,
        title: null,
        html: null
      })
    } else {
      setIsEdit(true)
      setFormData({
        id: id,
        title: title,
        html: html
      })
    }
  }
  const onSubmit = async (values) => {
    setLoading(true)
    const formData = {
      title: values.title,
      html: values.html
    }

    await faq.update(values.id, formData).then((res) => {
      Toastify({
        text: "Success!, Faq has been updated",
        type: 'success'
      });
      toggleEdit()
      refetch()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setLoading(false)
  }

  const deleteData = (id) => {
    setDeleteConfirmationModal({ modal: true, id: id })
  }

  const deleteProcess = async (id) => {
    setDeleteLoading(true)
    await faq.delete(id).then((res) => {
      Toastify({
        text: "Success!, Faq has been deleted",
        type: 'success'
      });
      setDeleteConfirmationModal({ modal: false, id: null })
      refetch()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setDeleteLoading(false)
  }
  return (
    !isEdit ? (
      <div className="w-full box overflow-hidden">
        <div className="px-5 bg-primary flex gap-4 justify-between items-center">
          <div className="flex py-4 gap-2 cursor-pointer transition-all hover:text-white w-full" onClick={toggleExpand}>
            <Console.Lucide icon="ChevronDown" className={clsx(
              "w-6 h-6 transition-transform",
              { 'rotate-180': expand }
            )} />
            <h2 className="font-semibold">{field.title}</h2>
          </div>
          <Console.Lucide icon="Edit" className="w-6 h-6 cursor-pointer hover:text-white" onClick={() => toggleEdit(field.id, field.title, field.html)} />
          <Console.Lucide icon="Trash" className="w-6 h-6 cursor-pointer hover:text-white" onClick={() => deleteData(field.id)} />
        </div>
        <div className={clsx(
          "prose p-5",
          expand ? "block" : "hidden"
        )} dangerouslySetInnerHTML={{ __html: field.html }}></div>

        <Console.Dialog
          open={deleteConfirmationModal.modal}
          onClose={() => setDeleteConfirmationModal({ modal: false, id: null })}>
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
                onClick={() => setDeleteConfirmationModal({ modal: false, id: null })}
                className="w-24 mr-1"
                disabled={deleteLoading}>
                Cancel
              </Console.Button>
              <Console.Button
                variant="danger"
                type="button"
                className="w-24"
                onClick={() => deleteProcess(deleteConfirmationModal.id)}
                isLoading={deleteLoading}
                disabled={deleteLoading}>
                Delete
              </Console.Button>
            </div>
          </Console.Dialog.Panel>
        </Console.Dialog>
      </div>
    ) : (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="box p-4">
          <div className="flex gap-4 items-center justify-between">
            <div className="w-full mr-auto">
              <input type="hidden" {...register('id')} />
              <Console.FormInput
                id={`title`}
                {...register(`title`)}
                type="text"
                placeholder="Type FAQ Title Here..."
              />
            </div>
            <Console.Lucide icon="X" className="w-6 h-6 cursor-pointer transition-all hover:text-primary hover:rotate-90" onClick={toggleEdit} />
          </div>
          <div className="mt-2">
            <ReactQuill name="html" control={control} {...register(`html`)} />
          </div>
          <div className="flex flex-col justify-end gap-2 mt-5 md:!flex-row">
            <Console.Button
              variant="dark"
              type="button"
              className="w-fit px-10 py-3"
              disabled={loading}
              onClick={toggleEdit}>
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="submit"
              className="w-fit px-10 py-3"
              disabled={loading}
              isLoading={loading}>
              Submit
            </Console.Button>
          </div>
        </div>
      </form>
    )
  )
}

export default TabEventFAQ