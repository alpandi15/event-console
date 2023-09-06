import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import ticket from '../../../services/ticket'
import { useEffect, useState } from 'react'

const FormInviteOrganizer = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue
  } = useFormContext()

  const { invitationMethod } = watch()

  const getTickets = async (e) => {
    const tickets = []
    await ticket.apiSearch({ invitation: true, search: e }).then((res) => {
      console.log(res)
      res.data.map((v) => {
        if (v.subvariant != undefined) {
          tickets.push({
            value: {
              ev_products_id: v.product.id,
              ev_variants_id: v.variant.id,
              ev_subvariants_id: v.subvariant.id
            },
            label: `${v.product.detail_product.name} - ${v.variant.variant_name} - ${v.subvariant.variant_name}`
          })
        } else if (v.variant != undefined) {
          tickets.push({
            value: {
              ev_products_id: v.product.id,
              ev_variants_id: v.variant.id,
            },
            label: `${v.product.detail_product.name} - ${v.variant.variant_name}`
          })
        } else {
          tickets.push({
            value: {
              ev_products_id: v.product.id
            },
            label: `${v.product.detail_product.name}`
          })
        }
      })
    })
    return tickets
  }

  useEffect(() => {
    if (invitationMethod == undefined) {
      setValue('invitationMethod', 'email')
    }
  }, [])

  return (
    <div className="mt-4 space-y-4 w-full">
      <Console.FormGroup className="w-full" mode='horizontal' label="Invitation Method" required>
        <div className='radio-switcher w-2/5'>
          <label className='w-full'>
            <input type="radio" name='invitationMethod' value="email"  {...register("invitationMethod")} />
            <span className='block !w-full whitespace-nowrap'>E-mail</span>
          </label>
          <label className='w-full'>
            <input type="radio" name='invitationMethod' value="phone"  {...register("invitationMethod")} />
            <span className='block !w-full whitespace-nowrap'>Phone Number</span>
          </label>
        </div>
      </Console.FormGroup>
      {invitationMethod == 'email' ?
        <Console.FormGroup className="w-full" mode="horizontal" name="email" label="Email" required errors={errors.email}>
          <Console.FormInput
            {...register("email")}
            id="email"
            name="email"
            type="email"
            className={clsx([
              "block !w-1/2",
              { "border-danger": errors.email }
            ])}
            placeholder="Email"
            autoComplete="off"
          />
        </Console.FormGroup> :
        <Console.FormGroup className="w-full" mode="horizontal" name="phone" label="Phone Number" required errors={errors.phone_number}>
          <Console.FormInput
            {...register("phone_number")}
            id="phone_number"
            name="phone_number"
            type="number"
            className={clsx([
              "block !w-1/2",
              { "border-danger": errors.phone_number }
            ])}
            placeholder="Phone Number"
            autoComplete="off"
          />
        </Console.FormGroup>
      }
      <Console.FormGroup className="w-full" mode="horizontal" name="ticket_id" label="Search Ticket" required>
        <div className='w-1/2'>
          <ReactSelectAsync
            id="ticket_id"
            name="ticket_id"
            control={control}
            defaultOptions={true}
            placeholder="Search Ticket..."
            loadOption={getTickets}
            errorMessage={errors?.ticket_id?.message}
          />
        </div>
      </Console.FormGroup>
      <Console.FormGroup className="w-full" mode="horizontal" name="qty" label="Qty" required errors={errors.qty}>
        <Console.FormInput type="number" min={1} placeholder="1" {...register("qty")} className='!w-1/6' />
      </Console.FormGroup>
    </div>
  )
}

export default FormInviteOrganizer
