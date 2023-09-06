import { Console } from "ems-component"
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from "react"
import FormImageUpload from "@/src/components/Form/Image/ImageUpload"
import clsx from "clsx"
import ImageUploader from "@/src/components/Form/ImageUploader"
import { getDates } from "@/src/utils/helper"
import moment from "moment"

const FormComponent = ({ eventDetail, mode }) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()

  const watchName = watch('name')
  const watchDescription = watch('description')
  const { entranceDate } = watch()
  const [selectAllCheck, setSelectAllCheck] = useState(false)

  const d1 = new Date(eventDetail?.event?.event_start)
  const d2 = new Date(eventDetail?.event?.event_end)
  const dates = getDates(d1, d2)
  const toggleSelect = (e) => {
    if (e.currentTarget.checked) {
      const d = []
      dates.map((v) => {
        d.push(moment(v).toISOString())
      })
      setValue('entranceDate', d)
    } else {
      setValue('entranceDate', [])
    }
  }

  useEffect(() => {
    setSelectAllCheck(dates?.length == entranceDate?.length)
  }, [entranceDate])

  return (
    <div className="p-5">
      <div className="flex items-center text-lg font-medium">
        Ticket Information
      </div>
      <div className="mt-10 space-y-4">
        <div className="flex gap-4">
          <Console.FormGroup className="w-1/5 items-start" mode='vertical' name="photo" label="Ticket Image" errors={errors.photo}>
            <div className='w-full'>
              <ImageUploader control={control} name="photo" ratio="square" />
            </div>
          </Console.FormGroup>
          <div className="w-4/5">
            <div className="w-1/2">
              <Console.FormGroup className="w-full" mode='vertical' name="name" label="Ticket Name" required errors={errors.name}>
                <Console.FormInput
                  {...register("name")}
                  id="name"
                  name="name"
                  type="text"
                  className={clsx([
                    "block",
                    { "!border-danger": errors.name }
                  ])}
                  placeholder="Ticket Name"
                  autoComplete="off"
                  maxLength={70}
                />
              </Console.FormGroup>
              <Console.FormHelp className="text-right ml-auto">
                Maximum character {watchName?.length || 0}/70
              </Console.FormHelp>
            </div>
            <div className="w-1/2">
              <Console.FormGroup className="w-full items-start" mode='vertical' name="description" label="Description" required errors={errors.description}>
                <Console.FormTextarea
                  id="description"
                  name="description"
                  maxLength={300}
                  className={clsx([
                    "rounded-xl min-h-[10rem]",
                    { "!border-danger": errors.description }
                  ])}
                  {...register("description")}
                />
              </Console.FormGroup>
              <Console.FormHelp className="text-right ml-auto">
                Maximum character {watchDescription?.length || 0}/300
              </Console.FormHelp>
            </div>
          </div>
        </div>
        <Console.FormGroup className="w-3/5" mode='vertical' label="Valid Date" required errors={errors.entranceDate}>
          <table className="table">
            <thead>
              <tr>
                <th className="w-10">
                  <label className="beauty-checkbox">
                    <input type="checkbox" onChange={toggleSelect} checked={selectAllCheck} />
                    <div className="box"></div>
                  </label>
                </th>
                <th>
                  Valid Date
                </th>
              </tr>
            </thead>
            <tbody>
              {dates.map((v, k) => (
                <tr key={k}>
                  <td>
                    <label className="beauty-checkbox">
                      <input type="checkbox" name="entranceDate" value={moment(v).toISOString()} {...register(`entranceDate`)} />
                      <div className="box"></div>
                    </label>
                  </td>
                  <td>
                    {moment(v).format('DD-MM-YYYY')}
                  </td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </Console.FormGroup>
      </div>
    </div>
  )
}

export default FormComponent
