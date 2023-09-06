import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object({
    surveyName: yup.string().required('This field is required'),
    companys_id: yup.object().required('This field is required'),
    start_date: yup.string().required('Start Date is required'),
    end_date: yup.string().required('End Date is required'),
    start_time: yup.string().required('Start Time is required'),
    end_time: yup.string().required('End Time is required')
  })
)

export const createValidation2 = yupResolver(
  yup.object({
    question_forms: yup.array().of(
      yup.object().shape({
        question: yup.string().required('This field is required'),
        type: yup.string().required('This field is required')
      })
    )
  })
)