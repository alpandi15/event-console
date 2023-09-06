import clsx from "clsx"
import { Console, FormGroupComponent } from "ems-component"
import { useEffect, useState } from "react"
import { useFormContext, useFieldArray } from 'react-hook-form'

const UploadFormData = ({ type, index }) => {
  const {
    control,
    watch,
    setValue
  } = useFormContext()

  const { fields, append, remove } = useFieldArray({
    control,
    name: `form.${index}.options`
  })

  const { form } = watch()

  const addField = () => {
    append({
      value: null,
      form: null,
      sort: null
    })
  }

  // useEffect(() => {
  //   if (form[index].optionsData != undefined) {
  //     setValue(`form.${index}.options`, form[index].optionsData)
  //   }
  // }, [form[index].optionsData])

  return (
    <div className="w-full mt-2">
      <div className="w-full h-full flex items-center">
        <div>
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={addField}>
              <Console.Lucide icon="PlusCircle" className="w-5 h-5 mr-2 hover:text-primary" />
            </div>
            <div className="text-sm">
              Upload
            </div>
            <div className="ml-2 text-danger text-sm">Only image format are allowed (JPG, JPEG, PNG)</div>
          </div>
        </div>
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-10">
        <div className="">
          {fields?.map((field, idx2) => (
            <UploadItems key={field.id} field={field} parent={index} index={idx2} remove={() => remove(idx2)} />
          ))}
        </div>
      </div>
    </div>
  )
}

const UploadItems = ({ field, index, remove, parent }) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
    setValue
  } = useFormContext()

  const { form } = watch()

  useEffect(() => {
    setValue(`form.${parent}.options[${index}].sort`, parent + index)
  }, [])

  useEffect(() => {
    if (form[parent]?.options[index]?.value != null && form[parent]?.options[index]?.value != '') {
      const val = form[parent].options[index].value.toLowerCase().replace(/ /g, '_')
      setValue(`form.${parent}.options[${index}].form`, val)
    } else {
      setValue(`form.${parent}.options[${index}].form`, '')
    }
  }, [form[parent].options[index]])

  return (
    <div key={field?.id} className="my-2 flex items-center">
      <div className="mr-auto w-full">
        <input type="hidden" {...register(`form.${parent}.options.${index}.form`)} />
        <input type="hidden" {...register(`form.${parent}.options.${index}.sort`)} />
        <Console.FormInput
          id={`form.${parent}.options.${index}.value`}
          type="text"
          placeholder="Please fill label text, example: KTP"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors?.parent?.options.index.value }
          ])}
          {...register(`form.${parent}.options.${index}.value`)}
        />
        {errors?.parent?.options.index.value && (
          <div className="mt-2 text-danger text-sm">
            {typeof errors?.parent?.options.index.value.message === "string" &&
              errors?.parent?.options.index.value.message}
          </div>
        )}
      </div>
      <div className="w-[50px] flex items-center justify-center">
        <div className="cursor-pointer" onClick={remove}>
          <Console.Lucide icon="XIcon" className="text-danger" />
        </div>
      </div>
    </div>
  )
}

export default UploadFormData
