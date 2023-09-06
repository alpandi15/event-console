import { Console } from "ems-component"
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from "react"
import FormDateTime from "@/src/components/Form/Datepicker/DateInput"
import clsx from "clsx"
import moment from "moment"

const FormComponent = ({ eventDetail }) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()

  const { start_sale_date, end_sale_date } = watch()
  const d2 = new Date(eventDetail?.event?.event_end)

  useEffect(() => {
    if (start_sale_date) {
      setValue('start_sale_time', moment(new Date().setHours(0, 0, 0)).toDate())
    }
  }, [start_sale_date])

  useEffect(() => {
    if (end_sale_date) {
      setValue('end_sale_time', moment(new Date().setHours(23, 59, 0)).toDate())
    }
  }, [end_sale_date])

  return (
    <div className="p-5">
      <div className="flex items-center border-t pt-5 text-lg font-medium">
        Live Selling
      </div>
      <div className="mt-10 space-y-4">
        <div className="flex items-start gap-4 w-3/5">
          <Console.FormGroup className="w-full" mode='vertical' label="Selling Date Start" required>
            <div className="flex-1 w-full mt-3 xl:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormDateTime
                    name="start_sale_date"
                    minDate={new Date()}
                    placeholder="Date on sale"
                    icon="CalendarDays"
                    className={clsx([
                      { "!border-danger": errors.start_sale_date }
                    ])}
                    {...register('start_sale_date')}
                  />
                  {errors.start_sale_date && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors.start_sale_date.message === "string" &&
                        errors.start_sale_date.message}
                    </div>
                  )}
                </div>
                <div>
                  <FormDateTime
                    name="start_sale_time"
                    showTimeSelectOnly
                    placeholder="Time on sale"
                    dateFormat="HH:mm a"
                    icon="Timer"
                    className={clsx([
                      { "!border-danger": errors.start_sale_time }
                    ])}
                    {...register('start_sale_time')}
                  />
                  {errors.start_sale_time && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors.start_sale_time.message === "string" &&
                        errors.start_sale_time.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Console.FormGroup>
          <div
            className={clsx([
              { "self-end pb-1.5": !errors.start_sale_date && !errors.start_sale_time && !errors.end_sale_date && !errors.end_sale_time },
              { "self-center pb-0": errors.start_sale_date || errors.start_sale_time || errors.end_sale_date || errors.end_sale_time }
            ])}>
            <span>To</span>
          </div>
          <Console.FormGroup className="w-full" mode='vertical' label="Selling Date End" required>
            <div className="flex-1 w-full mt-3 xl:mt-0">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <FormDateTime
                    name="end_sale_date"
                    minDate={new Date(start_sale_date)}
                    maxDate={d2}
                    placeholder="Date on sale"
                    autocomplete={false}
                    icon="CalendarDays"
                    disabled={!start_sale_date}
                    className={clsx([
                      { "!border-danger": errors.end_sale_date }
                    ])}
                    {...register('end_sale_date')}
                  />
                  {errors.end_sale_date && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors.end_sale_date.message === "string" &&
                        errors.end_sale_date.message}
                    </div>
                  )}
                </div>
                <div>
                  <FormDateTime
                    name="end_sale_time"
                    showTimeSelectOnly
                    placeholder="Time on sale"
                    dateFormat="HH:mm a"
                    icon="Timer"
                    disabled={!start_sale_date}
                    className={clsx([
                      { "!border-danger": errors.end_sale_time }
                    ])}
                    {...register('end_sale_time')}
                  />
                  {errors.end_sale_time && (
                    <div className="mt-2 text-danger text-sm">
                      {typeof errors.end_sale_time.message === "string" &&
                        errors.end_sale_time.message}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Console.FormGroup>
        </div>
      </div>
    </div>
  )
}

export default FormComponent
