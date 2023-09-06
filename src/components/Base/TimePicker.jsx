import { Component, useState } from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import cn from 'classnames'
import PropTypes from 'prop-types'
import { Console } from 'ems-component'

const DatePickerComponent = ({className, placeholder, ...props}) => {
  const [initialValue, setInitialValue] = useState(null)

  const handleChange = (value) => {
    setInitialValue(value)
  }

  return (
    <div className={cn("flex items-center")}>
      <div className={cn("relative w-ful")}>
        <div className="absolute left-2 z-[1] top-2.5">
          <Console.Lucide icon="Timer" className="w-4 h-4 text-slate-400" />
        </div>
        <DatePicker
          selected={initialValue}
          onChange={(date) => handleChange(date)}
          {...props}
          showTimeSelect
          showTimeSelectOnly
          // timeIntervals={15}
          // showTimeInput
          timeCaption="Timer"
          // minTime={minTime}
          // maxTime={new Date()}
          dateFormat="h:mm aa"
          className={cn(
            className,
            "!pl-7 cursor-pointer text-slate-700 disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
            "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
            "transition duration-200 ease-in-out w-full !text-sm border-slate-200 shadow-sm rounded-md placeholder:!text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
            {}, className)}
          sty
          placeholderText={placeholder}
        />
      </div>
    </div>
  )
}

export default DatePickerComponent