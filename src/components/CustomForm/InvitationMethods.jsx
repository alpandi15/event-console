import { Component } from 'react'
import { Controller } from 'react-hook-form'
import clsx from 'clsx'

class InvitationMethods extends Component {
  render () {
    const { name, control, validate } = this.props

    return (
      <Controller
        name={name}
        control={control}
        rules={validate}
        render={({ field }) => {
          const onChangeValue = (status) => {
            field.onChange(status)
          }

          return (
            <div>
              <div className="bg-gray-100 grid grid-cols-2 p-2 gap-2 rounded-full">
                <button
                  type="button"
                  onClick={() => onChangeValue('email')}
                  className={clsx(
                    "px-2 transition-all py-1 rounded-full w-full text-center cursor-pointer",
                    {
                      'bg-primary shadow-lg font-medium text-white': field.value === 'email'
                    }
                  )}
                >
                  <div className="text-center">Email</div>
                </button>
                <button
                  type="button"
                  onClick={() => onChangeValue('phone')}
                  className={clsx(
                    "px-2 transition-all py-1 rounded-full w-full text-center cursor-pointer",
                    {
                      'bg-primary shadow-lg font-medium text-white': field.value === 'phone'
                    }
                  )}
                >
                  <div className="text-center">Phone Number</div>
                </button>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default InvitationMethods
