import { Console } from "ems-component"
import FormImageUpload from "@/src/components/Form/Image/ImageUpload"
import clsx from "clsx"
import { useForm } from 'react-hook-form'
import FileUpload from '@/src/components/Form/FileUpload'

const ModalUpload = ({
  isOpen,
  onChange,
  key = 'upload-file',
  title = 'Upload File',
  filedTitle = 'File'
}) => {
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
    >
      <Console.Dialog.Panel>
        <Console.Dialog.Description className="p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 border rounded-md p-4">
              <div className="text-lg font-bold text-slate-700">{title}</div>
              <div className="mt-4">
                <Console.FormLabel htmlFor="logo" className="text-sm">{filedTitle}<span className="text-danger">*</span></Console.FormLabel>
                <FileUpload
                  key={key}
                  control={control}
                  id="id_file"
                  name="id_file"
                  wrapperClassName="!w-full !h-[255px]"
                // defaultImage="/assets/images/id-card.png"
                />
              </div>
            </div>
          </div>
        </Console.Dialog.Description>
        <Console.Dialog.Footer>
          <Console.Button
            type="button"
            variant="outline-secondary"
            className="w-20 mr-2"
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
