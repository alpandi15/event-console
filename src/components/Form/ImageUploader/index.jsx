/* eslint-disable react-hooks/rules-of-hooks */
import clsx from "clsx"
import { Console, Toastify } from "ems-component"
import { forwardRef, useEffect, useState } from "react"
import { Controller } from "react-hook-form"

const ImageUploader = forwardRef(({
  name,
  control,
  validate,
  size,
  sizeMode,
  ratio = 'square',
  deletable = false,
  onChange,
  onDelete,
  placeholder
}, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field, field: { value } }) => {
        const [preview, setPreview] = useState(null)
        const [errors, setErrors] = useState(undefined)
        const handleChange = async (e) => {
          setErrors(undefined)
          if (!e.target?.files?.length) return
          const fileInput = e.target.files[0]
          if (fileInput) {
            let reader = new FileReader();
            reader.onload = function (event) {
              if (size) {
                var image = new Image();
                image.src = event.target.result;

                image.onload = function () {
                  const w = this.width
                  const h = this.height
                  const cal = w * h
                  const sizeCal = size[0] * size[1]
                  let passed = false
                  if (sizeMode == 'equal') {
                    passed = sizeCal == cal
                  } else if (sizeMode == 'min') {
                    passed = sizeCal <= cal
                  } else if (sizeMode == 'max') {
                    passed = sizeCal >= cal
                  }
                  if (passed) {
                    setPreview(event.target.result)
                    field.onChange(fileInput)
                  } else {
                    setErrors('Image size does not meet requirements')
                    field.onChange()
                  }
                };
              } else {
                setPreview(event.target.result)
                field.onChange(fileInput)
              }
            }
            reader.readAsDataURL(fileInput);
          }
        }
        useEffect(() => {
          if (value != undefined && value == null) {
            setPreview(null)
            field.onChange(null)
          } else {
            if (typeof value == 'string') {
              setPreview(value)
            }
          }
        }, [value])
        return (
          <div>
            {preview ?
              <div className={clsx(
                'w-full rounded-md border shadow overflow-hidden',
                { 'aspect-square': ratio == 'square' },
                { 'aspect-[16/9]': ratio == '16/9' },
                { 'aspect-[4/3]': ratio == '4/3' }
              )}>
                <div className='w-full h-full relative group'>
                  <img src={preview} className='w-full h-full object-cover' />
                  <div className="bg-black/50 absolute w-full h-full top-0 text-white gap-4 justify-center items-center font-semibold hidden transition-all group-hover:flex">
                    <Console.Tippy
                      content="Change Image">
                      <label className='bg-amber-400 h-12 w-12 block p-2 rounded-md cursor-pointer hover:bg-opacity-90'>
                        <Console.Lucide icon="SwitchCamera" className="h-full w-full" />
                        <input type='file' accept='image/*' className='hidden' onChange={handleChange} />
                      </label>
                    </Console.Tippy>
                    {deletable &&
                      <Console.Tippy
                        content="Remove Image">
                        <Console.Button
                          variant="danger"
                          type="button"
                          className='w-12 h-12 p-2'
                          onClick={() => {
                            setPreview(null)
                            resetField('event_banner')
                          }}>
                          <Console.Lucide icon="Trash" className="h-full w-full" />
                        </Console.Button>
                      </Console.Tippy>
                    }
                  </div>
                </div>
              </div> :
              <label className={clsx(
                'w-full flex items-center justify-center rounded-md border-2 border-dashed cursor-pointer overflow-hidden transition-all group hover:border-amber-400',
                { 'aspect-square': ratio == 'square' },
                { 'aspect-[16/9]': ratio == '16/9' },
                { 'aspect-[4/3]': ratio == '4/3' },
                { 'border-red-500': errors }
              )}>
                <div className='flex flex-col items-center justify-center text-gray-500 transition-all group-hover:text-amber-400'>
                  <Console.Lucide icon='ImagePlus' className='w-14 h-14' />
                  <span>Upload Image</span>
                  {placeholder &&
                    <span className="text-xs">{placeholder}</span>
                  }
                </div>
                <input type='file' accept='image/*' className='hidden' onChange={handleChange} />
              </label>
            }
            {size ?
              sizeMode == 'equal' ?
                <span className="text-xs text-gray-500">Image size must be {size[0]}px x {size[1]}px</span> :
                <span className="text-xs text-gray-500">{sizeMode == 'min' ? 'Minimum' : 'Maximum'} size {size[0]}px x {size[1]}px</span>
              : null
            }
            {errors &&
              <div className="mt-2 text-danger text-sm">
                {errors}
              </div>
            }
          </div>
        )
      }}
    />
  )
})

ImageUploader.displayName = 'ImageUploader'

export default ImageUploader