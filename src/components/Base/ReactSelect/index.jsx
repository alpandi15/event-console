import React from 'react'
import Select from 'react-select'
import cn from 'classnames'

const ReactSelect = ({id, name, placeholder, isDisabled = false, options = [], isSearchable = true, className, ...props}) => {
  return (
    <Select
      inputId={id}
      name={name}
      instanceId={id}
      isDisabled={isDisabled}
      placeholder={placeholder}
      isSearchable={isSearchable}
      className={className}
      options={options}
      {...props}
      // classNames
      classNamePrefix="react-select-component"
      classNames={{
        control: ({isFocused}) => cn(
          '!border-slate-200 !shadow-sm !rounded-md !cursor-pointer',
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

ReactSelect.displayName = 'ReactSelect'

export default ReactSelect