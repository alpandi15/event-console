import { Console } from 'ems-component'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import FormDateTime from '@/src/components/Form/Datepicker/DateInput'
import FormDateRange from '@/src/components/Form/Datepicker/DateRangeInput'
import { useEffect } from 'react'
import moment from 'moment'

const FormComponent = () => {
    const {
        control,
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()

    const { start_date } = watch()

    return (
        <div className="w-full mt-4 space-y-4">
            <Console.FormGroup className='w-full' mode='horizontal' name="surveyName" label="Survey Name" required errors={errors.surveyName}>
                <Console.FormInput
                    {...register("surveyName")}
                    id="surveyName"
                    name="surveyName"
                    type="text"
                    className={clsx([
                        "block !w-1/2",
                        { "!border-danger": errors.surveyName }
                    ])}
                    placeholder="Survey Name"
                    autoComplete="off"
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="start_time" label="Survey Start" required errors={errors.start_date || errors.start_time}>
                <div className='flex gap-4 w-1/2'>
                    <FormDateTime
                        name="start_date"
                        placeholder="Start Date"
                        icon="CalendarDays"
                        className={clsx([
                            "block min-w-full",
                            { "!border-danger": errors.start_date }
                        ])}
                        {...register('start_date')}
                    />
                    <FormDateTime
                        name="start_time"
                        showTimeSelectOnly
                        placeholder="Start Time"
                        dateFormat="HH:mm a"
                        icon="Timer"
                        className={clsx([
                            "block min-w-full",
                            { "!border-danger": errors.start_time }
                        ])}
                        {...register('start_time')}
                    />
                </div>
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="end_time" label="Survey End" required errors={errors.end_date || errors.end_time}>
                <div className='flex gap-4 w-1/2'>
                    <FormDateTime
                        name="end_date"
                        placeholder="End Date"
                        icon="CalendarDays"
                        minDate={start_date}
                        className={clsx([
                            "block min-w-full",
                            { "!border-danger": errors.end_date }
                        ])}
                        disabled={!start_date}
                        {...register('end_date')}
                    />
                    <FormDateTime
                        name="end_time"
                        showTimeSelectOnly
                        placeholder="End Time"
                        dateFormat="HH:mm a"
                        icon="Timer"
                        disabled={!start_date}
                        className={clsx([
                            "block min-w-full",
                            { "!border-danger": errors.end_time }
                        ])}
                        {...register('end_time')}
                    />
                </div>
            </Console.FormGroup>
        </div>
    )
}

export default FormComponent
