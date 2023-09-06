import React, {Component, useEffect, useState} from 'react'
import {Console} from 'ems-component'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'

const Preview = ({src, className}) => {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt="image"
        className={clsx(["object-cover w-full h-full", className])}
        src={src}
      />
    )
  }
  return (
    <Console.Image
      className={clsx(["object-cover w-full h-full", className])}
      src={src}
    />
  )
}
class UploadImage extends Component {
  render () {
    const { id, name, control, validate, disabled = false, className, wrapperClassName } = this.props

    return (
      <Controller
        name={name}
        control={control}
        rules={validate}
        render={({ field }) => {
          const [image, setImage] = useState(field?.value)
  
          useEffect(() => {
            if (field?.value && typeof field?.value === 'string') {
              setImage(field?.value)
            }
          }, [field?.value, setImage])
  
          const handleChange = (e) => {
            if (!e?.target?.files.length) return

            field?.onChange(e?.target?.files[0])
            const file = e?.target.files[0]
            setImage(URL.createObjectURL(file))
          }

          const onReset = () => {
            setImage(null)
            field?.onChange(null)
          }
        
          return (
            <div>
              <div
                className={clsx([
                  "rounded-md overflow-hidden relative w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32",
                  "border transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md dark:bg-darkmode-800 dark:border-transparent",
                  wrapperClassName
                ])}>
                <Preview src={image} className={className} />
                <input
                  id={id}
                  type="file"
                  onChange={handleChange}
                  className={clsx(['hidden'])}
                  accept="image/jpeg, image/jpg, image/png, image/JPG, image/JPEG"
                  disabled={disabled}
                />
                <label
                  className="cursor-pointer absolute bottom-0 right-0 flex items-center justify-center p-2 mb-1 mr-1 rounded-full bg-primary"
                  htmlFor={id}
                >
                  <Console.Lucide icon="Camera" className="w-4 h-4 text-white" />
                </label>
              </div>
            </div>
          )
        }}
      />
    )
  }
}

export default UploadImage