import { Console } from "ems-component"
import FormImageUpload from "@/src/components/Form/Image/ImageUpload"
import clsx from "clsx"
import { useForm } from 'react-hook-form'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('@/src/components/ReactQuill'), { ssr: false })

const ModalUpload = ({ isOpen, onChange, title }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting }
  } = useForm()

  return (
    <Console.Dialog
      staticBackdrop={true}
      open={isOpen}
      size="lg"
      onClose={() => {
        onChange(false);
      }}
    >
      <Console.Dialog.Panel>
        <Console.Dialog.Description className="p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 border rounded-md p-4">
              <div className="text-lg font-bold text-slate-700">{title}</div>
              <div className="mt-4">
                <Console.FormLabel htmlFor="logo" className="text-sm">Image<span className="text-danger">*</span></Console.FormLabel>
                <div className="flex-1 w-full pt-4 mt-3 border-2 border-dashed rounded-md xl:mt-0 dark:border-darkmode-400">
                  <div className="grid grid-cols-10 gap-4 pl-4 pr-5">
                    <div
                      className="relative col-span-5 cursor-pointer md:col-span-3 h-28 image-fit zoom-in"
                    >
                      <Console.Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6jv-4skVuc3ploaGiSYW5ky7IOoqxtVsKQ&usqp=CAU"
                        alt="Test"
                        className="rounded-md"
                      />
                      <Console.Tippy
                        content="Remove this image?"
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
                      >
                        <Console.Lucide icon="X" className="w-4 h-4" />
                      </Console.Tippy>
                    </div>
                    <div
                      className="relative col-span-5 cursor-pointer md:col-span-3 h-28 image-fit zoom-in"
                    >
                      <Console.Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6jv-4skVuc3ploaGiSYW5ky7IOoqxtVsKQ&usqp=CAU"
                        alt="Test"
                        className="rounded-md"
                      />
                      <Console.Tippy
                        content="Remove this image?"
                        className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 -mt-2 -mr-2 text-white rounded-full bg-danger"
                      >
                        <Console.Lucide icon="X" className="w-4 h-4" />
                      </Console.Tippy>
                    </div>
                  </div>
                  <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                    <Console.Lucide icon="Image" className="w-4 h-4 mr-2" />
                    <span className="mr-1 text-primary">
                      Upload a file
                    </span>
                    <Console.FormInput
                      id="horizontal-form-1"
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <Console.Alert variant="warning">
                    <div className="flex items-center">
                      <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                      <div className="">Maximum 3 files</div>
                    </div>
                  </Console.Alert>
                </div>
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
                  placeholder="Image Title"
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
            Submit
          </Console.Button>
        </Console.Dialog.Footer>
      </Console.Dialog.Panel>
    </Console.Dialog>
  )
}

export default ModalUpload
