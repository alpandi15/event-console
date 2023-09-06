import React, { useCallback } from 'react'
import Select from 'react-select/async-creatable'
import { Controller } from 'react-hook-form'
import { debounce } from 'lodash'
import cn from 'classnames'

const ReactSelectAsyncCreatable = ({ id, name, control, isDisabled = false, validate, loadOption, controlStyle, defaultOptions = false, isMulti = false, defaultValue, errorMessage, handleCreate }) => {
  const debounceFunc = debounce((inputText, callback) => {
    loadOption(inputText).then((options) => callback(options))
  }, 1500);
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { onChange, onBlur, value } }) => {
        return (
          <>
            <Select
              // cacheOptions
              defaultValue={value}
              inputId={id}
              isDisabled={isDisabled}
              instanceId={id}
              defaultOptions={defaultOptions}
              isMulti={isMulti}
              loadOptions={debounceFunc}
              onCreateOption={handleCreate}
              noOptionsMessage={() => "Type specific words"}
              {...{
                onChange,
                onBlur,
                value,
              }}
              classNamePrefix="react-select-component"
              classNames={{
                control: ({ isFocused }) => cn(
                  [
                    '!shadow-sm !rounded-md',
                    errorMessage ? '!border-danger' : '!border-slate-200'
                  ],
                  {
                    '!ring-4 !ring-primary !ring-opacity-20 !border-primary !border-opacity-40': isFocused
                  },
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

ReactSelectAsyncCreatable.displayName = 'ReactSelectAsyncCreatable'

export default ReactSelectAsyncCreatable