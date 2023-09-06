import { Console } from "ems-component"
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from "react"
import clsx from "clsx"
import number from "@/src/utils/number"

const FormComponent = ({ hidePrice, isInvitation }) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useFormContext()

  const { price, discount_price, domain, extention, startDate, discount_type, isFree } = watch()

  const [finalPrice, setFinalPrice] = useState(0)

  useEffect(() => {
    if (price) {
      if (price != undefined) {
        if (discount_type == 'fixed') {
          const diff = number.toNumber(price) - number.toNumber(discount_price)
          setFinalPrice(number.local(diff))
        } else if (discount_type == 'percentage') {
          const calc = (number.toNumber(discount_price) * number.toNumber(price)) / 100
          const diff = number.toNumber(price) - calc
          setFinalPrice(number.local(diff))
        } else {
          setFinalPrice(number.local(price))
        }
      }
    }
  }, [price, discount_price, discount_type])

  useEffect(() => {
    if (discount_type) {
      setValue('discount_price', undefined)
    }
  }, [discount_type])

  const watchInvitation = watch('invitation')

  const [inviteLabel, setInviteLabel] = useState('Disable')

  useEffect(() => {
    if (watchInvitation) {
      isInvitation(true)
      setInviteLabel('Enable')
    } else {
      isInvitation(false)
      setInviteLabel('Disable')
    }
  }, [watchInvitation])

  return (
    <div className="p-5">
      <div className="flex items-center border-t pt-5 text-lg font-medium">
        Ticket Price
      </div>
      <div className="mt-10 space-y-4">
        <Console.FormGroup className="w-full" mode='horizontal' name="invitation" label="Invitation">
          <Console.FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
            <Console.FormSwitch.Input
              id="invitation"
              name="invitation"
              className="ml-0 mr-0"
              type="checkbox"
              {...register('invitation')}
            />
            <Console.FormSwitch.Label htmlFor="sub-status">
              {inviteLabel}
            </Console.FormSwitch.Label>
          </Console.FormSwitch>
        </Console.FormGroup>
        {!hidePrice && inviteLabel == 'Disable' && (
          <Console.FormGroup className="w-full" mode='horizontal' name="stock" label="Stock" required errors={errors.stock}>
            <Console.FormInput
              {...register("stock")}
              id="stock"
              name="stock"
              type="number"
              className={clsx([
                "block !w-1/4",
                { "!border-danger": errors.stock }
              ])}
              placeholder="Stock"
              thousandseparator={true}
              autoComplete="off"
            />
          </Console.FormGroup>
        )}
        {inviteLabel == 'Disable' &&
          <Console.FormGroup className="w-full" mode='horizontal' name="min_purchase" label="Order Limitation" errors={errors.min_purchase || errors.max_purchase}>
            <div className="grid grid-cols-2 w-2/4">
              <Console.FormInput
                {...register("min_purchase")}
                id="min_purchase"
                name="min_purchase"
                type="number"
                className={clsx([
                  "block",
                  { "!border-danger": errors.min_purchase }
                ])}
                placeholder="Minimum Order"
                thousandseparator={true}
                autoComplete="off"
              />
              <Console.FormInput
                {...register("max_purchase")}
                id="max_purchase"
                name="max_purchase"
                type="number"
                className={clsx([
                  "block ml-4",
                  { "!border-danger": errors.max_purchase }
                ])}
                thousandseparator={true}
                placeholder="Maximum Order"
                autoComplete="off"
              />
            </div>
          </Console.FormGroup>
        }
        {!hidePrice && inviteLabel == 'Disable' && (
          <>
            <Console.FormGroup className="w-full" mode='horizontal' name="price" label="Price" required errors={errors.price}>
              <div className="flex items-center gap-2">
                <Console.InputGroup className="w-1/3">
                  <Console.InputGroup.Text className="text-sm font-medium">IDR</Console.InputGroup.Text>
                  <Console.FormInput
                    type="number"
                    className={clsx([
                      "block",
                      { "!border-danger": errors.price }
                    ])}
                    disabled={isFree == 'true'}
                    placeholder="Price"
                    thousandseparator={true}
                    {...register('price')} />
                </Console.InputGroup>
                <Console.FormSwitch.Label htmlFor="sub-status">
                  Free
                </Console.FormSwitch.Label>
                <div className='radio-switcher'>
                  <label>
                    <input type="radio" name='isFree' value={true}  {...register("isFree")} checked={isFree == 'true'} />
                    <span>On</span>
                  </label>
                  <label>
                    <input type="radio" name='isFree' value={false}  {...register("isFree")} checked={isFree == 'false' || isFree == undefined} />
                    <span>Off</span>
                  </label>
                </div>
              </div>
            </Console.FormGroup>
            <Console.FormGroup className="w-full items-start" mode='horizontal' name="discount_type" label="Discount Type">
              <div className="flex pt-1.5 w-full">
                <Console.FormCheck className="mr-4">
                  <Console.FormCheck.Input
                    {...register('discount_type')}
                    id="condition-new"
                    type="radio"
                    disabled={isFree == 'true'}
                    value="fixed"
                  />
                  <Console.FormCheck.Label htmlFor="condition-new">
                    Fixed
                  </Console.FormCheck.Label>
                </Console.FormCheck>
                <Console.FormCheck className="">
                  <Console.FormCheck.Input
                    {...register('discount_type')}
                    id="condition-second"
                    type="radio"
                    disabled={isFree == 'true'}
                    value="percentage"
                  />
                  <Console.FormCheck.Label htmlFor="condition-second">
                    Percentage
                  </Console.FormCheck.Label>
                </Console.FormCheck>
              </div>
              <div className="flex mt-2 w-full">
                {discount_type === 'fixed' ? (
                  <Console.InputGroup className="w-1/3">
                    <Console.InputGroup.Text className="text-sm font-medium">IDR</Console.InputGroup.Text>
                    <Console.FormInput
                      type="number"
                      thousandseparator={true}
                      className={clsx([
                        "block",
                        { "!border-danger": errors.discount_price }
                      ])}
                      min="1"
                      placeholder="Discount Price"
                      {...register('discount_price')} />
                  </Console.InputGroup>
                ) : discount_type === 'percentage' ? (
                  <Console.InputGroup className="w-1/3">
                    <Console.FormInput
                      type="number"
                      className={clsx([
                        "block",
                        { "!border-danger": errors.discount_price }
                      ])}
                      placeholder="Discount Percentage"
                      min="1"
                      maxLength={3}
                      {...register('discount_price')} />
                    <Console.InputGroup.Text className="text-sm font-medium">%</Console.InputGroup.Text>
                  </Console.InputGroup>
                ) : null}
                {discount_type != undefined &&
                  <div
                    className="border border-red-500 flex justify-center items-center rounded-md py-1 px-2 text-xs sm:ml-4 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                    onClick={() => setValue('discount_type', undefined)}>
                    <Console.Lucide icon="X" className="h-4 w-4" />
                  </div>
                }
              </div>
            </Console.FormGroup>
            <Console.FormGroup className="w-full" mode='horizontal' name="finalPrice" label="Final Price">
              <Console.InputGroup className="w-1/3">
                <Console.InputGroup.Text className="text-sm font-medium">IDR</Console.InputGroup.Text>
                <Console.FormInput type="text" placeholder="Final Price" readOnly value={finalPrice} />
              </Console.InputGroup>
            </Console.FormGroup>
          </>
        )}
      </div>
    </div>
  )
}

export default FormComponent
