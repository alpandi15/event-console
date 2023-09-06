import { Console, Toastify } from "ems-component"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useForm } from 'react-hook-form'
import FileUpload from "@/src/components/Form/FileUpload";
import exhibition from "../../../services/exhibition";

const StatisticAndAudience = () => {
  const [isLoading, setLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [statisticImage, setStatisticImage] = useState(undefined)
  const [audienceImage, setAudienceImage] = useState(undefined)
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    getValues
  } = useForm()

  const { image_statistic, image_audience } = watch()

  const fetchDetail = async () => {
    await exhibition.getDetails().then((res) => {
      setStatisticImage(res.data.statistic)
      setAudienceImage(res.data.audience)
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
    if (image_audience) {
      if (image_audience.length) {
        const file = image_audience[0]
        if (file) {
          let reader = new FileReader();
          reader.onload = function (event) {
            setAudienceImage(event.target.result)
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }, [image_audience])

  const updateData = async () => {
    setLoading(true)
    const values = getValues()

    const formData = new FormData()
    formData.append('statistic', values.image_statistic[0])
    formData.append('audience', values.image_audience[0])

    await exhibition.audience.update(formData).then((res) => {
      Toastify({
        text: 'Success, Statistic & Audience has been updated',
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
    <div className="mt-8 bg-white p-4 pb-16 rounded-lg">
      <div className="w-full flex justify-between items-center">
        <div className="font-medium text-xl text-slate-700">Section 3 Statistic and Audience</div>
        {isEdit ? (
          <div className="flex items-center gap-2">
            <Console.Button variant="outline-dark" className="text-sm" onClick={() => setIsEdit(false)}>
              Cancel
            </Console.Button>
            <Console.Button variant="outline-primary" className="text-sm" onClick={updateData} isLoading={isLoading} disabled={isLoading}>
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
      {!isEdit ?
        <div className="mt-4 flex justify-center items-stretch">
          <div className="w-1/4 aspect-[9/16] bg-gray-100 flex items-center justify-center">
            {statisticImage ?
              <img src={statisticImage} className="w-full h-full object-cover" /> :
              <div className="text-center text-sm font-medium mb-2">Event Statistic</div>
            }
          </div>
          <div className="w-px bg-gray-300"></div>
          <div className="w-1/4 aspect-[9/16] bg-gray-100 flex items-center justify-center">
            {audienceImage ?
              <img src={audienceImage} className="w-full h-full object-cover" /> :
              <div className="text-center text-sm font-medium mb-2">Event Audience</div>
            }
          </div>
        </div> :
        <div className="mt-4 flex justify-center gap-4">
          <div className="w-1/4">
            <div className="text-center text-sm font-medium mb-2">Event Statistic</div>
            <label className="aspect-[9/16] bg-gray-100 hover:bg-gray-200 border border-gray-300 w-full flex justify-center items-center rounded-lg overflow-hidden cursor-pointer">
              {statisticImage ?
                <div className="w-full h-full relative group">
                  <img src={statisticImage} className="w-full h-full object-cover" />
                  <div className="bg-black/50 absolute w-full h-full top-0 text-white flex-col justify-center items-center font-semibold hidden group-hover:flex">
                    <Console.Lucide icon="SwitchCamera" className="h-10 w-10" />
                    Change Image
                  </div>
                </div> :
                <div className="flex flex-col w-full items-center justify-center">
                  <Console.Lucide icon="Plus" />
                  <span>Upload Statistic Image</span>
                </div>
              }
              <input type="file" {...register('image_statistic')} className="hidden" accept="image/*" />
            </label>
          </div>
          <div className="w-1/4">
            <div className="text-center text-sm font-medium mb-2">Event Audience</div>
            <label className="aspect-[9/16] bg-gray-100 hover:bg-gray-200 border border-gray-300 w-full flex justify-center items-center rounded-lg overflow-hidden cursor-pointer">
              {audienceImage ?
                <div className="w-full h-full relative group">
                  <img src={audienceImage} className="w-full h-full object-cover" />
                  <div className="bg-black/50 absolute w-full h-full top-0 text-white flex-col justify-center items-center font-semibold hidden group-hover:flex">
                    <Console.Lucide icon="SwitchCamera" className="h-10 w-10" />
                    Change Image
                  </div>
                </div> :
                <div className="flex flex-col w-full items-center justify-center">
                  <Console.Lucide icon="Plus" />
                  <span>Upload Audience Image</span>
                </div>
              }
              <input type="file" {...register('image_audience')} className="hidden" accept="image/*" />
            </label>
          </div>
        </div>
      }
    </div>
  )
}

export default StatisticAndAudience