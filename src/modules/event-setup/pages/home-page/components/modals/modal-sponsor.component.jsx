import { Console, Toastify } from "ems-component"
import FormImageUpload from "@/src/components/Form/Image/ImageUpload"
import clsx from "clsx"
import { useForm } from 'react-hook-form'
import { useState } from "react"
import home from "@/src/modules/event-setup/services/home"

const ModalUpload = ({ isOpen, setShow, refetchData }) => {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    getValues,
    reset,
    setValue
  } = useForm()
  const [isLoading, setLoading] = useState()
  const uploadImage = async () => {
    setLoading(true)
    const values = getValues()
    const formData = new FormData()
    formData.append('name', values.sponsor_name)
    formData.append('logo', values.logo)
    await home.sponsor.upload(formData).then((res) => {
      Toastify({
        text: 'Success, Sponsor has been uploaded',
        type: 'success'
      });
      setShow(false);
      reset()
      setValue('sponsor_name', '')
      refetchData()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setLoading(false)
  }
  return (
    <Console.Dialog
      staticBackdrop={true}
      open={isOpen}
      onClose={() => {
        setShow(false);
      }}
    >
      <Console.Dialog.Panel>
        <Console.Dialog.Description className="p-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 border rounded-md p-4">
              <div className="text-lg font-bold text-slate-700">Add Sponsor</div>
              <div className="mt-4">
                <Console.FormLabel htmlFor="logo" className="text-sm">Logo<span className="text-danger">*</span></Console.FormLabel>
                <FormImageUpload
                  name="logo"
                  control={control}
                  // wrapperClassName="!w-full !h-[255px]"
                  className="object-cover"
                />
              </div>
              <div className="mt-4">
                <Console.FormLabel htmlFor="sponsor_name" className="text-sm">Name<span className="text-danger">*</span></Console.FormLabel>
                <Console.FormInput
                  {...register("sponsor_name")}
                  id="sponsor_name"
                  name="sponsor_name"
                  type="text"
                  className={clsx([
                    "block min-w-full",
                    { "border-danger": errors.sponsor_name }
                  ])}
                  placeholder="PT. Satu Pintu"
                  autoComplete="off"
                />
                {errors.sponsor_name && (
                  <div className="mt-2 text-danger text-sm">
                    {typeof errors.sponsor_name.message === "string" &&
                      errors.sponsor_name.message}
                  </div>
                )}
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
              setShow(false);
            }}>
            Cancel
          </Console.Button>
          <Console.Button
            variant="primary"
            type="button"
            className="px-8"
            onClick={uploadImage}
            isLoading={isLoading}
            disabled={isLoading}>
            Submit
          </Console.Button>
        </Console.Dialog.Footer>
      </Console.Dialog.Panel>
    </Console.Dialog>
  )
}

export default ModalUpload
