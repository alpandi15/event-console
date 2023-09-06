import { Console } from "ems-component"
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useEffect, useState } from "react"
import FormVariant from "./form.variant"

const VariantForm = ({ mode }) => {
  const [deletedField, setDeletedField] = useState([])
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "variants"
  });

  const addVariant = () => {
    append({
      variant_name: '',
      price: '',
      stock: ''
    })
  }

  const vRemove = (field, type, index) => {
    const deletedFields = [...deletedField, {
      type: type,
      id: field.variant_id
    }]
    setDeletedField(deletedFields)
    remove(index)
  }

  const bsRemove = (field, type) => {
    const deletedFields = [...deletedField, {
      type: type,
      id: field.variant_id
    }]
    setDeletedField(deletedFields)
  }

  useEffect(() => {
    if (deletedField) {
      setValue('deletedIds', deletedField)
    }
  }, [deletedField])

  return (
    <div className="p-5">
      <div className="flex items-center border-t pt-5 text-lg font-medium">
        Area/Row/Stage/Table
      </div>
      <div className="mt-10 w-8/12">
        <div className="grid grid-cols-2 gap-4">
          {fields &&
            fields?.map((field, index) => (
              <FormVariant key={field?.id} field={field} index={index} removeVariant={() => vRemove(field, 'variant', index)} removeSubVariant={(field) => bsRemove(field, 'subvariant')} mode={mode} />
            ))
          }
        </div>
        <Console.Button variant="primary" className="w-fit" type="button" onClick={addVariant}>
          <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Area/Row/Stage/Table
        </Console.Button>
      </div>
    </div>
  )
}

export default VariantForm