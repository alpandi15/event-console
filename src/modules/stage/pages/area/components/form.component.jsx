import { useForm } from 'react-hook-form'
import { Console, Toastify } from 'ems-component'
import clsx from 'clsx'
import area from '../../../services/area'
import { useState } from 'react'
import { createValidation } from './validation'

const FormComponent = ({ onRefresh }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({
    resolver: createValidation
  })

  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (values) => {
    setLoading(true)
    const formData = {
      area_name: values.name
    }
    await area.apiCreate(formData).then(async (res) => {
      await onRefresh()
      Toastify({
        text: "Success!, Area has been added",
        type: 'success'
      });
      reset()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-12">
          <div className="flex items-start gap-4">
            <Console.FormGroup className='w-full' mode='horizontal' name="name" label="Area Name" required errors={errors.name}>
              <Console.FormInput
                {...register("name")}
                id="name"
                name="name"
                type="text"
                className={clsx([
                  "block",
                  { "!border-danger": errors.name }
                ])}
                placeholder="Area Name"
                autoComplete="off"
              />
            </Console.FormGroup>
            <Console.Button variant="primary" className="!py-1.5" isLoading={isLoading}>
              Add
            </Console.Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default FormComponent