import React from 'react'
import Select from 'react-select/creatable'
import { Controller } from 'react-hook-form'
import cn from 'classnames'

const ReactSelectCreatable = ({ id, name, control, validate, placeholder, isDisabled = false, options = [], isSearchable = true, className, isMulti = false, errorMessage, handleCreate }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <>
            <Select
              inputId={id}
              instanceId={id}
              isDisabled={isDisabled}
              placeholder={placeholder}
              isSearchable={isSearchable}
              onCreateOption={handleCreate}
              isMulti={isMulti}
              {...{
                onChange,
                onBlur,
                value,
                options
              }}
              className={className}
              // classNames
              classNamePrefix="react-select-component"
              classNames={{
                control: ({ isFocused }) => cn(
                  '!shadow-sm !rounded-md !cursor-pointer',
                  [
                    errorMessage ? '!border-danger' : '!border-slate-200'
                  ],
                  {
                    '!ring-4 !ring-primary !ring-opacity-20 !border-primary !border-opacity-40': isFocused
                  }
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
}

ReactSelectCreatable.displayName = 'ReactSelectCreatable'

export default ReactSelectCreatable