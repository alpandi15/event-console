import ImageUploader from "@/src/components/Form/ImageUploader"
import clsx from "clsx"
import { useState } from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"
import { createValidation } from '../../artist/components/validation'
import artist from "../../../services/artist"

const { Console, Toastify } = require("ems-component")

const CreateSpeakerComponent = ({ addToSelect }) => {
  const methods = useForm({
    mode: 'onChange',
    resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const { profile } = methods.watch()

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
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('job_title', values.title)
    formData.append('profile', values.profile)
    formData.append('photo', values.photo)

    await artist.apiCreate(formData).then((res) => {
      Toastify({
        text: 'Success, Speaker has been created',
        type: 'success'
      });
      addToSelect(res.data)
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
      <Console.Button type="button" variant='primary' className='!h-fit !py-1 aspect-square' onClick={showModal}>
        +
      </Console.Button>
      <Console.Dialog
        size="lg"
        open={modal}
        onClose={closeModal}>
        <Console.Dialog.Panel>
          <div className="px-5 pt-5">
            <h1 className="text-xl">Add New Speaker</h1>
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
              <Console.FormGroup className='w-full' mode='horizontal' name="title" label="Title">
                <Console.FormInput
                  {...methods.register("title")}
                  id="title"
                  name="title"
                  type="text"
                  className={clsx([
                    "block min-w-full",
                    { "!border-danger": methods.formState.errors.title }
                  ])}
                  placeholder="eg: CEO Identix"
                  autoComplete="off"
                />
              </Console.FormGroup>
              <Console.FormGroup className="w-full items-start" mode='horizontal' name="photo" label="Photo" errors={methods.formState.errors.photo}>
                <div className='w-1/2'>
                  <ImageUploader control={methods.control} name="photo" ratio="square" placeholder="512px X 512px" />
                </div>
                <span className='text-xs italic text-gray-400'>Maximum image upload size 2 MB</span>
              </Console.FormGroup>
              <Console.FormGroup className='w-full' mode='horizontal' name="profile" label="Profile">
                <Console.FormTextarea
                  {...methods.register("profile")}
                  id="profile"
                  name="profile"
                  maxLength={100}
                  className={clsx([
                    "block min-w-full h-20",
                    { "border-danger": methods.formState.errors.profile }
                  ])}
                  placeholder="Profile Description"
                  autoComplete="off"
                />
              </Console.FormGroup>
              <Console.FormHelp className="text-right ml-auto">
                Maximum character {profile?.length || 0}/100
              </Console.FormHelp>
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

export default CreateSpeakerComponent