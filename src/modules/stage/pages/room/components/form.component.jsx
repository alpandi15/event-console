import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import room from '../../../services/room'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'

const FormComponent = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    setValue,
    watch,
  } = useFormContext()

  const fetchAreas = async (e) => {
    const areas = []
    await room.fetchAreas({ search: e }).then((res) => {
      res.data.map((v) => {
        areas.push({
          label: v.area_name,
          value: v.id
        })
      })
    }).catch((err) => {
      console.log(err)
    })

    return areas
  }

  return (
    <div className="w-full space-y-4">
      {/* BEGIN: Form Layout */}
      <Console.FormGroup className='w-full' mode='horizontal' name="room_name" label="Room Name" required errors={errors.room_name}>
        <Console.FormInput
          {...register("room_name")}
          id="room_name"
          name="room_name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.room_name }
          ])}
          placeholder="Room Name"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="room_no" label="Room Number" required errors={errors.room_no}>
        <Console.FormInput
          {...register("room_no")}
          id="room_no"
          name="room_no"
          type="number"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.room_no }
          ])}
          placeholder="Room Number"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full items-start' mode='horizontal' name="areas_id" label="Select Area" required>
        <ReactSelectAsync
          id="areas_id"
          name="areas_id"
          control={control}
          defaultOptions={true}
          placeholder="Select Area"
          loadOption={fetchAreas}
          errorMessage={errors.areas_id ? errors.areas_id.message : undefined}
        />
      </Console.FormGroup>
    </div>
  )
}

export default FormComponent
