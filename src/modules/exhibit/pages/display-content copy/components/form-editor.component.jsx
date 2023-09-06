import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import { examplePromiseOptions } from '@/src/services/example.service'

const ClassicEditor = dynamic(() => import('@/src/components/Form/Ckeditor/ClassicEditor'), { ssr: false })

const FormInviteOrganizer = ({ isEdit = false }) => {
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
              <div className="col-span-12 lg:col-span-4">
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
            <div className="mt-4">
              <Console.FormLabel htmlFor="name" className="text-sm">Content<span className="text-danger">*</span></Console.FormLabel>
              <ClassicEditor
                id="description"
                name="description"
                config={{
                  shouldNotGroupWhenFull: true,
                  toolbar: {
                    // items: [
                    //   'heading', '|',
                    //   'fontfamily', 'fontsize', '|',
                    //   'alignment', '|',
                    //   'fontColor', 'fontBackgroundColor', '|',
                    //   'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                    //   'link', '|',
                    //   'outdent', 'indent', '|',
                    //   'bulletedList', 'numberedList', 'todoList', '|',
                    //   'insertTable', '|',
                    //   'uploadImage', 'blockQuote', '|',
                    //   'undo', 'redo'
                    // ],
                  },
                }}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormInviteOrganizer
