import FormImageUpload from '@/src/components/Form/Image/ImageUpload'
import ImageUploader from '@/src/components/Form/ImageUploader'
import clsx from 'clsx'
import { Console, FormGroupComponent } from 'ems-component'
import { useFormContext } from 'react-hook-form'

const groupWapperClassName = 'grid grid-cols-12'
const groupLabelClassName = 'col-span-12 text-start'
const groupInputClassName = 'col-span-12'

const FormComponent = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()

    return (
        <div className="space-y-4 mt-4">
            <Console.FormGroup className='w-full items-start' mode='horizontal' name="icon" label="Upload Icon" required errors={errors.icon}>
                <div className='w-1/4'>
                    <ImageUploader control={control} name="icon" ratio="square" />
                </div>
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="badgeName" label="Badge Name" required errors={errors.badgeName}>
                <Console.FormInput
                    {...register("badgeName")}
                    id="badgeName"
                    name="badgeName"
                    type="text"
                    className={clsx([
                        "block min-w-full",
                        { "!border-danger": errors.badgeName }
                    ])}
                    placeholder="Badge Name"
                    autoComplete="off"
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="point" label="Point" required errors={errors.point}>
                <Console.FormInput
                    {...register("point")}
                    id="point"
                    name="point"
                    type="text"
                    className={clsx([
                        "block min-w-full",
                        { "!border-danger": errors.point }
                    ])}
                    placeholder="Point"
                    autoComplete="off"
                />
            </Console.FormGroup>
        </div>
    )
}

export default FormComponent
