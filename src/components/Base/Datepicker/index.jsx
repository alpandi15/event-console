/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import {Console} from 'ems-component'
import "react-datepicker/dist/react-datepicker.css"
import cn from 'classnames'

const ButtonClose = ({
  onClick
}) => {
  return (
    <button onClick={() => onClick('start', null)} className="w-5 h-5 bg-danger rounded-full flex items-center justify-center absolute right-2 top-2">
      <Console.Lucide icon="X" className="w-4 h-4 text-white" />
    </button>
  )
}

const InputDateRange = ({
  name,
  // id,
  error,
  control,
  validate,
  className
  // labelClassName,
  // wrapperClassName,
  // label,
  // disabled,
  // required
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { onChange } }) => {
        const [startDate, setStartDate] = useState(null)
        const [endDate, setEndDate] = useState(null)

        const onChangeDate = (type, value) => {
          console.log('DATE ', value)
          if (type === 'start') {
            setStartDate(value)
          }
          if (type === 'end') {
            setEndDate(value)
          }
          onChange({
            startDate: type === 'start' ? value : startDate,
            endDate: type === 'end' ? value : endDate
          })
        }

        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full relative">
              <DatePicker
                selected={startDate}
                onChange={(date) => onChangeDate('start', date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                showTimeInput
                dateFormat="MM/dd/yyyy hh:mm aa"
                minDate={new Date()}
                className={cn({
                  'disabled:opacity-75 bg-white appearance-none border-[1px] h-[40px] border-[#ECEDEF] rounded w-full py-2 px-4 text-strong-gray font-[400] leading-tight focus:outline-none focus:border-[#555555]': true,
                  'border-[#FF0001]': error
                }, className)}
                placeholderText="Start Date"
              />
              {startDate ? (
                <ButtonClose onClick={() => onChangeDate('start', null)} />
              ) : null}
            </div>
            <div className="w-full relative">
              <DatePicker
                selected={endDate}
                onChange={(date) => onChangeDate('end', date)}
                selectsEnd
                showTimeInput
                minDate={startDate}
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/dd/yyyy hh:mm aa"
                // minDate={startDate}
                className={cn({
                  'disabled:opacity-75 bg-white appearance-none border-[1px] h-[40px] border-[#ECEDEF] rounded w-full py-2 px-4 text-strong-gray font-[400] leading-tight focus:outline-none focus:border-[#555555]': true,
                  'border-[#FF0001]': error
                }, className)}
                placeholderText="End Date"
              />
              {endDate ? (
                <ButtonClose onClick={() => onChangeDate('end', null)} />
              ) : null}
            </div>
          </div>
        )
      }}
    />
  )
}

export default InputDateRange
