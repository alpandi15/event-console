import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import InvitationMethods from '@/src/components/CustomForm/InvitationMethods'

const FormInviteOrganizer = ({ isEdit = false }) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useFormContext()

  // watch value if chenged
  const { type } = watch()

  return (
    <div className="">
      {/* BEGIN: Form Layout */}
      <div>
        <InvitationMethods control={control} name="type" />
      </div>
      {
        type === 'email' ? (
          <Console.FormGroup className='w-full transition-all mt-4' mode='horizontal' name="email" label="Email" required errors={errors.email}>
            <Console.FormInput
              {...register("email")}
              id="email"
              name="email"
              type="email"
              className={clsx([
                "block min-w-full",
                { "border-danger": errors.email }
              ])}
              placeholder="Email"
              autoComplete="off"
              disabled={isEdit}
            />
          </Console.FormGroup>
        ) : null
      }

      {
        type === 'phone' ? (
          <Console.FormGroup className='w-full transition-all mt-4' mode='horizontal' name="phone_number" label="Phone Number" required errors={errors.phone_number}>
            <Console.FormInput
              {...register("phone_number")}
              id="phone_number"
              name="phone_number"
              type="text"
              className={clsx([
                "block min-w-full",
                { "border-danger": errors.phone_number }
              ])}
              placeholder="Phone Number"
              autoComplete="off"
              disabled={isEdit}
            />
          </Console.FormGroup>
        ) : null
      }
    </div>
  )
}

export default FormInviteOrganizer
