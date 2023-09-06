import React, { useCallback } from 'react'
import Select from 'react-select/async'
import { Controller } from 'react-hook-form'
import { debounce } from 'lodash'
import cn from 'classnames'
import { Console } from 'ems-component'

const ReactSelectAsync = ({ id, name, control, placeholder, isDisabled = false, defaultOptions = false, validate, loadOption, isMulti = false, isClearable = false, noOptionsMessage = 'Type specific words', isInputSearch = false, errorMessage }) => {
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
              inputId={id}
              isClearable={isClearable}
              isDisabled={isDisabled}
              instanceId={id}
              defaultOptions={defaultOptions}
              loadOptions={debounceFunc}
              isMulti={isMulti}
              placeholder={placeholder}
              noOptionsMessage={() => noOptionsMessage}
              {...{
                onChange,
                onBlur,
                value,
                components: isInputSearch ? { DropdownIndicator: () => <div className="px-2"><Console.Lucide icon="SearchIcon" className="w-5 h-5 text-slate-400" /></div> } : null
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
                menu: () => '!z-20',
                option: () => '!text-sm !z-20',
              }}
            />
            {errorMessage ? (
              <div className="mt-2 text-danger text-sm">
                {errorMessage}
              </div>
            ) : null}
          </>
        )
      }}
    />
  )
}

ReactSelectAsync.displayName = 'ReactSelectAsync'

export default ReactSelectAsync