import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { emailValidation } from '@/src/utils/formValidation'

export const createValidation = yupResolver(
  yup.object({
    name: yup.string().required('Name is required field'),
    company_id: yup.object().shape({
      value: yup.string().required('Company is required field'),
      label: yup.string().required('Company is required field')
    }).typeError('Company is required field').required('Company is required field'),
    event_type_id: yup.string().required('Event Type is required field'),
    event_category_id: yup.string().required('Event Category is required field'),
    domain: yup.string().required('Domain is required field'),
    extension: yup.string().required('Extension is required field'),
    startDate: yup.string().required('Event Start is required field'),
    endDate: yup.string().required('Event End is required field'),
  })
)
