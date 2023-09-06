import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { useFormContext } from 'react-hook-form'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'
import DatePickerComponent from "@/src/components/Form/DatetimePicker/DatePicker"
import TimePickerComponent from "@/src/components/Form/DatetimePicker/TimePicker"
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import ReactSelectAsyncCreatable from '@/src/components/Form/ReactSelect/AsyncCreatable'
import moment from 'moment'
import { ExampleList, examplePromiseOptions } from '@/src/services/example.service'
import entrance from '../../../services/entrance'
import FormDateTime from '@/src/components/Form/Datepicker/DateInput'
import PinInput from '@/src/components/Form/PinInput'

const FormComponent = ({ isEdit = false }) => {
  const {
    getValues,
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue
  } = useFormContext()

  const fetchArea = async (e) => {
    const areas = []
    await entrance.apiGetArea({ search: e }).then((res) => {
      res.data.map((v) => {
        areas.push({
          value: v.id,
          label: v.area_name
        })
      })
      if (getValues('areasId') != undefined) {
        const find = areas.find((obj) => obj.value == getValues('areasId'))
        setValue('areas_id', find)
      }
    }).catch((err) => {
      console.log(err)
    })
    return areas
  }

  const fetchTickets = async (e) => {
    const tickets = []
    await entrance.apiGetTicket({ search: e }).then((res) => {
      res.data.map((v) => {
        if (v.subvariant != undefined) {
          tickets.push({
            hookvalue: {
              ev_products_id: v.product.id,
              ev_variants_id: v.variant.id,
              ev_subvariants_id: v.subvariant.id
            },
            value: v.subvariant.id,
            label: `${v.product.detail_product.name} - ${v.variant.variant_name} - ${v.subvariant.variant_name}`
          })
        } else if (v.variant != undefined) {
          tickets.push({
            hookvalue: {
              ev_products_id: v.product.id,
              ev_variants_id: v.variant.id,
            },
            value: v.variant.id,
            label: `${v.product.detail_product.name} - ${v.variant.variant_name}`
          })
        } else {
          tickets.push({
            hookvalue: {
              ev_products_id: v.product.id
            },
            value: v.product.id,
            label: `${v.product.detail_product.name}`
          })
        }
      })
      if (getValues('selectedTickets') != undefined) {
        const selecteds = []
        getValues('selectedTickets').map((v) => {
          let find
          if (v.ev_subvariants_id != undefined) {
            find = tickets.find((obj) => obj.hookvalue.ev_subvariants_id == v.ev_subvariants_id)
          } else if (v.ev_variants_id != undefined) {
            find = tickets.find((obj) => obj.hookvalue.ev_variants_id == v.ev_variants_id)
          } else {
            find = tickets.find((obj) => obj.hookvalue.ev_products_id == v.ev_products_id)
          }
          selecteds.push(find)
        })
        setValue('tickets', selecteds)
      }
    }).catch((err) => {
      console.log(err)
    })

    return tickets
  }

  const goTo = (url) => {
    window.open(url, '_blank').focus();
  }
  return (
    <div className="space-y-4">
      {/* BEGIN: Form Layout */}
      <Console.FormGroup className='w-full' mode='horizontal' name="gate_name" label="Gate Name" required errors={errors.gate_name}>
        <Console.FormInput
          {...register("gate_name")}
          id="gate_name"
          name="gate_name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.gate_name }
          ])}
          placeholder="Gate Name"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="areas_id" label="Area Name" required>
        <ReactSelectAsyncCreatable
          id="areas_id"
          name="areas_id"
          control={control}
          defaultOptions={true}
          placeholder="Area Name"
          loadOption={fetchArea}
          errorMessage={errors.areas_id ? errors.areas_id.message : undefined}
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="tickets" label="Select Ticket" required>
        <ReactSelectAsync
          id="tickets"
          name="tickets"
          isMulti
          control={control}
          placeholder="Select Ticket"
          defaultOptions={true}
          loadOption={fetchTickets}
          errorMessage={errors.tickets ? errors.tickets.message : undefined}
        />
      </Console.FormGroup>
      {
        isEdit && (
          <Console.FormGroup className='w-full' mode='horizontal' name="url" label="URL">
            <Console.InputGroup className='w-full'>
              <Console.FormInput
                {...register("url")}
                id="url"
                name="url"
                type="text"
                className="w-full"
                placeholder="URL"
                disabled
                autoComplete="off"
              />
              <Console.InputGroup.Text className="text-sm font-medium cursor-pointer transition-all hover:bg-primary" onClick={() => goTo(getValues('url'))}>
                <Console.Lucide icon='ExternalLink' />
              </Console.InputGroup.Text>
            </Console.InputGroup>
          </Console.FormGroup>
        )
      }
      <div className="flex gap-4">
        <Console.FormGroup className='w-full' mode='vertical' name="pin" label="PIN" required errors={errors.pin}>
          <PinInput name="pin" control={control} error={errors.pin} />
        </Console.FormGroup>
        <Console.FormGroup className='w-full' mode='vertical' name="pinConfirmation" label="PIN Confirmation" required errors={errors.pinConfirmation}>
          <PinInput name="pinConfirmation" control={control} error={errors.pinConfirmation} />
        </Console.FormGroup>
        <Console.FormGroup className='w-full' mode='vertical' name="max_devices" label="Max Devices" required errors={errors.max_devices}>
          <Console.FormInput
            {...register("max_devices")}
            id="max_devices"
            name="max_devices"
            type="number"
            className={clsx([
              "block min-w-full",
              { "!border-danger": errors.max_devices }
            ])}
            placeholder="Max Devices"
            autoComplete="off"
          />
        </Console.FormGroup>
      </div>
      <div className="flex gap-4">
        <Console.FormGroup className='w-full' mode='vertical' name="open_time" label="Open Time" required errors={errors.open_time}>
          <FormDateTime
            name={`open_time`}
            showTimeSelectOnly
            placeholder="Open Time"
            dateFormat="HH:mm a"
            icon="Timer"
            className={clsx([
              { "!border-danger": errors.open_time }
            ])}
            {...register(`open_time`)}
          />
        </Console.FormGroup>
        <Console.FormGroup className='w-full' mode='vertical' name="close_time" label="Close Time" required errors={errors.close_time}>
          <FormDateTime
            name={`close_time`}
            showTimeSelectOnly
            placeholder="Close Time"
            dateFormat="HH:mm a"
            icon="Timer"
            className={clsx([
              { "!border-danger": errors.close_time }
            ])}
            {...register(`close_time`)}
          />
        </Console.FormGroup>
      </div>
    </div>
  )
}

export default FormComponent
