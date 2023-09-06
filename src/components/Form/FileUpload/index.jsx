/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, Component, useEffect, useState } from 'react'
import cn from 'classnames'
import { Console } from 'ems-component'
import { Controller } from 'react-hook-form'
import { getExtension, extentionImageFile } from './filename'

const PreviewFile = ({files, defaultImage, className}) => {
  const [src, setSrc] = useState(null)
  const [extention, setExtention] = useState(null)

  useEffect(() => {
    if (files.length) {
      const urlImage = URL.createObjectURL(files[0])
      setSrc(urlImage)

      const ext = getExtension(files[0].name)
      setExtention(ext)
    }
  }, [files, setExtention, setSrc])

  if (src && extention === 'pdf') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <img
          alt="image-profile"
          className={cn(["object-none", className])}
          src="/assets/icons/pdf.png"
        />
      </div>
    )
  }

  if (src && extention !== 'pdf') {
    return (
      <img
        alt="image-profile"
        className={cn(["w-full h-full", className], {'object-cover': !!defaultImage, 'object-none': !defaultImage})}
        src={src}
      />
    )
  }

  return (
    <div className={cn(["w-full h-full bg-slate-100", className], {'object-cover': !!defaultImage, 'object-none': !defaultImage})}></div>
  )
}

class FileUpload extends Component {
  state = {
    image: null
  }

  render () {
    const { id, name, control, validate, disabled = false, label, className, wrapperClassName, defaultImage, isImageOnly = false, acceptType = "*"} = this.props

    return (
      <Controller
        name={name}
        control={control}
        rules={validate}
        render={({ field }) => {
          const [file, setFile] = useState([])
          const [filename, setFileName] = useState(null)

          const handleChange = (e) => {
            if (!e.target?.files?.length) return

            const fileInput = e.target.files
            field.onChange(fileInput[0])
            setFile(fileInput)
            setFileName(fileInput[0].name)
            return
          }

          return (
            <div className={cn(
              [
                "relative w-full h-full overflow-hidden",
                "border transition duration-200 ease-in-out text-sm border-slate-200 shadow-sm rounded-md dark:bg-darkmode-800 dark:border-transparent",
                "group",
                wrapperClassName
              ])}>
              <PreviewFile files={file} className={className} defaultImage={defaultImage} />
              <input
                id={id}
                type="file"
                accept={isImageOnly ? 'image/jpeg, image/jpg, image/png, image/JPG, image/JPEG' : acceptType}
                onChange={handleChange}
                style={{ opacity: 0, pointerEvents: 'none', display: 'none' }}
              />
              <label
                className={cn([
                    "absolute bottom-0 right-0 left-0 top-0 flex flex-col items-center justify-center",
                  ],
                  {
                    'hidden group-hover:!flex bg-white !bg-opacity-50': file?.length,
                    'cursor-pointer': !disabled,
                    'pointer-events-none': disabled,
                  }
                )}
                htmlFor={id}
              >
                <Console.Lucide icon="Plus" className={cn("w-6 h-6" , {'text-slate-400': disabled})}/>
                {label? (
                  <div className={cn("mt-4 text-sm", {'text-slate-400': disabled})}>{label}</div>
                ) : null}
              </label>
            </div>
          )
        }}
      />
    )
  }
}

export default FileUpload