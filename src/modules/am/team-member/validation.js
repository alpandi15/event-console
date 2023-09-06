import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { emailValidation } from '@/src/utils/formValidation'

export const createValidation = yupResolver(
  yup.object({
    users_id:yup.object()
    .required('User is required field'),
    role_event_id: yup.string()
      .required('Role is required field'),
    
  })
)
