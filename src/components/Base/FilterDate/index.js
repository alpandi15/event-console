import { useState, useRef, useEffect } from 'react'
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
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, () => {
    setIsStartOpen(false)
    setIsEndOpen(false)
  })

  useEffect(() => {
    if (startDate && endDate) {
      console.log(new Date(startDate).toISOString())
      onChange({
        startDate: startDate,
        endDate: endDate
      })
    } else if (!startDate && !endDate) {
      onChange({
        startDate: null,
        endDate: null
      })
    }
  }, [dateRange])

  return (
    <DatePicker
      selected={startDate}
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      isClearable={true}
      placeholderText='Filter Date'
    />
  )
}

export default FilterDate
