import { Console } from "ems-component"
import { useFieldArray, useFormContext } from 'react-hook-form'
import clsx from "clsx"
import FormSubVariant from "./form.sub.bench"

const FormVariant = ({ field, index, removeVariant, mode, removeSubVariant }) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue
  } = useFormContext()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: `variants.${index}.subvariants`
  });

  const addSubVariant = () => {
    append({})
  }

  const { form } = watch()
  const watchVariantName = watch(`variants.${index}.variant_name`)
  const parentIndex = index

  const rVariant = (field, index) => {
    removeSubVariant(field)
    remove(index)
  }

  return (
    <div className="p-4 mb-4 border border-slate-200/60 bg-gray-50 shadow rounded">
      <div className="w-full flex justify-end mb-2">
        <Console.Button variant="soft-danger" type="button" onClick={removeVariant}>
          <Console.Lucide icon="Trash2" className="w-4 h-4" />
        </Console.Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Console.FormGroup className="w-full" mode='vertical' name={`variants.${index}.variant_name`} label="Name" required errors={errors.variants?.[index]?.variant_name}>
          <Console.FormInput
            {...register(`variants.${index}.variant_name`)}
            id={`variants.${index}.variant_name`}
            name={`variants.${index}.variant_name`}
            type="text"
            className={clsx([
              "block min-w-full",
              { "!border-danger": errors.variants?.[index]?.variant_name }
            ])}
            placeholder="eg: CAT 1"
            autoComplete="off"
          />
        </Console.FormGroup>
        <Console.FormGroup className="w-full" mode='vertical' name={`variants.${index}.variant_type`} label="Add Information">
          <Console.FormInput
            {...register(`variants.${index}.variant_type`)}
            id={`variants.${index}.variant_type`}
            name={`variants.${index}.variant_type`}
            type="text"
            className={clsx([
              "block min-w-full",
              { "!border-danger": errors.variants?.[index]?.variant_type }
            ])}
            placeholder="eg: Row"
            autoComplete="off"
          />
        </Console.FormGroup>
        <Console.FormGroup className="w-full" mode='vertical' name={`variants.${index}.price`} label="Price" required errors={errors.variants?.[index]?.price}>
          <Console.InputGroup>
            <Console.InputGroup.Text className="text-sm font-medium">IDR</Console.InputGroup.Text>
            <Console.FormInput
              {...register(`variants.${index}.price`)}
              id={`variants.${index}.price`}
              name={`variants.${index}.price`}
              type="number"
              thousandseparator={true}
              className={clsx([
                "block",
                { "!border-danger": errors.variants?.[index]?.price }
              ])}
              placeholder="Price"
              autoComplete="off"
            />
          </Console.InputGroup>
        </Console.FormGroup>
        <Console.FormGroup className="w-full" mode='vertical' name={`variants.${index}.stock`} label="Stock" required errors={errors.variants?.[index]?.stock}>
          <div className="flex gap-4">
            <Console.FormInput
              {...register(`variants.${index}.stock`)}
              id={`variants.${index}.stock`}
              name={`variants.${index}.stock`}
              type="number"
              thousandseparator={true}
              className={clsx([
                "block",
                { "!border-danger": errors.variants?.[index]?.stock }
              ])}
              placeholder="Stock"
              autoComplete="off"
            />
          </div>
        </Console.FormGroup>
      </div>
      <div className="mt-4 pt-4 border-dashed border-t border-slate-200/600">
        <Console.Button variant="primary" type="button" onClick={addSubVariant}>
          <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
          <div className="text-sm font-normal">Setup Seat</div>
        </Console.Button>
        {
          fields?.length ? (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <Console.Table className="">
                  <Console.Table.Thead variant="light">
                    <Console.Table.Tr>
                      <Console.Table.Th className="text-slate-500 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
                        Prefix<span className="text-danger">*</span>
                      </Console.Table.Th>
                      <Console.Table.Th className="text-slate-500 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
                        Seat Numbers<span className="text-danger">*</span>
                      </Console.Table.Th>
                      <Console.Table.Th className="text-center text-slate-500 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4" />
                    </Console.Table.Tr>
                  </Console.Table.Thead>
                  <Console.Table.Tbody>
                    {fields?.map((subVar, k) => <FormSubVariant key={k} field={subVar} parentIndex={parentIndex} index={k} remove={() => rVariant(subVar, k)} variant={watchVariantName} mode={mode} />)}
                  </Console.Table.Tbody>
                </Console.Table>
              </div>
            </div>

          ) : null
        }
      </div>
    </div>
  )
}

export default FormVariant