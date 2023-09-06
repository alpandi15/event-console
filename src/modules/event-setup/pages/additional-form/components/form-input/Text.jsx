import clsx from "clsx"
import { Console, FormGroupComponent } from "ems-component"
import { useEffect, useState } from "react"
import { useFormContext } from 'react-hook-form'

const TextFormData = ({ index }) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
    setValue
  } = useFormContext()

  const { form } = watch()

  useEffect(() => {
    setValue(`form.${index}.sort`, index)
  }, [])

  useEffect(() => {
    if (form[index].title != null && form[index].title != '') {
      const val = form[index].title.toLowerCase().replace(/ /g, '_')
      setValue(`form.${index}.form`, val)
    } else {
      setValue(`form.${index}.form`, '')
    }
  }, [form[index].title])
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12">
        <input type="hidden" {...register(`form.${index}.form`)} />
        <input type="hidden" {...register(`form.${index}.sort`)} />
        <div className="flex gap-4 w-full text-end">
          <Console.FormLabel htmlFor={`form.${index}.title`} className="text-sm w-2/12">Label Text<span className="text-danger">*</span></Console.FormLabel>
          <div className="w-10/12">
            <Console.FormInput
              id={`form.${index}.title`}
              type="text"
              placeholder="Please fill label text"
              className={clsx([
                "block min-w-full",
                { "!border-danger": errors?.index?.title }
              ])}
              {...register(`form.${index}.title`)}
            />
            {errors?.index?.title && (
              <div className="mt-2 text-danger text-sm">
                {typeof errors?.index?.title.message === "string" &&
                  errors?.index?.title.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextFormData
