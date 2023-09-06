import { Console } from "ems-component"
import FormImageUpload from "@/src/components/Form/Image/ImageUpload"
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import clsx from "clsx"

const ReactQuill = dynamic(() => import('@/src/components/ReactQuill'), { ssr: false })

const ModalUpload = ({isOpen, onChange}) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting }
  } = useForm()

  return (
    <Console.Dialog
      staticBackdrop={true}
      open={isOpen}
      onClose={() => {
        onChange(false);
      }}
      size="xl"
    >
      <Console.Dialog.Panel>
        <Console.Dialog.Description className="p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 border rounded-md p-4">
              <div className="text-lg font-bold text-slate-700">Upload Banner</div>
              <div className="mt-4">
                <Console.FormLabel htmlFor="banner" className="text-sm">Banner<span className="text-danger">*</span></Console.FormLabel>
                <FormImageUpload
                  name="photo"
                  control={control}
                  wrapperClassName="!w-full !h-[255px]"
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <Console.FormLabel htmlFor="title_name" className="text-sm">Title<span className="text-danger">*</span></Console.FormLabel>
                <Console.FormInput
                  {...register("title_name")}
                  id="title_name"
                  name="title_name"
                  type="text"
                  className={clsx([
                    "block min-w-full",
                    { "border-danger": errors.title_name }
                  ])}
                  placeholder="Banner Title"
                  autoComplete="off"
                />
                {errors.title_name && (
                  <div className="mt-2 text-danger text-sm">
                    {typeof errors.title_name.message === "string" &&
                      errors.title_name.message}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Console.FormLabel htmlFor="description" className="text-sm">Description<span className="text-danger">*</span></Console.FormLabel>
                <ReactQuill />
              </div>
            </div>
          </div>
        </Console.Dialog.Description>
        <Console.Dialog.Footer>
          <Console.Button
            type="button"
            variant="outline-secondary"
            className="w-20 mr-1"
            onClick={() => {
              onChange(false);
            }}
          >
            Cancel
          </Console.Button>
          <Console.Button
            variant="primary"
            type="button"
            className="px-8"
          >
            Upload
          </Console.Button>
        </Console.Dialog.Footer>
      </Console.Dialog.Panel>
    </Console.Dialog>
  )
}

export default ModalUpload
