import { Console } from "ems-component"
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import ReactSelect from '@/src/components/Form/ReactSelect'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { Datepicker } from "@/src/components/Base"
import { useEffect, useState } from "react"
import FormDateTime from "@/src/components/Form/Datepicker/DateInput"
import FormImageUpload from "@/src/components/Form/Image/ImageUpload"
import dynamic from 'next/dynamic'
import clsx from "clsx"
import product from "../../../services/product"

const FormComponent = () => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
    resetField
  } = useFormContext({
    defaultValues: {
      id: '',
      company_id: '',
      price: ''
    }
  })

  const [isVariants, setIsVariants] = useState(false)

  const { selectproduct } = watch()

  const { fields, remove } = useFieldArray({
    control,
    name: "variants"
  });

  const fetchProducts = async (e) => {
    const products = []
    await product.searchProducts({ search: e }).then((res) => {
      res.data.map((v) => {
        products.push({
          value: v.id,
          label: <div className="flex gap-2 items-center">
            <img src={v.photo_1} className="w-14" />
            {v.name}
          </div>,
          data: v
        })
      })
    }).catch((err) => {
      console.log(err)
    })

    return products
  }

  useEffect(() => {
    resetField("id")
    resetField("company_id")
    resetField("price")
    resetField("stock")
    remove()

    if (selectproduct != undefined) {
      const res = selectproduct.data
      setValue('id', res.id)
      setValue('company_id', res.companys_id)

      if (res.variants.length > 0) {
        setIsVariants(true)
        setValue('variants', res.variants)
      } else {
        setIsVariants(false)
        setValue('price', res.unit_price)
      }
    }
  }, [selectproduct])

  return (
    <div className="p-5 mt-5 box">
      <div className="mt-4">
        <Console.FormLabel htmlFor="selectproduct" className="text-sm">Select Product<span className="text-danger">*</span></Console.FormLabel>
        <ReactSelectAsync
          id="selectproduct"
          name="selectproduct"
          control={control}
          placeholder="Select Product"
          defaultOptions={true}
          loadOption={fetchProducts}
          errorMessage={errors.selectproduct ? errors.selectproduct.message : undefined}
        />
      </div>
      <input type="hidden" name="id" {...register('id')} />
      <input type="hidden" name="company_id" {...register('company_id')} />
      {!isVariants &&
        <div className="flex gap-4 mt-4">
          <div className="w-full">
            <Console.FormLabel htmlFor="price" className="text-sm">Price<span className="text-danger">*</span></Console.FormLabel>
            <Console.FormInput
              {...register("price")}
              id="price"
              name="price"
              type="number"
              className={clsx([
                "block min-w-full",
                { "!border-danger": errors.price }
              ])}
              placeholder="Price"
              autoComplete="off"
            />
            {errors.price && (
              <div className="mt-2 text-danger text-sm">
                {typeof errors.price.message === "string" &&
                  errors.price.message}
              </div>
            )}
          </div>
          <div className="w-full">
            <Console.FormLabel htmlFor="stock" className="text-sm">Stock<span className="text-danger">*</span></Console.FormLabel>
            <Console.FormInput
              {...register("stock")}
              id="stock"
              name="stock"
              type="number"
              className={clsx([
                "block min-w-full",
                { "!border-danger": errors.stock }
              ])}
              placeholder="Stock"
              autoComplete="off"
            />
            {errors.stock && (
              <div className="mt-2 text-danger text-sm">
                {typeof errors.stock.message === "string" &&
                  errors.stock.message}
              </div>
            )}
          </div>
        </div>
      }
      {isVariants && (
        <div className="space-y-4 mt-4">
          {fields.map((v, k) => (
            <VariantField field={v} index={k} key={k} />
          ))}
        </div>
      )}
    </div>
  )
}

const VariantField = ({ field, index }) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue,
    resetField
  } = useFormContext()

  const { fields, remove } = useFieldArray({
    control,
    name: `variants.${index}.sub_variants`
  });

  return (
    <div className="border p-4 rounded-md shadow">
      <div className="flex gap-4">
        <input type="hidden" name={`variants.${index}.id`} {...register(`variants.${index}.id`)} />
        <div className="w-1/3">
          <Console.FormLabel className="text-sm">Variant</Console.FormLabel>
          <Console.FormInput
            type="text"
            className="block min-w-full"
            placeholder="Variant Name"
            readOnly={true}
            value={field.variant_name}
            autoComplete="off"
          />
        </div>
        {!field.sub_variants.length > 0 &&
          <div className="w-1/3">
            <Console.FormLabel className="text-sm">Price<span className="text-danger">*</span></Console.FormLabel>
            <Console.FormInput
              {...register(`variants.${index}.default_price`)}
              id={`variants.${index}.default_price`}
              name={`variants.${index}.default_price`}
              type="number"
              className={clsx([
                "block min-w-full",
                { "!border-danger": errors.variants?.[index]?.default_price }
              ])}
              placeholder="Price"
              autoComplete="off"
            />
            {errors.variants?.[index]?.default_price && (
              <div className="mt-2 text-danger text-sm">
                {typeof errors.variants?.[index]?.default_price.message === "string" &&
                  errors.variants?.[index]?.default_price.message}
              </div>
            )}
          </div>
        }
        {!field.sub_variants.length > 0 &&
          <div className="w-1/3">
            <Console.FormLabel className="text-sm">Stock<span className="text-danger">*</span></Console.FormLabel>
            <Console.FormInput
              {...register(`variants.${index}.stock`)}
              id={`variants.${index}.stock`}
              name={`variants.${index}.stock`}
              type="number"
              className={clsx([
                "block min-w-full",
                { "!border-danger": errors.variants?.[index]?.stock }
              ])}
              placeholder="Stock"
              autoComplete="off"
            />
            {errors.variants?.[index]?.stock && (
              <div className="mt-2 text-danger text-sm">
                {typeof errors.variants?.[index]?.stock.message === "string" &&
                  errors.variants?.[index]?.stock.message}
              </div>
            )}
          </div>
        }
      </div>
      {field.sub_variants.length > 0 &&
        <Console.Table className="">
          <Console.Table.Thead variant="light">
            <Console.Table.Tr>
              <Console.Table.Th className="text-slate-500 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
                Variant Name
              </Console.Table.Th>
              <Console.Table.Th className="text-slate-500 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
                Sub Variant Name
              </Console.Table.Th>
              <Console.Table.Th className="text-slate-500 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
                Price<span className="text-danger">*</span>
              </Console.Table.Th>
              <Console.Table.Th className="text-slate-500 !border-b border-slate-200/60 whitespace-nowrap !px-2 py-4">
                Stock<span className="text-danger">*</span>
              </Console.Table.Th>
            </Console.Table.Tr>
          </Console.Table.Thead>
          <Console.Table.Tbody>
            {fields.map((v2, k2) => (
              <SubVariantField field={v2} index={k2} parentIndex={index} key={k2} variantName={field.variant_name} />
            ))}
          </Console.Table.Tbody>
        </Console.Table>
      }
    </div>
  )
}

const SubVariantField = ({ field, index, variantName, parentIndex }) => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    watch,
    setValue
  } = useFormContext()

  return (
    <Console.Table.Tr>
      <Console.Table.Td className="!p-2 text-slate-700">
        <input type="hidden" name={`variants.${index}.id`} {...register(`variants.${index}.id`)} />
        <div className="text-slate-700 font-medium whitespace-nowrap">
          <small className="italic text-gray-400">{variantName}</small>
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="text-slate-700 font-medium whitespace-nowrap">
          <small className="italic text-gray-400">{field.variant_name}</small>
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="">
          <Console.FormInput
            {...register(`variants.${parentIndex}.sub_variants.${index}.default_price`)}
            id={`variants.${parentIndex}.sub_variants.${index}.default_price`}
            name={`variants.${parentIndex}.sub_variants.${index}.default_price`}
            type="number"
            className={clsx([
              "block min-w-full",
              { "!border-danger": errors.variants?.[parentIndex]?.sub_variants?.[index]?.default_price }
            ])}
            placeholder="Price"
            autoComplete="off"
          />
          {errors.variants?.[parentIndex]?.sub_variants?.[index]?.default_price && (
            <div className="mt-2 text-danger text-sm">
              {typeof errors.variants?.[parentIndex]?.sub_variants?.[index]?.default_price.message === "string" &&
                errors.variants?.[parentIndex]?.sub_variants?.[index]?.default_price.message}
            </div>
          )}
        </div>
      </Console.Table.Td>
      <Console.Table.Td className="!p-2 text-slate-700">
        <div className="">
          <Console.FormInput
            {...register(`variants.${parentIndex}.sub_variants.${index}.stock`)}
            id={`variants.${parentIndex}.sub_variants.${index}.stock`}
            name={`variants.${parentIndex}.sub_variants.${index}.stock`}
            type="number"
            className={clsx([
              "block min-w-full",
              { "!border-danger": errors.variants?.[parentIndex]?.sub_variants?.[index]?.stock }
            ])}
            placeholder="Stock"
            autoComplete="off"
          />
          {errors.variants?.[parentIndex]?.sub_variants?.[index]?.stock && (
            <div className="mt-2 text-danger text-sm">
              {typeof errors.variants?.[parentIndex]?.sub_variants?.[index]?.stock.message === "string" &&
                errors.variants?.[parentIndex]?.sub_variants?.[index]?.stock.message}
            </div>
          )}
        </div>
      </Console.Table.Td>
    </Console.Table.Tr>
  )
}

export default FormComponent
