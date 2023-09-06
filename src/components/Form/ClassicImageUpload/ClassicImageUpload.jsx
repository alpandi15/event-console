/* eslint-disable react-hooks/rules-of-hooks */
import clsx from "clsx"
import { Console, Toastify } from "ems-component"
import { forwardRef, useEffect, useState } from "react"
import { Controller } from "react-hook-form"

const ClassicImageUpload = forwardRef(({
    name,
    control,
    validate,
    size,
    label,
    onChange,
    onDelete,
    refetch,
    index,
    type
}, ref) => {
    const [isLoading, setLoading] = useState(false)
    return (
        <Controller
            name={name}
            control={control}
            rules={validate}
            render={({ field }) => {
                const [file, setFile] = useState()

                const handleChange = async (e) => {
                    console.log(e)
                    setLoading(true)
                    if (!e.target?.files?.length) return
                    const id = file?.id || undefined
                    const fileInput = e.target.files[0]
                    await onChange(e.target.files[0], type, index, id).then((res) => {
                        if (id) {
                            Toastify({
                                text: 'Success, Banner has been updated',
                                type: 'success'
                            });
                            refetch()
                        } else {
                            Toastify({
                                text: 'Success, Banner has been uploaded',
                                type: 'success'
                            });
                            if (fileInput) {
                                let reader = new FileReader();
                                const resultId = res.id
                                console.log(resultId)
                                reader.onload = function (event) {
                                    field.onChange({ file: fileInput, preview: event.target.result, id: resultId })
                                }
                                reader.readAsDataURL(fileInput);
                            }
                        }
                    }).catch((err) => {
                        Toastify({
                            text: err?.response.data.message,
                            type: 'error'
                        });
                    })
                    setLoading(false)
                    return
                }

                useEffect(() => {
                    if (field.value) {
                        if (typeof field.value == 'string') {
                            const file = JSON.parse(field.value)
                            setFile({ image: file.preview, id: file.id })
                        } else {
                            const file = field.value
                            setFile({ image: file.preview, id: file.id })
                        }
                    } else {
                        setFile(undefined)
                    }
                }, [field.value])

                const deleteImage = async (e, id) => {
                    console.log(id)
                    setLoading(true)
                    e.preventDefault()
                    console.log(id)
                    await onDelete(id).then((res) => {
                        setFile(undefined)
                        Toastify({
                            text: 'Success, Banner has been deleted',
                            type: 'success'
                        });
                    }).catch((err) => {
                        Toastify({
                            text: err?.response.data.message,
                            type: 'error'
                        });
                    })
                    refetch()
                    setLoading(false)
                }

                return (
                    size == 'wide' ?
                        <label className="w-full h-28 border-2 border-dashed border-gray-300 rounded overflow-hidden flex items-center justify-center text-gray-500 cursor-pointer hover:bg-primary/20 relative">
                            <Console.Lucide icon="Plus" className="h-6 w-6" />
                            {label}
                            {isLoading ?
                                <div className="w-full h-full absolute bg-dark/70 backdrop-blur-sm p-5"><Console.LoadingIcon icon="bars" iconClass='text-primary' /></div> :
                                <img src={file?.image} className={clsx(
                                    "w-full h-full object-cover absolute",
                                    { "hidden": !file },
                                    { "block": file }
                                )} />
                            }
                            <input ref={ref} type="file" accept="image/*" className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer hidden" onChange={handleChange} />
                            {file &&
                                <div className="absolute z-30 top-1 right-1 bg-red-500 p-1 text-white rounded opacity-80 hover:opacity-100" onClick={(e) => deleteImage(e, file?.id)}>
                                    <Console.Lucide icon="X" className="w-5 h-5" />
                                </div>
                            }
                        </label> :
                        <label className="w-full aspect-square border-2 border-dashed border-gray-300 rounded overflow-hidden flex flex-col items-center justify-center text-gray-500 hover:bg-primary/20 relative cursor-pointer">
                            <Console.Lucide icon="Plus" className="h-10 w-10" />
                            {label}
                            {isLoading ?
                                <div className="w-full h-full absolute bg-dark/70 backdrop-blur-sm p-5"><Console.LoadingIcon icon="bars" iconClass='text-primary' /></div> :
                                <img src={file?.image} className={clsx(
                                    "w-full h-full object-cover absolute",
                                    { "hidden": !file },
                                    { "block": file }
                                )} />
                            }
                            <input ref={ref} type="file" accept="image/*" className="absolute top-0 bottom-0 left-0 right-0 w-full h-full cursor-pointer hidden" onChange={handleChange} />
                            {file &&
                                <div className="absolute z-30 top-1 right-1 bg-red-500 p-1 text-white rounded opacity-80 hover:opacity-100" onClick={(e) => deleteImage(e, file?.id)}>
                                    <Console.Lucide icon="X" className="w-5 h-5" />
                                </div>
                            }
                        </label>
                )
            }}
        />
    )
})

ClassicImageUpload.displayName = 'ClassicImageUpload'

export default ClassicImageUpload