import clsx from "clsx"
import { Console } from "ems-component"
import { useFormContext } from 'react-hook-form'

const FormSubBench = ({ field, parentIndex, index, remove, variant, mode }) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()
  return (
    <Console.Table.Tr className="">
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="">
          <Console.FormInput
            {...register(`variants.${parentIndex}.subvariants.${index}.variant_name`)}
            id={`variants.${parentIndex}.subvariants.${index}.variant_name`}
            name={`variants.${parentIndex}.subvariants.${index}.variant_name`}
            type="text"
            className={clsx([
              "block min-w-full",
              { "!border-danger": errors.variants?.[parentIndex]?.subvariants?.[index]?.variant_name }
            ])}
            placeholder="eg: 7A"
            autoComplete="off"
          />
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="flex">
          <Console.FormInput
            {...register(`variants.${parentIndex}.subvariants.${index}.bench_start`)}
            id={`variants.${parentIndex}.subvariants.${index}.bench_start`}
            name={`variants.${parentIndex}.subvariants.${index}.bench_start`}
            type="number"
            thousandseparator={true}
            className={clsx([
              "block !rounded-r-none",
              { "!border-danger": errors.variants?.[parentIndex]?.subvariants?.[index]?.bench_start }
            ])}
            placeholder="From"
            autoComplete="off"
          />
          <Console.FormInput
            {...register(`variants.${parentIndex}.subvariants.${index}.bench_end`)}
            id={`variants.${parentIndex}.subvariants.${index}.bench_end`}
            name={`variants.${parentIndex}.subvariants.${index}.bench_end`}
            type="number"
            thousandseparator={true}
            className={clsx([
              "block !rounded-l-none",
              { "!border-danger": errors.variants?.[parentIndex]?.subvariants?.[index]?.bench_end }
            ])}
            placeholder="To"
            autoComplete="off"
          />
        </div>
      </Console.Table.Td>
      <Console.Table.Td>
        <Console.Button variant="soft-danger" type="button" onClick={remove}>
          <Console.Lucide icon="Trash2" className="w-4 h-4" />
        </Console.Button>
      </Console.Table.Td>
    </Console.Table.Tr>
  )
}

export default FormSubBench