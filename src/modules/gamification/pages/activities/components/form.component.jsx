import { Console, FormGroupComponent } from 'ems-component'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'
import visit, { apiGetTickets } from '../../../services/visit'
import ReactSelect from '@/src/components/Form/ReactSelect'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import clsx from 'clsx'
import FormDateTime from '@/src/components/Form/Datepicker/DateInput'
import moment from 'moment-timezone'

const FormComponent = () => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()

    const { subtaskform, visit_category, get_visit, apply_tos, getSelectedVisit } = watch()

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "subtaskform"
    });

    const addSubTask = () => {
        append({})
    }
    const getTicket = async (e) => {
        const tickets = []
        await visit.apiGetTicket({ search: e }).then((res) => {
            tickets.push({
                value: null,
                label: `All`
            })
            res.data.map((v) => {
                if (v.subvariant != undefined) {
                    tickets.push({
                        value: v.subvariant.id,
                        label: `${v.product.detail_product.name} - ${v.variant.variant_name} - ${v.subvariant.variant_name}`
                    })
                } else if (v.variant != undefined) {
                    tickets.push({
                        value: v.variant.id,
                        label: `${v.product.detail_product.name} - ${v.variant.variant_name}`
                    })
                } else {
                    tickets.push({
                        value: v.product.id,
                        label: `${v.product.detail_product.name}`
                    })
                }
            })
        }).catch((err) => {
            console.log(err)
        })
        return tickets
    }
    const [category, setCategory] = useState([])
    const getCategory = useCallback(async () => {
        await visit.apiGetActivityCategorys({ visit_category: visit_category }).then((res) => {
            setCategory(res.data)
        }).catch((err) => {
            console.log(err)
        })
        if (getSelectedVisit != undefined) {
            setValue('get_visit', getSelectedVisit)
        }
    }, [visit_category])

    useEffect(() => { getCategory() }, [getCategory])
    const [visits, setVisits] = useState([])

    const getVisit = useCallback(async () => {
        setValue('get_visit', undefined)
        const visits = []
        if (visit_category != undefined) {
            await visit.apiGetActivities({ visit_category: visit_category }).then((res) => {
                res.data.map((v) => {
                    visits.push({
                        value: v.value,
                        label: v.label
                    })
                })
            }).catch((err) => {
                console.log(err)
            })
            if (getSelectedVisit != undefined) {
                setValue('get_visit', getSelectedVisit)
            }
        }
        setVisits(visits)
    }, [visit_category])

    useEffect(() => { getVisit() }, [getVisit])

    const [isSubTask, setIsSubTask] = useState(false)

    useEffect(() => {
        if (fields.length > 0) {
            setIsSubTask(true)
        } else {
            setIsSubTask(false)
        }
    }, [fields])

    const setApplyTo = async (apply_tos) => {
        const tickets = await getTicket('')
        const apply_to = []
        apply_tos.map((v) => {
            const find = tickets.find((obj) => obj.value == v)
            apply_to.push(find)
        })
        setValue('applyTo', apply_to)
    }

    useEffect(() => {
        if (apply_tos != undefined) {
            setApplyTo(apply_tos)
        }
    }, [apply_tos])
    return (
        <div className="space-y-4 mt-4">
            {!isSubTask &&
                <Console.FormGroup className='w-full' mode='horizontal' label="Activities Type" required errors={errors.get_visit}>
                    <div className='flex flex-col gap-4'>
                        <ReactSelect
                            id="visit_category"
                            name="visit_category"
                            className="w-1/2"
                            control={control}
                            defaultOptions={true}
                            placeholder="eg: Exhibitor Display"
                            options={category}
                            controlStyle={errors?.get_visit ? { border: '1px solid #ff1e1e' } : {}}
                        />
                        <ReactSelect
                            {...register('get_visit')}
                            id="get_visit"
                            name="get_visit"
                            className="w-1/2"
                            control={control}
                            defaultOptions={true}
                            placeholder="Get Activities"
                            options={visits}
                            controlStyle={errors?.get_visit ? { border: '1px solid #ff1e1e' } : {}}
                        />
                    </div>
                </Console.FormGroup>
            }
            <Console.FormGroup className='w-full' mode='horizontal' name="taskName" label="Task Name" required errors={errors.taskName}>
                <Console.FormInput
                    {...register("taskName")}
                    id="taskName"
                    name="taskName"
                    type="text"
                    className={clsx([
                        "block !w-1/2",
                        { "border-danger": errors.taskName }
                    ])}
                    placeholder="eg: Read Brochure booth A"
                    autoComplete="off"
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full items-start' mode='horizontal' name="description" label="Description" required errors={errors.description}>
                <Console.FormTextarea
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    className={clsx([
                        "block !w-1/2  min-h-[7rem]",
                        { "border-danger": errors.description }
                    ])}
                    placeholder="Description"
                    autoComplete="off"
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="date" label="Date" required errors={errors.date}>
                <FormDateTime
                    name={`date`}
                    placeholder="Date"
                    dateFormat="dd/MM/yyyy"
                    icon="Calendar"
                    className={clsx([
                        "!w-fit",
                        { "!border-danger": errors.date }
                    ])}
                    {...register(`date`)}
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="startDate" label="Time Start" required errors={errors.startDate}>
                <FormDateTime
                    name={`startDate`}
                    showTimeSelectOnly
                    placeholder="Time Start"
                    dateFormat="HH:mm a"
                    icon="Timer"
                    className={clsx([
                        "!w-fit",
                        { "!border-danger": errors.startDate }
                    ])}
                    {...register(`startDate`)}
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="endDate" label="Time End" required errors={errors.endDate}>
                <FormDateTime
                    name={`endDate`}
                    showTimeSelectOnly
                    placeholder="Time End"
                    dateFormat="HH:mm a"
                    icon="Timer"
                    className={clsx([
                        "!w-fit",
                        { "!border-danger": errors.endDate }
                    ])}
                    {...register(`endDate`)}
                />
            </Console.FormGroup>

            <Console.FormGroup className='w-full items-start' mode='horizontal' name="applyTo" label="Ticket Category" errors={errors.applyTo}>
                <div className='w-1/2'>
                    <ReactSelectAsync
                        id="applyTo"
                        name="applyTo"
                        className="w-full"
                        control={control}
                        loadOption={getTicket}
                        isMulti={true}
                        placeholder="Ticket Category"
                        defaultOptions={true}
                        controlStyle={errors?.applyTo ? { border: '1px solid #ff1e1e' } : {}}
                    />
                </div>
            </Console.FormGroup>

            {!isSubTask &&
                <Console.FormGroup className='w-full items-start' mode='horizontal' name="point" label="Point" required errors={errors.point}>
                    <Console.FormInput
                        {...register("point")}
                        id="point"
                        name="point"
                        type="text"
                        className={clsx([
                            "block !w-1/2",
                            { "border-danger": errors.point }
                        ])}
                        placeholder="Point"
                        autoComplete="off"
                    />
                </Console.FormGroup>
            }
            <div className='!mt-8'>
                <Console.Button variant="outline-primary" type="button" onClick={addSubTask}>
                    <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
                    <div className="text-sm font-normal">Add Sub Task</div>
                </Console.Button>
            </div>
            {fields?.map((field, index) => {
                return <FormSubTask key={index} field={field} index={index} remove={() => remove(index)} />
            })}
        </div>
    )
}

const FormSubTask = ({ field, index, remove }) => {
    const {
        register,
        control,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()

    const { subtaskform } = watch()
    const [category, setCategory] = useState([])
    const getCategory = useCallback(async () => {
        const visit_category = subtaskform?.[index]?.visit_category
        await visit.apiGetActivityCategorys({ visit_category: visit_category }).then((res) => {
            setCategory(res.data)
        }).catch((err) => {
            console.log(err)
        })

    }, [])

    useEffect(() => { getCategory() }, [getCategory])
    const [visits, setVisits] = useState([])

    const getVisit = useCallback(async () => {
        setValue(`subtaskform.${index}.get_visit`, undefined)
        const visit_category = subtaskform?.[index]?.visit_category
        const visits = []
        if (visit_category != undefined) {
            await visit.apiGetActivities({ visit_category: visit_category }).then((res) => {
                res.data.map((v) => {
                    visits.push({
                        value: v.value,
                        label: v.label
                    })
                })
            }).catch((err) => {
                console.log(err)
            })
        }
        setVisits(visits)
        if (subtaskform?.[index]?.getSelectedVisit != undefined) {
            setValue(`subtaskform.${index}.get_visit`, subtaskform?.[index]?.getSelectedVisit)
        }
    }, [subtaskform?.[index]?.visit_category, subtaskform?.[index]?.getSelectedVisit])

    useEffect(() => { getVisit() }, [getVisit])

    return (
        <div className="p-4 mb-4 border border-slate-200/60 rounded">
            <div className='flex w-full gap-4 items-center'>
                <div className='w-full flex gap-4'>
                    <Console.FormGroup className='w-4/12' mode='vertical' name={`subtaskform[${index}].subTask`} label="Sub Task Name" required errors={errors.subtaskform?.[index]?.subTask}>
                        <input type='hidden' name={`subtaskform[${index}].id`} id={`subtaskform[${index}].id`} {...register(`subtaskform[${index}].id`)} />
                        <Console.FormInput
                            {...register(`subtaskform[${index}].subTask`)}
                            id={`subtaskform[${index}].subTask`}
                            name={`subtaskform[${index}].subTask`}
                            type="text"
                            className={clsx([
                                "block min-w-full",
                                { "border-danger": errors?.subtaskform?.[index]?.subTask }
                            ])}
                            placeholder="Sub Task Name"
                            autoComplete="off"
                        />
                    </Console.FormGroup>
                    <Console.FormGroup className='w-6/12' mode='vertical' label="Activities Type" required errors={errors.subtaskform?.[index]?.get_visit}>
                        <div className='flex gap-4'>
                            <ReactSelect
                                id={`subtaskform.${index}.visit_category`}
                                name={`subtaskform.${index}.visit_category`}
                                className="w-full"
                                control={control}
                                defaultOptions={true}
                                placeholder="Activities Type"
                                options={category}
                                controlStyle={errors.subtaskform?.[index]?.get_visit ? { border: '1px solid #ff1e1e' } : {}}
                            />
                            <ReactSelect
                                id={`subtaskform.${index}.get_visit`}
                                name={`subtaskform.${index}.get_visit`}
                                className="w-full"
                                control={control}
                                defaultOptions={true}
                                placeholder="Get Activities"
                                options={visits}
                                controlStyle={errors.subtaskform?.[index]?.get_visit ? { border: '1px solid #ff1e1e' } : {}}
                            />
                        </div>
                    </Console.FormGroup>
                    <Console.FormGroup className='w-2/12' mode='vertical' name={`subtaskform[${index}].point`} label="Point" required errors={errors.subtaskform?.[index]?.point}>
                        <div className='flex gap-2 w-full'>
                            <Console.FormInput
                                {...register(`subtaskform.${index}.point`)}
                                id={`subtaskform.${index}.point`}
                                name={`subtaskform.${index}.point`}
                                type="text"
                                className={clsx([
                                    "block",
                                    { "border-danger": errors.subtaskform?.[index]?.point }
                                ])}
                                placeholder="Point"
                                autoComplete="off"
                            />
                            <div className='w-fit'>
                                <Console.Button variant="soft-danger" onClick={remove}>
                                    <Console.Lucide icon="X" className="w-4 h-4" />
                                </Console.Button>
                            </div>
                        </div>
                    </Console.FormGroup>
                </div>

            </div>
        </div>
    )
}

export default FormComponent
