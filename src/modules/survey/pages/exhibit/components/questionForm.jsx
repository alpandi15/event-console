import { Console } from 'ems-component'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import cn from 'classnames'

const QuestionForm = ({ index, isActive }) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
        getValues
    } = useFormContext()

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        register,
        name: `question_forms.${index}.answerform`
    });

    const [answerType, setAnswerType] = useState('')
    const [ratingLevel, setRatingLevel] = useState([...Array(5).keys()])

    const addAnswer = () => {
        append({})
    }

    const { question_forms } = watch()

    useEffect(() => {
        if (parseInt(question_forms?.[index]?.level) > 1) {
            setRatingLevel([...Array(parseInt(question_forms[index].level)).keys()])
            setValue('answerform', [question_forms[index].level])
        }
    }, [question_forms?.[index]?.level])

    useEffect(() => {
        setAnswerType(question_forms?.[index]?.type)
        if (question_forms?.[index]?.type == 'choice') {
            if (question_forms?.[index]?.id == undefined || question_forms?.[index]?.id == '') {
                append({})
                append({})
            }
        } else {
            if (fields) {
                remove()
            }
        }
    }, [question_forms?.[index]?.type])

    return (
        <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12 space-y-4">
                <input type='hidden' name={`question_forms.${index}.id`} {...register(`question_forms.${index}.id`)} />
                <Console.FormGroup className='w-full' mode='vertical' name={`question_forms.${index}.title`} label="Title">
                    <Console.FormInput type='text' placeholder='Title' name={`question_forms.${index}.title`} id={`question_forms.${index}.title`} {...register(`question_forms.${index}.title`)} disabled={!isActive} />
                </Console.FormGroup>
                <div className="w-full flex gap-4">
                    <Console.FormGroup className='w-3/4' mode='vertical' name={`question_forms.${index}.question`} label="Question" required errors={errors?.question_forms?.[index]?.question}>
                        <Console.FormInput type='text' placeholder='Question' name={`question_forms.${index}.question`} id={`question_forms.${index}.question`} {...register(`question_forms.${index}.question`)} disabled={!isActive} />
                    </Console.FormGroup>
                    <Console.FormGroup className='w-1/4' mode='vertical' name={`question_forms.${index}.type`} label="Type" required errors={errors?.question_forms?.[index]?.type}>
                        <Console.FormSelect placeholder='Type' defaultValue="" name={`question_forms.${index}.type`} id={`question_forms.${index}.type`} {...register(`question_forms.${index}.type`)} disabled={!isActive}>
                            <option value="" disabled>Select Type</option>
                            <option value="choice">Choice</option>
                            <option value="text">Text</option>
                            <option value="rating">Rating</option>
                        </Console.FormSelect>
                    </Console.FormGroup>
                </div>
                {answerType == 'choice' &&
                    <Console.FormGroup className='w-1/4' mode='vertical' name={`question_forms.${index}.isMultiple`} label="Multiple Answer" required errors={errors?.question_forms?.[index]?.isMultiple}>
                        <div className='radio-switcher'>
                            <label>
                                <input type="radio" name={`question_forms.${index}.isMultiple`} value={true}  {...register(`question_forms.${index}.isMultiple`)} disabled={!isActive} checked={question_forms[index]?.isMultiple == 'true'} />
                                <span>On</span>
                            </label>
                            <label>
                                <input type="radio" name={`question_forms.${index}.isMultiple`} value={false}  {...register(`question_forms.${index}.isMultiple`)} disabled={!isActive} checked={question_forms[index]?.isMultiple == 'false' || question_forms[index]?.isMultiple == undefined} />
                                <span>Off</span>
                            </label>
                        </div>
                    </Console.FormGroup>
                }
                {answerType == 'rating' &&
                    <div className='space-y-4'>
                        <div className='flex gap-2'>
                            {ratingLevel && ratingLevel.map((v, k) => (
                                <Console.Lucide icon='Star' key={k} />
                            ))}
                        </div>
                        <div className='w-1/3 flex gap-4 items-center'>
                            <Console.FormLabel className="text-sm w-full mb-0">
                                Rating Level
                            </Console.FormLabel>
                            <Console.FormSelect placeholder='Level' disabled={!isActive} defaultValue="5" name={`question_forms.${index}.level`} id={`question_forms.${index}.level`} {...register(`question_forms.${index}.level`)}>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Console.FormSelect>
                        </div>
                    </div>
                }
                {answerType == 'choice' && fields?.map((field, k) => {
                    return <AnswerForm key={field?.id} field={field} index={k} parentIndex={index} remove={() => remove(k)} isMultiple={question_forms[index]?.isMultiple} isActive={isActive} />
                })}
                {fields.length < 8 && answerType == 'choice' && isActive &&
                    <div className="w-full flex items-center gap-2">
                        <div className={cn({
                            'rounded-full': question_forms[index]?.isMultiple == 'true',
                            'rounded': question_forms[index]?.isMultiple == 'false'
                        }, 'w-4 h-4 border border-gray-400 shrink-0')}></div>
                        <span className='text-gray-500 text-sm hover:underline cursor-pointer' onClick={addAnswer}>Add Option</span>
                    </div>
                }
            </div>
        </div>
    )
}

const AnswerForm = ({ field, index, remove, isMultiple, parentIndex, isActive }) => {
    const {
        register,
        formState: { errors },
        watch,
    } = useFormContext()

    const { answerform } = watch()

    return (
        <div className="w-full flex items-center gap-2">
            <div className={cn({
                'rounded-full': isMultiple == 'true',
                'rounded': isMultiple == 'false'
            }, 'w-4 h-4 border border-gray-400 shrink-0')}></div>
            <Console.FormInput
                type='text'
                placeholder={`Answer ${index + 1}`}
                name={`question_forms.${parentIndex}.answerform.${index}.answer`}
                {...register(`question_forms.${parentIndex}.answerform.${index}.answer`)}
                disabled={!isActive}
                className='!w-1/4' />
            {isActive &&
                <div className='w-8 h-8 rounded-full p-2 hover:bg-gray-100 cursor-pointer hover:shadow flex justify-center items-center shrink-0' onClick={remove}>
                    <Console.Lucide icon='X' className='h-full' />
                </div>
            }
        </div>
    )
}

export default QuestionForm
