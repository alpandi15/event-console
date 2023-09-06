import { useState, useRef } from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { Console } from 'ems-component'
import "react-datepicker/dist/react-datepicker.css"
import cn from 'classnames'
import moment from 'moment'
import { useOutsideAlerter } from '@/src/utils/outside'

const ButtonClose = ({
  onClick
}) => {
  return (
    <button onClick={() => onClick('start', null)} className="w-3 h-3 bg-danger rounded-full flex items-center justify-center absolute right-2 top-3">
      <Console.Lucide icon="X" fontSize={10} className="w-3 h-3 text-white" />
    </button>
  )
}

const FilterDate = ({
  className,
  onChange
}) => {
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [valueDate, setValueDate] = useState(null)

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => {
    setIsStartOpen(false)
  })

  const onChangeDate = (value) => {
    setValueDate(value)
    setIsStartOpen(false)
  }

  const onReset = () => {
    setValueDate(null)
    onChange(null)
  }

  return (
    <div className={cn(
      "rounded-md flex items-center h-[38px] bg-white rounded-md relative",
      "relative transition duration-200 ease-in-out w-full text-sm border border-slate-200 shadow-sm",
      "min-w-[100px]"
    )}>
      <div className="pl-2 pr-8 cursor-pointer h-full flex items-center leading-[10px] justify-center" onClick={() => setIsStartOpen(!isStartOpen)}>
        <Console.Lucide icon="Calendar" className="w-4 h-4 text-slate-400" />
        <div className={cn("text-sm ml-2", {'text-slate-400': !valueDate})}>{valueDate ? moment(valueDate).format('MM/DD/YYYY') : 'Date'}</div>
      </div>
      {valueDate ? <ButtonClose onClick={onReset} /> : null}
      {
        isStartOpen && (
          <div
            ref={wrapperRef}
            className="absolute top-12 left-0 before:content-[''] before:absolute before:left-8 before:-top-3 before:z-[10] before:border-l-[12px] before:border-l-transparent before:border-b-[12px] before:border-b-[#aeaeae] before:border-r-[12px] before:border-r-transparent">
            <DatePicker
              selected={valueDate}
              onChange={(date) => onChangeDate(date)}
              inline
              dateFormat="MM/dd/yyyy"
              className={cn({
                'disabled:opacity-75 bg-white appearance-none border-[1px] h-[40px] border-[#ECEDEF] rounded w-full py-2 px-4 text-strong-gray font-[400] leading-tight focus:outline-none focus:border-[#555555]': true,
              }, className)}
              placeholderText="Start Date"
            />
          </div>
        )
      }
    </div>
  )
}

export default FilterDate
