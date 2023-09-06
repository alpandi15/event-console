import { Component, useState } from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import {Console} from 'ems-component'
import "react-datepicker/dist/react-datepicker.css"
import cn from 'classnames'
import PropTypes from 'prop-types'

class DatePickerComponent extends Component {
  state = {
    initialValue: null,
  }

  render () {
    const {
      name,
      control,
      validate,
      className,
      placeholder = 'Date',
      placeholderTime = 'Time',
      showTimeInput = false,
      minDate,
      isEndDate = false,
      isStartDate = false,
    } = this.props

    return (
      <Controller
        name={name}
        control={control}
        rules={validate}
        render={({ field: { onChange } }) => {
          const handleChange = (date) => {
            onChange(date)
            this.setState({initialValue: date})
          }

          return (
            <div className={cn("flex items-center")}>
              <div className={cn("relative", {'w-[70%]': showTimeInput, 'w-full': !showTimeInput})}>
                <DatePicker
                  selected={this.state.initialValue}
                  onChange={(date) => handleChange(date)}
                  dateFormat="MMMM dd, yyyy"
                  minDate={minDate}
                  selectsStart={isStartDate}
                  selectsEnd={isEndDate}
                  startDate={isEndDate ? minDate : null}
                  endDate={isEndDate ? this.state.initialValue : null}
                  className={cn(
                    className,
                    "disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
                    "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                    "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
                    {}, className)}
                  placeholderText={placeholder}
                />
              </div>
              {
                showTimeInput && (
                  <div className={cn("relative ml-2 w-[30%]")}>
                    <DatePicker
                      selected={this.state.initialValue}
                      onChange={(date) => handleChange(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      // timeIntervals={15}
                      // showTimeInput
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className={cn(
                        className,
                        "disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent",
                        "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                        "transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80",
                        {}, className)}
                      placeholderText={placeholderTime}
                    />
                  </div>
                )
              }
            </div>
          )
        }}
      />
    )
  }
}

DatePickerComponent.propTypes = {
  name: PropTypes.string,
  control: PropTypes.any
}

export default DatePickerComponent