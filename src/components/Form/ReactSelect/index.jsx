import React, { forwardRef } from 'react'
import Select from 'react-select'
import { Controller } from 'react-hook-form'
import cn from 'classnames'

const ReactSelect = forwardRef(({ id, name, control, defaultValue, validate, placeholder, isDisabled = false, options = [], isSearchable = true, className, isMulti = false, errorMessage }, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <>
            <Select
              ref={ref}
              defaultValue={defaultValue}
              inputId={id}
              instanceId={id}
              isDisabled={isDisabled}
              placeholder={placeholder}
              isSearchable={isSearchable}
              isMulti={isMulti}
              {...{
                onChange: (item) => {
                  onChange(item?.value)
                },
                onBlur,
                value: value != undefined ? options?.find((item) => item?.value === value) : '',
                options
              }}
              className={className}
              // classNames
              classNamePrefix="react-select-component"
              classNames={{
                control: ({ isFocused }) => cn(
                  '!shadow-sm !rounded-md !cursor-pointer',
                  {
                    '!ring-4 !ring-primary !ring-opacity-20 !border-primary !border-opacity-40': isFocused
                  },
                  errorMessage ? '!border-danger' : '!border-slate-200'
                ),
                input: () => '!shadow-none !text-sm',
                placeholder: () => '!text-sm !text-slate-400/90',
                singleValue: () => '!text-sm',
                option: () => '!text-sm',
              }}
            />
            {
              errorMessage ? (
                <div className="mt-2 text-danger text-sm">
                  {errorMessage}
                </div>
              ) : null
            }
          </>
        )
      }}
    />
  )
})

ReactSelect.displayName = 'ReactSelect';

export default ReactSelect