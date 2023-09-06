import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { useFormContext } from 'react-hook-form'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'
import FileUpload from '@/src/components/Form/FileUpload'
import FormImage from '@/src/components/Form/Image'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import {
  fetchCity,
  fetchCountry,
  fetchProvince
} from '../sarvices/member.service'

const FormInviteOrganizer = ({ isEdit = false }) => {
  const [roles, setRoles] = useState([])

  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    setValue,
  } = useFormContext()

  // watch value if chenged
  const { type } = watch()

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

  // BEGIN: watch changed values
  const { country_id, province_id } = watch()
  // END: watch change values

  // BEGIN: reset value province
  useEffect(() => {
    if (country_id) {
      setValue('province_id', null)
      setValue('city_id', null)
    }
  }, [country_id, setValue])
  useEffect(() => {
    if (province_id) {
      setValue('city_id', null)
    }
  }, [province_id, setValue])
  // END: reset value province

  return (
    <div className="">
      {/* BEGIN: Form Layout */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-4">
          <Console.FormLabel htmlFor="logo" className="text-sm">Company Logo</Console.FormLabel>
          <FormImage
            control={control}
            id="logo"
            name="logo"
            wrapperClassName="!w-[200px] !h-[200px]"
          />
        </div>
      </div>
      <div className="mt-4 w-full">
        <Console.FormLabel htmlFor="company_name" className="text-sm">Company Name<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("company_name")}
          id="company_name"
          name="company_name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.company_name }
          ])}
          placeholder="Company Name"
          autoComplete="off"
        />
        {errors.company_name && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.company_name.message === "string" &&
              errors.company_name.message}
          </div>
        )}
      </div>
      <div className="mt-4 w-full">
        <Console.FormLabel htmlFor="brand" className="text-sm">Brand<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("brand")}
          id="brand"
          name="brand"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.brand }
          ])}
          placeholder="Brand"
          autoComplete="off"
        />
        {errors.brand && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.brand.message === "string" &&
              errors.brand.message}
          </div>
        )}
      </div>
      <div className="mt-4">
        <Console.FormLabel htmlFor="email" className="text-sm">Email<span className="text-danger">*</span></Console.FormLabel>
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
        {errors.email && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.email.message === "string" &&
              errors.email.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="mt-2">
          <Console.FormLabel htmlFor="first_name" className="text-sm">First Name<span className="text-danger">*</span></Console.FormLabel>
          <Console.FormInput
            {...register("first_name")}
            id="first_name"
            name="first_name"
            type="text"
            className={clsx([
              "block min-w-full",
              { "border-danger": errors.first_name }
            ])}
            placeholder="First Name"
            autoComplete="off"
          />
          {errors.first_name && (
            <div className="mt-2 text-danger text-sm">
              {typeof errors.first_name.message === "string" &&
                errors.first_name.message}
            </div>
          )}
        </div>
        <div className="mt-2">
          <Console.FormLabel htmlFor="last_name" className="text-sm">Last Name<span className="text-danger">*</span></Console.FormLabel>
          <Console.FormInput
            {...register("last_name")}
            id="last_name"
            name="last_name"
            type="text"
            className={clsx([
              "block min-w-full",
              { "border-danger": errors.last_name }
            ])}
            placeholder="Last Name"
            autoComplete="off"
          />
          {errors.last_name && (
            <div className="mt-2 text-danger text-sm">
              {typeof errors.last_name.message === "string" &&
                errors.last_name.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 w-full">
        <Console.FormLabel htmlFor="phone_number" className="text-sm">Phone Number<span className="text-danger">*</span></Console.FormLabel>
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
        />
        {errors.phone_number && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.phone_number.message === "string" &&
              errors.phone_number.message}
          </div>
        )}
      </div>
      <div className="mt-2 w-full">
        <Console.FormLabel htmlFor="id_number" className="text-sm">ID Number<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("id_number")}
          id="id_number"
          name="id_number"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.id_number }
          ])}
          placeholder="ID Number"
          autoComplete="off"
        />
        {errors.id_number && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.id_number.message === "string" &&
              errors.id_number.message}
          </div>
        )}
      </div>
      <div className="mt-4">
        <Console.FormLabel htmlFor="id_file" className="text-sm">ID File<span className="text-danger">*</span></Console.FormLabel>
        <FileUpload
          control={control}
          id="id_file"
          name="id_file"
          wrapperClassName="!w-[400px] !h-[200px]"
          defaultImage="/assets/images/id-card.png"
        />
      </div>

      <div className="mt-4 w-full">
        <Console.FormLabel htmlFor="job_title" className="text-sm">Job Title<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("job_title")}
          id="job_title"
          name="job_title"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.job_title }
          ])}
          placeholder="Job Title"
          autoComplete="off"
        />
        {errors.job_title && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.job_title.message === "string" &&
              errors.job_title.message}
          </div>
        )}
      </div>
      <div className="mt-4 w-full">
        <Console.FormLabel htmlFor="gender" className="text-sm">Gender</Console.FormLabel>
        <div className="">
          <ReactSelect
            id="gender"
            name="gender"
            controlStyle={errors?.gender ? { border: '1px solid #ff1e1e' } : {}}
            control={control}
            options={[
              { value: 1, label: 'Mr.' },
              { value: 2, label: 'Mrs.' },
              { value: 3, label: 'Ms.' },
            ]}
          />
        </div>
        {errors.gender && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.gender.message === "string" &&
              errors.gender.message}
          </div>
        )}
      </div>
      <div className="mt-4 w-full">
        <Console.FormLabel htmlFor="message" className="text-sm">Message<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("message")}
          id="message"
          name="message"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.message }
          ])}
          placeholder="Message"
          autoComplete="off"
        />
        {errors.message && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.message.message === "string" &&
              errors.message.message}
          </div>
        )}
      </div>

      {/* COMPANY DATA */}

      <div className="mt-2">
        <Console.FormLabel htmlFor="address_1" className="text-sm">Address 1<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormTextarea
          {...register("address_1")}
          id="address_1"
          name="address_1"
          placeholder="Address 1"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.address_1 }
          ])}
        ></Console.FormTextarea>
        {errors.address_1 && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.address_1.message === "string" &&
              errors.address_1.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="address_2" className="text-sm">Address 2</Console.FormLabel>
        <Console.FormTextarea
          {...register("address_2")}
          id="address_2"
          name="address_2"
          placeholder="Address 2"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.address_2 }
          ])}
        ></Console.FormTextarea>
        {errors.address_2 && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.address_2.message === "string" &&
              errors.address_2.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="country_id" className="text-sm">Country<span className="text-danger">*</span></Console.FormLabel>
        <ReactSelectAsync
          id="country_id"
          name="country_id"
          control={control}
          loadOption={fetchCountry}
          controlStyle={errors?.country_id ? { border: '1px solid #ff1e1e' } : {}}
        />
        {errors.country_id && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.country_id.message === "string" &&
              errors.country_id.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="province_id" className="text-sm">Province<span className="text-danger">*</span></Console.FormLabel>
        <ReactSelectAsync
          id="province_id"
          name="province_id"
          control={control}
          loadOption={(inputValue) => fetchProvince(inputValue, country_id?.value)}
          isDisabled={!country_id?.value}
          controlStyle={errors?.province_id ? { border: '1px solid #ff1e1e' } : {}}
        />
        {errors.province_id && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.province_id.message === "string" &&
              errors.province_id.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="city_id" className="text-sm">City<span className="text-danger">*</span></Console.FormLabel>
        <ReactSelectAsync
          id="city_id"
          name="city_id"
          control={control}
          loadOption={(inputValue) => fetchCity(inputValue, province_id?.value)}
          isDisabled={!province_id?.value}
          controlStyle={errors?.city_id ? { border: '1px solid #ff1e1e' } : {}}
        />
        {errors.city_id && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.city_id.message === "string" &&
              errors.city_id.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="ceo_name" className="text-sm">CEO Name<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("ceo_name")}
          id="ceo_name"
          name="ceo_name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.ceo_name }
          ])}
          placeholder="First Name"
          autoComplete="off"
        />
        {errors.ceo_name && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.ceo_name.message === "string" &&
              errors.ceo_name.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="pic_name" className="text-sm">PIC Name<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("pic_name")}
          id="pic_name"
          name="pic_name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.pic_name }
          ])}
          placeholder="First Name"
          autoComplete="off"
        />
        {errors.pic_name && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.pic_name.message === "string" &&
              errors.pic_name.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="website" className="text-sm">Website</Console.FormLabel>
        <Console.FormInput
          {...register("website")}
          id="website"
          name="website"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.website }
          ])}
          placeholder="Website"
          autoComplete="off"
        />
        {errors.website && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.website.message === "string" &&
              errors.website.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="nib_number" className="text-sm">NIB Number</Console.FormLabel>
        <Console.FormInput
          {...register("nib_number")}
          id="nib_number"
          name="nib_number"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.nib_number }
          ])}
          placeholder="NIB Number"
          autoComplete="off"
        />
        {errors.nib_number && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.nib_number.message === "string" &&
              errors.nib_number.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="tax_number" className="text-sm">Tax Number<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("tax_number")}
          id="tax_number"
          name="tax_number"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.tax_number }
          ])}
          placeholder="First Name"
          autoComplete="off"
        />
        {errors.tax_number && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.tax_number.message === "string" &&
              errors.tax_number.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="billing_email" className="text-sm">Data 1<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("billing_email")}
          id="billing_email"
          name="billing_email"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.billing_email }
          ])}
          placeholder="Data 1"
          autoComplete="off"
        />
        {errors.billing_email && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.billing_email.message === "string" &&
              errors.billing_email.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="data2" className="text-sm">Data 2<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("data2")}
          id="data2"
          name="data2"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.data2 }
          ])}
          placeholder="Data 2"
          autoComplete="off"
        />
        {errors.data2 && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.data2.message === "string" &&
              errors.data2.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="data3" className="text-sm">Data 3<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("data3")}
          id="data3"
          name="data3"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.data3 }
          ])}
          placeholder="Data 3"
          autoComplete="off"
        />
        {errors.data3 && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.data3.message === "string" &&
              errors.data3.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="data4" className="text-sm">Data 4<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("data4")}
          id="data4"
          name="data4"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.data4 }
          ])}
          placeholder="Data 4"
          autoComplete="off"
        />
        {errors.data4 && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.data4.message === "string" &&
              errors.data4.message}
          </div>
        )}
      </div>
      <div className="mt-2">
        <Console.FormLabel htmlFor="billing_email" className="text-sm">Billing Email<span className="text-danger">*</span></Console.FormLabel>
        <Console.FormInput
          {...register("billing_email")}
          id="billing_email"
          name="billing_email"
          type="text"
          className={clsx([
            "block min-w-full",
            { "border-danger": errors.billing_email }
          ])}
          placeholder="First Name"
          autoComplete="off"
        />
        {errors.billing_email && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.billing_email.message === "string" &&
              errors.billing_email.message}
          </div>
        )}
      </div>
      <div className="mt-2 w-full">
        <Console.FormLabel htmlFor="event_status" className="text-sm">Event Status</Console.FormLabel>
        <div className="">
          <ReactSelect
            id="event_status"
            name="event_status"
            controlStyle={errors?.event_status ? { border: '1px solid #ff1e1e' } : {}}
            control={control}
            options={[
              { value: 1, label: 'Invited' },
              { value: 2, label: 'Waiting Approval' },
              { value: 3, label: 'Approved' },
              { value: 4, label: 'Suspended' },
            ]}
          />
        </div>
        {errors.event_status && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors.event_status.message === "string" &&
              errors.event_status.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default FormInviteOrganizer
