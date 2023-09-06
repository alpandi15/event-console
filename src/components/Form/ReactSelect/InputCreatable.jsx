import React, {Component, useEffect, useState} from 'react'
import Select from 'react-select/creatable'
import { Controller } from 'react-hook-form'
import cn from 'classnames'

const createOption = (label) => ({
  label,
  value: label,
});

class InputCreatable extends Component {
  render () {
    const {
      id,
      name,
      control,
      validate,
      placeholder,
      isDisabled = false,
      className,
    } = this.props

    return (
      <Controller
        name={name}
        control={control}
        rules={validate}
        render={({ field: { onChange, onBlur }}) => {
          const [inputValue, setInputValue] = useState('');
          const [value, setValue] = useState([]);
  
          const handleKeyDown = (event) => {
            if (!value) return;
            switch (event.key) {
              case 'Enter':
              case 'Tab':
                console.log('EVENT ', value)
                setValue((prev) => [...prev, createOption(inputValue)]);
                // onChange([...value, createOption(inputValue)]);
                setInputValue('');
                event.preventDefault();
            }
          };

          useEffect(() => {
            onChange(value)
          }, [onChange, value])

          return (
            <Select
              components={{DropdownIndicator: null}}
              inputId={id}
              instanceId={id}
              isDisabled={isDisabled}
              isMulti
              isClearable
              inputValue={inputValue}
              menuIsOpen={false}
              onChange={(newValue) => setValue(newValue)}
              onInputChange={(newValue) => setInputValue(newValue)}
              onKeyDown={handleKeyDown}
              className={className}
              value={value}
              // classNames
              placeholder="Type something and press tab..."
              classNamePrefix="react-select-component"
              classNames={{
                control: ({isFocused}) => cn(
                  '!border-slate-200 !shadow-sm !rounded-md !cursor-text',
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
        }}
      />
    )
  }
}

InputCreatable.displayName = 'InputCreatable'

export default InputCreatable