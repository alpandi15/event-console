import { Component, useState } from 'react'
import { Controller } from 'react-hook-form'
import clsx from 'clsx'

class ButtonPermission extends Component {
  state = {
    feature: false,
    read: false,
    write: false,
    delete: false
  }

  render () {
    const {name, control, validate} = this.props

    return (
      <Controller
        name={name}
        control={control}
        rules={validate}
        render={({ field }) => {
          const onChangeFeature = (status) => {
            field.onChange({
              feature: status,
              read: status,
              write: status,
              delete: status
            })

            this.setState({
              feature: status,
              read: status,
              write: status,
              delete: status
            })
          }

          const checkPermission = () => {
            if (this.state.read || this.state.write || this.state.delete) {
              this.setState({
                feature: true
              })
              field.onChange({
                ...this.state,
                feature: true
              })
              return
            }
              field.onChange({
                ...this.state,
                feature: false
              })
            this.setState({
              feature: false
            })
            return
          }

          const onChangePermission = async (name, status) => {
            await this.setState({
              // ...this.state,
              [name]: status,
            })
            field.onChange({
              ...this.state,
              [name]: status,
            })

            checkPermission()
          }
          return (
            <div className="flex items-center">
              <button type="button" onClick={() => onChangePermission('read', !this.state.read)} className={clsx(["text-xs p-2 bg-gray-100 border border-1", {'bg-success text-white font-medium': this.state.read}])}>READ</button>
              <button type="button" onClick={() => onChangePermission('write', !this.state.write)} className={clsx(["text-xs p-2 bg-gray-100 border border-1", {'bg-success text-white font-medium': this.state.write}])}>WRITE</button>
              <button type="button" onClick={() => onChangePermission('delete', !this.state.delete)} className={clsx(["text-xs p-2 bg-gray-100 border border-1", {'bg-success text-white font-medium': this.state.delete}])}>DELETE</button>
              <div className="ml-2">
                <button type="button" onClick={() => onChangeFeature(true)} className={clsx(["text-xs p-2 bg-gray-100 border border-1", {'bg-success text-white font-medium': this.state.feature}])}>ALL</button>
                <button type="button" onClick={() => onChangeFeature(false)} className={clsx(["text-xs p-2 bg-gray-100 border border-1", {'bg-danger text-white font-medium': !this.state.feature}])}>OFF</button>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default ButtonPermission
