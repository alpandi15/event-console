import { Console, Toastify } from "ems-component"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useForm } from 'react-hook-form'
import FileUpload from "@/src/components/Form/FileUpload";
import exhibition from "../../../services/exhibition";

const Section5 = () => {
  const [isLoading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [statisticImage, setStatisticImage] = useState(undefined)
  const [layoutImage, setLayoutImage] = useState(undefined)
  const [brochureFile, setBrochureFile] = useState(undefined)
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm()
  const { image_statistic, file_brochure, image_layout } = watch()

  useEffect(() => {
    if (image_statistic) {
      if (image_statistic.length) {
        const file = image_statistic[0]
        if (file) {
          let reader = new FileReader();
          reader.onload = function (event) {
            setStatisticImage(event.target.result)
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }, [image_statistic])

  useEffect(() => {
    if (image_layout) {
      if (image_layout.length) {
        const file = image_layout[0]
        if (file) {
          let reader = new FileReader();
          reader.onload = function (event) {
            setLayoutImage(event.target.result)
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }, [image_layout])

  useEffect(() => {
    if (file_brochure) {
      if (file_brochure.length) {
        const file = file_brochure[0]
        if (file) {
          setBrochureFile(file.name)
        }
      }
    }
  }, [file_brochure])

  const fetchDetail = async () => {
    await exhibition.getDetails().then((res) => {
      setStatisticImage(res.data.statistic)
      setLayoutImage(res.data.layout)
      setBrochureFile(res.data.brochure)
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  const onSubmit = async (values) => {
    setLoading(true)

    const formData = new FormData()
    if (values.image_statistic) {
      formData.append('statistic', values.image_statistic[0])
    }
    if (values.file_brochure) {
      formData.append('brochure', values.file_brochure[0])
    }
    if (values.image_layout) {
      formData.append('layout', values.image_layout[0])
    }

    await exhibition.brochure.update(formData).then((res) => {
      Toastify({
        text: 'Success, Brochure & Layout has been updated',
        type: 'success'
      });
      setIsEdit(false)
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      })
    })

    setLoading(false)
  }

  return (
    <div className="mt-8 bg-white p-4 pb-14 rounded-lg">
      <div className="w-full flex justify-between items-center">
        <div className="font-medium text-xl text-slate-700">Section 4 Marketing Files</div>
        {isEdit ? (
          <div className="flex items-center gap-2">
            <Console.Button variant="outline-dark" className="text-sm" onClick={() => setIsEdit(false)}>
              Cancel
            </Console.Button>
            <Console.Button variant="outline-primary" className="text-sm" onClick={handleSubmit(onSubmit)} isLoading={isLoading} disabled={isLoading}>
              <Console.Lucide icon="SaveIcon" className="w-5 h-5 mr-1" />
              Submit
            </Console.Button>
          </div>
        ) : (
          <div>
            <Console.Tippy
              content="Edit"
            >
              <Console.Button
                variant="outline-dark"
                type="button"
                onClick={() => setIsEdit(true)}
              >
                <Console.Lucide icon="Edit" className="w-4 h-4" />
              </Console.Button>
            </Console.Tippy>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-start justify-center gap-4 px-64">
        <div className="w-1/3">
          <div className="text-center text-sm font-medium mb-2">Event<br></br>Statistic</div>
          <label className={clsx(
            "aspect-square bg-gray-100 border border-gray-300 w-full flex justify-center items-center rounded-lg overflow-hidden",
            { "cursor-pointer hover:bg-gray-200": isEdit }
          )}>
            {statisticImage ?
              <div className="w-full h-full relative group">
                <img src={statisticImage} className="w-full h-full object-cover" />
                {isEdit &&
                  <div className="bg-black/50 absolute w-full h-full top-0 text-white flex-col justify-center text-center items-center font-semibold hidden group-hover:flex">
                    <Console.Lucide icon="SwitchCamera" className="h-10 w-10" />
                    Change Image
                  </div>
                }
              </div> :
              <div className="flex flex-col w-full items-center justify-center">
                <Console.Lucide icon="Plus" />
                <span>Upload Image File</span>
              </div>
            }
            <input type="file" {...register('image_statistic')} className="hidden" accept="image/*" disabled={!isEdit} />
          </label>
        </div>
        <div className="w-1/3">
          <div className="text-center text-sm font-medium mb-2">Exhibition<br></br>Brochure</div>
          <label className={clsx(
            "aspect-square bg-gray-100 border border-gray-300 w-full flex justify-center items-center rounded-lg overflow-hidden",
            { "cursor-pointer hover:bg-gray-200": isEdit }
          )}>
            {brochureFile ?
              <div className="w-full h-full p-2 relative group">
                <div className="flex flex-col w-full h-full gap-2 items-center justify-center">
                  <img src="/assets/icons/pdf.png" alt="brochure file" className="w-1/2 object-cover" />
                  <span className="text-xs line-clamp-3 break-all text-center">{brochureFile}</span>
                </div>
                {isEdit &&
                  <div className="bg-primary/70 absolute w-full h-full top-0 left-0 text-white flex-col justify-center text-center items-center font-semibold hidden group-hover:flex">
                    <Console.Lucide icon="Repeat" className="h-10 w-10" />
                    Change File
                  </div>
                }
              </div> :
              <div className="flex flex-col w-full items-center justify-center">
                <Console.Lucide icon="Plus" />
                <span>Upload PDF File</span>
              </div>
            }
            <input type="file" {...register('file_brochure')} className="hidden" accept="application/pdf" disabled={!isEdit} />
          </label>
        </div>
        <div className="w-1/3">
          <div className="text-center text-sm font-medium mb-2">Exhbition<br></br>Layout</div>
          <label className={clsx(
            "aspect-square bg-gray-100 border border-gray-300 w-full flex justify-center items-center rounded-lg overflow-hidden",
            { "cursor-pointer hover:bg-gray-200": isEdit }
          )}>
            {layoutImage ?
              <div className="w-full h-full relative group">
                <img src={layoutImage} className="w-full h-full object-cover" />
                {isEdit &&
                  <div className="bg-black/50 absolute w-full h-full top-0 text-white flex-col justify-center text-center items-center font-semibold hidden group-hover:flex">
                    <Console.Lucide icon="SwitchCamera" className="h-10 w-10" />
                    Change Image
                  </div>
                }
              </div> :
              <div className="flex flex-col w-full items-center justify-center">
                <Console.Lucide icon="Plus" />
                <span>Upload Image File</span>
              </div>
            }
            <input type="file" {...register('image_layout')} className="hidden" accept="image/*" disabled={!isEdit} />
          </label>
        </div>
      </div>
    </div>
  )
}

export default Section5