import { useEffect, useState } from 'react'
import { Console, FormGroupComponent } from 'ems-component'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { ADDITIONAL_FORM_TYPES } from '@/src/constant'
import RenderFormType from './form-input'
import ReactSelect from '@/src/components/Form/ReactSelect'

const FieldItem = ({ field, index, remove, isInit, setIsInit }) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    setValue
  } = useFormContext()

  const { form, input_type } = watch({ nest: true })
  const watcher = watch({ nest: true })

  useEffect(() => {
    if (!isInit) {
      setValue(`form[${index}].options`, [])
    } else {
      setIsInit(false)
    }
  }, [form[index].input_type])

  return (
    <div className="relative my-4 bg-gray-100/60 p-2 rounded-lg">
      <div className="flex items-center justify-end">
        <div className="cursor-pointer" onClick={remove}>
          <Console.Lucide icon='XSquare' className="w-6 h-6 text-red-400" />
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="w-4/12">
          <FormGroupComponent
            control={control}
            fields={[
              {
                type: 'selection',
                name: `form.${index}.input_type`,
                id: `form.${index}.input_type`,
                label: 'Form Type',
                required: true,
                options: ADDITIONAL_FORM_TYPES
              }
            ]}
            fieldClassNames={{
              groupWapperClassName: 'grid grid-cols-12 gap-4',
              groupLabelClassName: 'col-span-4 text-right',
              groupInputClassName: 'col-span-8'
            }}
          />
        </div>
        <div className="w-8/12">
          <RenderFormType type={form[index]?.input_type} index={index} />
        </div>
      </div>
    </div>
  )
}

const FormComponent = ({ isInit, setIsInit }) => {
  const [lists, setList] = useState([])

  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
    reset
  } = useFormContext()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: 'form'
  })

  const addField = () => {
    append({
      input_type: null,
      title: null,
    })
  }
  return (
    <div className="p-5 box mt-5">
      <div className="flex items-center justify-end">
        <Console.Button type="button" onClick={addField} variant="outline-primary" className="">
          <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
          Add Form
        </Console.Button>
      </div>
      <div>
        {fields?.map((field, index) => {
          return <FieldItem key={field?.id} field={field} index={index} remove={() => remove(index)} isInit={isInit} setIsInit={(val) => setIsInit(val)} />
        })}
      </div>
    </div>
  )
}

export default FormComponent
