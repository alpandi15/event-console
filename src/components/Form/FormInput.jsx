import {Controller} from 'react-hook-form'
import {Console} from 'ems-component'

const FormInput = ({name, control, validate, type, className, placeholder}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { onChange, onBlur, ...props } }) => {
        return (
          <Console.FormInput
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            type={type}
            className={className}
            placeholder={placeholder}
            {...props}
          />
        )
      }}
    />
  )
}

export default FormInput
