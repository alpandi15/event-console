import { Console, FormGroupComponent } from 'ems-component'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useCallback, useEffect, useState } from 'react'

const groupWapperClassName = 'grid grid-cols-12'
const groupLabelClassName = 'col-span-12 text-start'
const groupInputClassName = 'col-span-12'

const FormComponent = () => {
    const {
        control,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "subtaskform"
    });
    const addSubTask = () => {
        append({})
    }

    const { startDate } = watch()
    const [formFields, setField] = useState([])
    useEffect(() => {
        if (fields.length > 0) {
            setField([
                {
                    type: 'datepicker',
                    id: 'startDate',
                    name: "startDate",
                    isStartDate: true,
                    minDate: new Date(),
                    placeholder: "Time Start",
                    label: "Time Start",
                    required: true,
                    errorMessage: errors?.startDate?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'datepicker',
                    id: 'endDate',
                    name: "endDate",
                    placeholder: "Time End",
                    label: "Time End",
                    required: true,
                    minDate: startDate ?? null,
                    isEndDate: true,
                    errorMessage: errors?.endDate?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'text',
                    id: 'taskName',
                    name: "taskName",
                    placeholder: "Task Name",
                    label: "Task Name",
                    required: true,
                    errorMessage: errors?.taskName?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'textarea',
                    id: 'description',
                    name: "description",
                    placeholder: "Description",
                    label: "Description",
                    required: true,
                    errorMessage: errors?.description?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'textarea',
                    id: 'applyTo',
                    name: "applyTo",
                    placeholder: "Apply to",
                    label: "Apply to",
                    required: true,
                    errorMessage: errors?.applyTo?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'text',
                    id: 'score',
                    name: "score",
                    placeholder: "Score",
                    label: "Score",
                    required: true,
                    errorMessage: errors?.score?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
            ])
        } else {
            setField([
                {
                    type: 'datepicker',
                    id: 'startDate',
                    name: "startDate",
                    isStartDate: true,
                    minDate: new Date(),
                    placeholder: "Time Start",
                    label: "Time Start",
                    required: true,
                    errorMessage: errors?.startDate?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'datepicker',
                    id: 'endDate',
                    name: "endDate",
                    placeholder: "Time End",
                    label: "Time End",
                    required: true,
                    minDate: startDate ?? null,
                    isEndDate: true,
                    errorMessage: errors?.endDate?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'text',
                    id: 'taskName',
                    name: "taskName",
                    placeholder: "Task Name",
                    label: "Task Name",
                    required: true,
                    errorMessage: errors?.taskName?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'textarea',
                    id: 'description',
                    name: "description",
                    placeholder: "Description",
                    label: "Description",
                    required: true,
                    errorMessage: errors?.description?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'textarea',
                    id: 'applyTo',
                    name: "applyTo",
                    placeholder: "Apply to",
                    label: "Apply to",
                    required: true,
                    errorMessage: errors?.applyTo?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'textarea',
                    id: 'getVisit',
                    name: "getVisit",
                    placeholder: "Get Visit",
                    label: "Get Visit",
                    required: true,
                    errorMessage: errors?.getVisit?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'text',
                    id: 'point',
                    name: "point",
                    placeholder: "Point",
                    label: "Point",
                    required: true,
                    errorMessage: errors?.point?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
                {
                    type: 'text',
                    id: 'score',
                    name: "score",
                    placeholder: "Score",
                    label: "Score",
                    required: true,
                    errorMessage: errors?.score?.message,
                    groupWapperClassName,
                    groupLabelClassName,
                    groupInputClassName,
                },
            ])
        }
    }, [fields])

    // const fetchVisit = useCallback(async () => {
    //    
    // }, [company_id])


    // useEffect(() => {
    //     (async () => {
    //         await fetchVisit()
    //     })()
    // }, [fetchVisit])

    return (
        <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 space-y-4">
                <FormGroupComponent
                    mainClassName="col-span-6"
                    control={control}
                    fields={formFields}
                />
                <div className='!mt-8'>
                    <Console.Button variant="outline-primary" type="button" onClick={addSubTask}>
                        <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
                        <div className="text-sm font-normal">Add Sub Task</div>
                    </Console.Button>
                </div>
                {fields?.map((field, index) => {
                    return <FormSubTask key={field?.id} field={field} index={index} remove={() => remove(index)} />
                })}
            </div>
        </div>
    )
}

const FormSubTask = ({ field, index, remove }) => {
    const {
        control,
        formState: { errors },
        watch,
    } = useFormContext()

    const { subtaskform } = watch()

    return (
        <div className="p-4 mb-4 border border-slate-200/60 rounded">
            <div className='flex w-full gap-4 items-center'>
                <div className='w-full'>
                    <FormGroupComponent
                        mainClassName="col-span-4"
                        control={control}
                        fields={[
                            {
                                type: 'text',
                                id: `subtaskform.${index}.subTask`,
                                name: `subtaskform.${index}.subTask`,
                                placeholder: "Sub Task Name",
                                label: "Sub Task Name",
                                required: true,
                                errorMessage: errors?.subTask?.message,
                                groupWapperClassName,
                                groupLabelClassName,
                                groupInputClassName,
                            },
                            {
                                type: 'textarea',
                                id: `subtaskform.${index}.getVisit`,
                                name: `subtaskform.${index}.getVisit`,
                                placeholder: "Get Visit",
                                label: "Get Visit",
                                required: true,
                                errorMessage: errors?.getVisit?.message,
                                groupWapperClassName,
                                groupLabelClassName,
                                groupInputClassName,
                            },
                            {
                                type: 'text',
                                id: `subtaskform.${index}.point`,
                                name: `subtaskform.${index}.point`,
                                placeholder: "Point",
                                label: "Point",
                                required: true,
                                errorMessage: errors?.point?.message,
                                groupWapperClassName,
                                groupLabelClassName,
                                groupInputClassName,
                            }
                        ]}
                    />
                </div>
                <div className='w-fit'>
                    <Console.Button variant="soft-danger" onClick={remove}>
                        <Console.Lucide icon="X" className="w-4 h-4" />
                    </Console.Button>
                </div>
            </div>
        </div>
    )
}

export default FormComponent
