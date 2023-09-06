import { forwardRef, useEffect, useState } from 'react'
import { useController } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import cn from 'classnames'
import { Console } from 'ems-component'

const FormDateTime = forwardRef(
  (
    {
      name,
      control,
      className,
      placeholder,
      showTime = false,
      dateFormat = "MM/dd/yyyy",
      showTimeSelectOnly,
      icon = "CalendarClock",
      clearable = false,
      errorMessage,
      ...props
    }, ref
  ) => {
    const {
      field
    } = useController({
      name,
      control
    });

    const [value, setValue] = useState(field.value)

    const onChange = (event) => {
      field.onChange(event)
      setValue(event)
    }

    const clearValue = () => {
      field.onChange(undefined)
      setValue(undefined)
    }

    useEffect(() => {
      if (field.value != undefined) {
        setValue(field.value)
      }
    }, [field.value])

    return (
      <div className={cn("flex flex-col w-full")}>
        <div className={cn("relative w-full")}>
          <div className="absolute left-2 z-[1] top-2.5">
            <Console.Lucide icon={icon} className="w-4 h-4 text-slate-400" />
          </div>
          <DatePicker
            selected={value}
            {...props}
            onChange={onChange}
            name={field.name}
            showTimeSelect={showTimeSelectOnly ?? showTime}
            showTimeSelectOnly={showTimeSelectOnly}
            autoComplete='off'
            // timeIntervals={15}
            // showTimeInput
            // timeCaption="Timer"
            // minTime={minTime}
            // maxTime={new Date()}
            // dateFormat="h:mm aa"
            dateFormat={dateFormat}
            className={cn(
              className,
              "!pl-8 cursor-pointer !text-slate-700 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
              "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
              "transition duration-200 ease-in-out w-full !text-sm border-slate-200 shadow-sm rounded-md placeholder:!text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
              {}, className)}
            calendarClassName={cn({ "!min-w-[328px]": showTime })}
            placeholderText={placeholder}
            ref={ref}
          />
          {clearable && value != undefined &&
            <div className="absolute right-2 z-[1] top-2.5">
              <Console.Lucide icon="XIcon" className="w-4 h-4 text-slate-400" onClick={clearValue} />
            </div>
          }
        </div>
        {errorMessage ? (
          <div className="mt-2 text-danger text-sm">
            {errorMessage}
          </div>
        ) : null}
      </div>
    )
  }
)

FormDateTime.displayName = "FormDateTime";

export default FormDateTime