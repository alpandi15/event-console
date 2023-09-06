import { Console } from 'ems-component'
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'
import QuestionForm from './questionForm'
import { createValidation2 } from './validation'
import { useEffect, useState } from 'react'

const FormQuestion = ({ questionValue }) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    register,
    name: "question_forms"
  });

  const { question_forms } = watch()

  const [questions, setQuestions] = useState([])
  const [formActive, setFormActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [formQuestionMode, setFormQuestionMode] = useState('')

  const addQuestion = () => {
    append({})
    setFormActive(true)
    setFormQuestionMode('new')
    setActiveIndex(fields?.length || 0)
  }

  const removeQuestion = (k) => {
    remove(k)
    setFormActive(false)
    setFormQuestionMode('')
    setActiveIndex(null)
  }

  const closeFormQuestion = (k) => {
    if (formQuestionMode == 'new') {
      removeQuestion(k)
    } else {
      setFormActive(false)
      setFormQuestionMode('')
      setActiveIndex(null)
    }
  }

  const editQuestion = (k) => {
    setFormActive(true)
    setFormQuestionMode('edit')
    setActiveIndex(k)
  }


  const saveQuestion = async (values) => {
    if (formQuestionMode == 'new') {
      setQuestions(questions => [...questions, values]);
      setFormActive(false)
      setFormQuestionMode('')
      setActiveIndex(null)
    } else {
      let items = [...questions];
      items[activeIndex] = values;
      setQuestions(items);
      setFormActive(false)
      setFormQuestionMode('')
      setActiveIndex(null)
    }
  }

  useEffect(() => {
    if (questions) {
      if (questions.length > 0) {
        questionValue(questions)
      }
    }
  }, [questions])

  useEffect(() => {
    if (question_forms != undefined) {
      let qs = []
      question_forms.map((v) => {
        const q = {
          question_forms: {
            id: v.id,
            question: v.question,
            title: v.title,
            type: v.type
          }
        }
        if (v.answerform) {
          q['answerform'] = v.answerform
        }
        qs.push(q)
      })
      setQuestions(qs)
    }
  }, [])

  return (
    <div className="w-full box p-4 space-y-4 mt-4">
      {fields.map((v, k) => (
        <FormComponent key={v.id} fields={v} index={k} activeIndex={activeIndex} formQuestionMode={formQuestionMode} removeQuestion={(val) => removeQuestion(val)} editQuestion={(val) => editQuestion(val)} closeFormQuestion={(val) => closeFormQuestion(val)} saveQuestion={saveQuestion} />
      ))
      }
      <Console.Button
        type="button"
        className="w-fit"
        onClick={addQuestion}
        disabled={formActive}
      >
        Add Question
      </Console.Button>
      {
        errors.question_forms &&
        <div className="mt-2 text-danger text-sm">
          {errors.question_forms.message}
        </div>
      }
    </div >
  )
}

const FormComponent = ({ fields, index, activeIndex, formQuestionMode, removeQuestion, editQuestion, closeFormQuestion, saveQuestion }) => {
  const methods2 = useForm({
    mode: 'onChange',
    resolver: createValidation2,
    reValidateMode: 'onChange'
  })
  useEffect(() => {
    if (fields.rid) {
      methods2.setValue(`question_forms.${index}.id`, fields.rid)
      methods2.setValue(`question_forms.${index}.title`, fields.title)
      methods2.setValue(`question_forms.${index}.question`, fields.question)

      if (fields.type == 'single' || fields.type == 'multiple') {
        methods2.setValue(`question_forms.${index}.type`, 'choice')
        if (fields.type == 'single') {
          methods2.setValue(`question_forms.${index}.isMultiple`, 'false')
        } else {
          methods2.setValue(`question_forms.${index}.isMultiple`, 'true')
        }
        methods2.setValue(`question_forms.${index}.answerform`, fields.answerform)
      } else if (fields.type == 'rating') {
        methods2.setValue(`question_forms.${index}.type`, 'rating')
        methods2.setValue(`question_forms.${index}.level`, fields.answerform[0])
      } else {
        methods2.setValue(`question_forms.${index}.type`, 'text')
      }
    }
  }, [])

  return (
    <FormProvider {...methods2}>
      <div className='w-full space-y-4 box border border-gray-200 p-4'>
        <div className='flex gap-2 items-center'>
          {index != activeIndex &&
            <Console.Button
              type="button"
              variant='white'
              className='w-fit text-sm py-1 ml-auto'
              onClick={() => editQuestion(index)} >
              <Console.Lucide icon='Edit' className='w-4 h-4' />
              Edit
            </Console.Button>
          }
          {index == activeIndex && formQuestionMode != 'new' &&
            <Console.Button
              type="button"
              variant='danger'
              onClick={() => removeQuestion(index)}
              className='w-fit text-sm py-1'>
              <Console.Lucide icon='X' className='w-4 h-4' />
              Delete Question
            </Console.Button>
          }
        </div>
        <QuestionForm isActive={index == activeIndex} index={index} />
        {index == activeIndex &&
          <div className="flex flex-col justify-end gap-2 mt-16 md:!flex-row">
            <Console.Button
              type="button"
              className="w-full py-2 border-slate-300 dark:border-darkmode-400 text-slate-500 md:!w-24"
              onClick={() => closeFormQuestion(index)} >
              Cancel
            </Console.Button>
            <Console.Button
              variant="primary"
              type="submit"
              className="w-full py-2 md:!w-24"
              onClick={methods2.handleSubmit(saveQuestion)} >
              Submit
            </Console.Button>
          </div>
        }
      </div>
    </FormProvider>
  )
}
export default FormQuestion
