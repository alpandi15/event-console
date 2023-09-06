import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import FormImage from '@/src/components/Form/Image'
import ImageUploader from '@/src/components/Form/ImageUploader'
import { useEffect } from 'react'

const FormComponent = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useFormContext()

  const { profile } = watch()

  return (
    <div className="space-y-4 w-1/2">
      {/* BEGIN: Form Layout */}
      <Console.FormGroup className='w-full' mode='horizontal' name="name" label="Name" required errors={errors.name}>
        <Console.FormInput
          {...register("name")}
          id="name"
          name="name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.name }
          ])}
          placeholder="Name"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="title" label="Title">
        <Console.FormInput
          {...register("title")}
          id="title"
          name="title"
          type="text"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.title }
          ])}
          placeholder="eg: CEO Identix"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className="w-full items-start" mode='horizontal' name="photo" label="Photo" errors={errors.photo}>
        <div className='w-1/2'>
          <ImageUploader control={control} name="photo" ratio="square" placeholder="512px X 512px" />
        </div>
        <span className='text-xs italic text-gray-400'>Maximum image upload size 2 MB</span>
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="profile" label="Profile">
        <Console.FormTextarea
          {...register("profile")}
          id="profile"
          name="profile"
          maxLength={100}
          className={clsx([
            "block min-w-full h-20",
            { "border-danger": errors.profile }
          ])}
          placeholder="Profile Description"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormHelp className="text-right ml-auto">
        Maximum character {profile?.length || 0}/100
      </Console.FormHelp>
    </div>
  )
}

export default FormComponent
