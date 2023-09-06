import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'
import FileUpload from '@/src/components/Form/FileUpload'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import { examplePromiseOptions } from '@/src/services/example.service'
import ReactSelect from '@/src/components/Base/ReactSelect'
import TabClassic from "@/src/components/TabClassic"

const ClassicEditor = dynamic(() => import('@/src/components/Form/Ckeditor/ClassicEditor'), { ssr: false })

const TYPE = [
  { "name": "allow_download", "type": "check" },
  { "name": "description", "type": "text" },
  { "name": "files", "type": "file" }
]

const FormUpload = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useFormContext()
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <div className="border rounded p-4 mb-4 relative">
      <div className="absolute cursor-pointer right-2 top-2">
        <Console.Lucide icon='XSquare' className="w-6 h-6 text-red-400" />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <div>
            <Console.FormLabel htmlFor="name" className="text-sm">File Name<span className="text-danger">*</span></Console.FormLabel>
            <Console.FormInput
              {...register("name")}
              id="name"
              name="name"
              type="text"
              className={clsx([
                "block min-w-full",
                { "border-danger": errors.name }
              ])}
              placeholder="File Name"
              autoComplete="off"
            />
            {errors.name && (
              <div className="mt-2 text-danger text-sm">
                {typeof errors.name.message === "string" &&
                  errors.name.message}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-6">
          <TabClassic onChange={(index) => setTabIndex(index)}>
            <TabClassic.Item>Document/File</TabClassic.Item>
            <TabClassic.Item>Embeded</TabClassic.Item>
          </TabClassic>
          <div className="mt-2">
            {tabIndex === 0 ? (
              <FileUpload
                control={control}
                id="id_file"
                name="id_file"
                wrapperClassName="!w-full !h-[150px]"
              />
            ) : null}
            {tabIndex === 1 ? (
              <Console.FormTextarea
                {...register("embeded")}
                id="embeded"
                name="embeded"
                placeholder="<iframe src='https://www.youtube.com/embed/y4trIR2kpL0'></iframe>"
                className={clsx([
                  "block min-w-full h-[150px]",
                  { "border-danger": errors.embeded }
                ])}
              ></Console.FormTextarea>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

const UploadFiles = () => {
  const [lists, setLists] = useState([])

  return (
    <div className="">
      <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
        <span className="font-medium">Description:</span>
        <div className="pl-4">
          <ul className="list-disc">
            <li>Upload maximum 6 files</li>
            <li>Uploaded Image are up to 5MB in size</li>
            <li>Uploaded Document PDF are up to 50MB in size</li>
            <li>Uploaded Videos are up to 50MB in size</li>
          </ul>
        </div>
      </div>
      <div>
        {lists.map((_, index) => <FormUpload key={index} />)}
      </div>
      <div className="mt-4 w-full">
        <Console.Button onClick={() => setLists([...lists, 'new'])} variant="outline-primary" className="border-dashed w-full">
          <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
          Add New Document
        </Console.Button>
      </div>
    </div>
  )
}

const FormCreateDocument = ({ isEdit = false }) => {
  const [roles, setRoles] = useState([])

  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useFormContext()

  // watch value if chenged
  const { mfa_auth_status } = watch()

  const fetchData = useCallback(async () => {
    const res = await apiGetRoles()
    if (!res.success) {
      return
    }
    setRoles(() => res?.data?.map((d) => ({ value: d?.id, label: d?.name, menu_permission: d?.menu_permission })))
    return
  }, [])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  return (
    <div className="grid grid-cols-12 gap-12">
      <div className="col-span-12">
        <div className="p-5 box mt-5">
          <div className="">
            {/* BEGIN: Form Layout */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-6">
                <Console.FormLabel htmlFor="company_id" className="text-sm">Company<span className="text-danger">*</span></Console.FormLabel>
                <ReactSelectAsync
                  id="company_id"
                  name="company_id"
                  control={control}
                  loadOption={examplePromiseOptions}
                  placeholder="Select Company"
                  controlStyle={errors?.company_id ? { border: '1px solid #ff1e1e' } : {}}
                />
                {errors.company_id && (
                  <div className="mt-2 text-danger text-sm">
                    {typeof errors.company_id.message === "string" &&
                      errors.company_id.message}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 lg:col-span-6">
                  <Console.FormLabel htmlFor="name" className="text-sm">Title Name<span className="text-danger">*</span></Console.FormLabel>
                  <Console.FormInput
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    className={clsx([
                      "block min-w-full",
                      { "border-danger": errors.name }
                    ])}
                    placeholder="Title Name"
                    autoComplete="off"
                  />
                  {errors.name && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors.name.message === "string" &&
                        errors.name.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <Console.FormLabel htmlFor="address_1" className="text-sm">Description<span className="text-danger">*</span></Console.FormLabel>
                  <Console.FormTextarea
                    {...register("address_1")}
                    id="address_1"
                    name="address_1"
                    placeholder="Description"
                    className={clsx([
                      "block min-w-full",
                      { "border-danger": errors.address_1 }
                    ])}
                  ></Console.FormTextarea>
                  {errors.address_1 && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors.address_1.message === "string" &&
                        errors.address_1.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 lg:col-span-6">
                  <Console.FormLabel htmlFor="name" className="text-sm">Upload Files<span className="text-danger">*</span></Console.FormLabel>
                  <UploadFiles />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormCreateDocument
