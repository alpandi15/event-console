import { Console } from 'ems-component'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import FormDateTime from '@/src/components/Form/Datepicker/DateInput'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import { useAuth } from '@/src/stores/authContext'
import { apiCompanies } from '../../../services/exhibit'
import { useEffect, useState } from 'react'

const FormComponent = () => {
    const {
        control,
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()

    const { user } = useAuth()
    const { start_date, company_id } = watch()
    const [companyLists, setCompanyLists] = useState()

    const fetchCompanys = async (e) => {
        const companies = []
        await apiCompanies({ search: e, type: 'exhibitors' }).then((res) => {
            companies.push(...res.data.map(e => {
                return {
                    label: e?.company_name,
                    value: e?.id,
                    hookvalue: {
                        companys_id: e.id,
                    }
                }
            }))
        })
        setCompanyLists(companies)
        return companies;
    }

    useEffect(() => {
        if (companyLists) {
            if (company_id) {
                const find = companyLists.find((obj) => obj.value == company_id)
                setValue('companys_id', find)
            }
        }
    }, [companyLists, company_id])

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
            {(user.account_type == 'admins' || user.account_type == "organizers") &&
                <Console.FormGroup className='w-full' mode='horizontal' name="companys_id" label="Company" required>
                    <div className='w-1/2'>
                        <ReactSelectAsync
                            id="companys_id"
                            name="companys_id"
                            control={control}
                            controlStyle={errors?.companys_id ? { border: '1px solid #ff1e1e' } : {}}
                            placeholder="Select Company"
                            defaultOptions={true}
                            loadOption={fetchCompanys}
                            errorMessage={errors.companys_id ? errors.companys_id.message : undefined}
                        />
                    </div>
                </Console.FormGroup>
            }
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
