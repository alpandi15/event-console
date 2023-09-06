import clsx from "clsx"
import { Console, FormGroupComponent } from "ems-component"
import { useEffect } from "react"
import { useFormContext, useFieldArray } from 'react-hook-form'

const DropdownFormData = ({ type, index }) => {
  const {
    control,
    register,
    watch,
    formState: { errors },
    setValue
  } = useFormContext()

  const { form } = watch()

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: `form.${index}.options`
  })

  const addField = () => {
    append({
      value: null,
    })
  }

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
        <FormGroupComponent
          control={control}
          fields={[
            {
              type: 'text',
              name: `form.${index}.title`,
              id: `form.${index}.title`,
              label: 'Label Text',
              required: true,
              placeholder: 'Please fill label text'
            }
          ]}
          fieldClassNames={{
            groupWapperClassName: 'grid grid-cols-12 gap-4',
            groupLabelClassName: 'col-span-2 text-right',
            groupInputClassName: 'col-span-10'
          }}
        />
      </div>
      <div className="col-span-2"></div>
      <div className="col-span-10">
        <div>
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={addField}>
              <Console.Lucide icon="PlusCircle" className="w-5 h-5 mr-2 hover:text-primary" />
            </div>
            <div className="text-sm">
              {type === 'checkbox' ? 'Multi Answer' : 'Data Dropdown'}
            </div>
            <div className="ml-2 text-danger text-sm">min must have 2 data</div>
          </div>
        </div>
        <div className="mt-6">
          {fields?.map((field, idx2) => {
            return (
              <div key={field?.id} className="my-2 flex items-center">
                <div className="mr-auto w-full">
                  <Console.FormInput
                    id={`form.${index}.options.${idx2}.value`}
                    type="text"
                    placeholder="Options data"
                    className={clsx([
                      "block min-w-full",
                      { "!border-danger": errors?.index?.options.idx2.value }
                    ])}
                    {...register(`form.${index}.options.${idx2}.value`)}
                  />
                  {errors?.index?.options.idx2.value && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors?.index?.options.idx2.value.message === "string" &&
                        errors?.index?.options.idx2.value.message}
                    </div>
                  )}
                </div>
                <div className="w-[50px] flex items-center justify-center">
                  <div className="cursor-pointer" onClick={() => remove(idx2)}>
                    <Console.Lucide icon="XIcon" className="text-danger" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DropdownFormData
