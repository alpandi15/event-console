import React, { useCallback } from 'react'
import Select from 'react-select/async'
import { debounce } from 'lodash'
import cn from 'classnames'

const ReactSelectAsync = ({ id, name, isDisabled = false, loadOption, placeholder, ...props }) => {
  const debounceFunc = debounce((inputText, callback) => {
    loadOption(inputText).then((options) => callback(options))
  }, 1500);

  return (
    <Select
      // cacheOptions
      name={name}
      inputId={id}
      isDisabled={isDisabled}
      instanceId={id}
      defaultOptions={false}
      loadOptions={debounceFunc}
      placeholder={placeholder}
      {...props}
      noOptionsMessage={() => "Type specific words"}
      classNamePrefix="react-select-component"
      classNames={{
        control: ({isFocused}) => cn(
          '!border-slate-200 !shadow-sm !rounded-md',
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
  )
}

ReactSelectAsync.displayName = 'ReactSelectAsync'

export default ReactSelectAsync