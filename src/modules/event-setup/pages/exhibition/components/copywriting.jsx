import { Console, FormGroupComponent, Toastify } from "ems-component"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { Carousel } from "react-responsive-carousel";
import exhibition from "../../../services/exhibition";
import Image from "next/image";
import clsx from "clsx";

const Section3 = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [copyImage1, setCopyImage1] = useState({ file: undefined, preview: undefined, path: undefined })
  const [copyImage2, setCopyImage2] = useState({ file: undefined, preview: undefined, path: undefined })

  const {
    control,
    register,
    watch,
    resetField,
    setValue,
    getValues
  } = useForm()
  const { copyADescription, imageUploader1, imageUploader2 } = watch()

  const fetchDetail = async () => {
    await exhibition.getDetails().then((res) => {
      if (res.data.image_a.length > 0) {
        setCopyImage1({ file: undefined, preview: res?.data?.image_a[0]?.thumbnail, path: res?.data?.image_a[0]?.original })
        setCopyImage2({ file: undefined, preview: res?.data?.image_a[1]?.thumbnail, path: res?.data?.image_a[1]?.original })
      }
      setValue('copyADescription', res.data.description_a)
    }).catch((err) => {
      console.log(err)
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  useEffect(() => {
    if (imageUploader1) {
      if (imageUploader1.length) {
        const file = imageUploader1[0]
        if (file) {
          let reader = new FileReader();
          reader.onload = function (event) {
            setCopyImage1({ file: file, preview: event.target.result, path: undefined })
            resetField('imageUploader1')
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }, [imageUploader1])

  useEffect(() => {
    if (imageUploader2) {
      if (imageUploader2.length) {
        const file = imageUploader2[0]
        if (file) {
          let reader = new FileReader();
          reader.onload = function (event) {
            setCopyImage2({ file: file, preview: event.target.result, path: undefined })
            resetField('imageUploader2')
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }, [imageUploader2])

  const saveCopywriting = async () => {
    setLoading(true)
    const values = getValues()

    const formData = new FormData()
    formData.append('description_a', values.copyADescription)
    if (copyImage1.file) {
      formData.append(`image_a`, copyImage1.file)
    }
    if (copyImage2.file) {
      formData.append(`image_a`, copyImage2.file)
    }

    await exhibition.copywriting.update(formData).then((res) => {
      Toastify({
        text: 'Success, Section 3 Description has been updated',
        type: 'success'
      });
      setIsEdit(false)
      fetchDetail()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      })
    })
    setLoading(false)
  }

  return (
    <div className="p-5">
      <div className="w-full flex justify-between items-center">
        <div className="font-medium text-lg">Section 3 Description</div>
        {isEdit ? (
          <div className="flex items-center gap-2">
            <Console.Button variant="outline-dark" className="text-sm" onClick={() => setIsEdit(false)}>
              Cancel
            </Console.Button>
            <Console.Button variant="outline-primary" className="text-sm" onClick={saveCopywriting} isLoading={isLoading} disabled={isLoading}>
              <Console.Lucide icon="SaveIcon" className="w-5 h-5 mr-1" />
              Submit
            </Console.Button>
          </div>
        ) : (
          <div>
            <Console.Tippy
              content="Edit">
              <Console.Button
                variant="outline-dark"
                type="button"
                onClick={() => setIsEdit(true)}>
                <Console.Lucide icon="Edit" className="w-4 h-4" />
              </Console.Button>
            </Console.Tippy>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col mt-4 gap-8">
        <div className="w-full flex gap-4">
          <div className="w-1/2">
            <Console.FormTextarea name="copyADescription" {...register('copyADescription')} className="h-52" placeholder="Max 3000 words..." readOnly={!isEdit} />
            <Console.FormHelp className="text-right ml-auto">
              Maximum character {copyADescription?.length || 0}/3000
            </Console.FormHelp>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-2 gap-2">
              {copyImage1.preview ?
                <div className={clsx(
                  "aspect-[16/9] bg-gray-100 border border-gray-200 text-gray-400 relative group",
                  { "cursor-pointer": isEdit }
                )}>
                  <img src={copyImage1.preview} className="w-full h-full object-cover" />
                  {isEdit &&
                    <div className="absolute top-0 w-full h-full bg-black/50 hidden group-hover:flex justify-center items-center">
                      <RemoveImage
                        section='copyA'
                        path={copyImage1.path}
                        setImageUpload={(val) => setCopyImage1(val)} />
                    </div>
                  }
                </div> :
                <label className={clsx(
                  "aspect-[16/9] bg-gray-100 border border-gray-200 text-gray-400",
                  { "cursor-pointer": isEdit }
                )}>
                  <div className="h-full flex flex-col items-center justify-center">
                    <Console.Lucide icon="Plus" />
                    <span>Add Image</span>
                  </div>
                  <input type="file" accept="image/*" {...register('imageUploader1')} className="hidden" disabled={!isEdit} />
                </label>
              }
              {copyImage2.preview ?
                <div className={clsx(
                  "aspect-[16/9] bg-gray-100 border border-gray-200 text-gray-400 relative group",
                  { "cursor-pointer": isEdit }
                )}>
                  <img src={copyImage2.preview} className="w-full h-full object-cover" />
                  {isEdit &&
                    <div className="absolute top-0 w-full h-full bg-black/50 hidden group-hover:flex justify-center items-center">
                      <RemoveImage
                        section='copyA'
                        path={copyImage2.path}
                        setImageUpload={(val) => setCopyImage2(val)} />
                    </div>
                  }
                </div> :
                <label className={clsx(
                  "aspect-[16/9] bg-gray-100 border border-gray-200 text-gray-400",
                  { "cursor-pointer": isEdit }
                )}>
                  <div className="h-full flex flex-col items-center justify-center">
                    <Console.Lucide icon="Plus" />
                    <span>Add Image</span>
                  </div>
                  <input type="file" accept="image/*" {...register('imageUploader2')} className="hidden" disabled={!isEdit} />
                </label>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const RemoveImage = ({ section, path, setImageUpload }) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const removeImage = async (e, s, p) => {
    e.preventDefault()
    setIsDeleteLoading(true)
    if (p == undefined) {
      setImageUpload({ file: undefined, preview: undefined, path: undefined });
    } else {
      await exhibition.copywriting[s == 'copyA' ? 'deleteImageA' : 'deleteImageB'].delete({ image_path: p }).then((res) => {
        setImageUpload({ file: undefined, preview: undefined, path: undefined });
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
      })
    }
    setIsDeleteLoading(false)
  }

  return (
    isDeleteLoading ? <Console.LoadingIcon icon="bars" iconClass='text-primary' /> :
      <div className="bg-red-500 p-2 rounded cursor-pointer" onClick={(e) => removeImage(e, section, path)}>
        <Console.Lucide icon="Trash" className="text-white w-5 h-5" />
      </div>
  )
}
export default Section3