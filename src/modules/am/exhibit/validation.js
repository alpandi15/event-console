import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { emailValidation } from '@/src/utils/formValidation'

export const createValidation = yupResolver(
  yup.object({
    // first_name: yup.string()
    //   .required('First Name is required field')
    //   .min(3, 'First Name must be at least 3 characters')
    //   .matches(/^[a-zA-Z\-0-9\s]+$/, 'First Name must be alphanumberic only'),
    // last_name: yup.string()
    //   .required('Last Name is required field')
    //   .min(3, 'Last Name must be at least 3 characters')
    //   .matches(/^[a-zA-Z\-0-9\s]+$/, 'Last Name must be alphanumberic only'),
    // role_id: yup.string()
    //   .required('Role is required field'),
    // email: emailValidation,
    // phone_number: yup.string().required('Phone Number is required field')
  })
)
