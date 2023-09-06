import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object().shape({
    email: yup.string().when('phone_number', {
      is: '',
      then: yup.string().required('Please fill email or phone number')
    }).email('Please input valid email'),
    phone_number: yup.string().when('email', {
      is: '',
      then: yup.string().required('Please fill email or phone number')
    }),
    ticket_id: yup.mixed().required('This field is required'),
    qty: yup.string().required('This field is required')
  }, ['email', 'phone_number'])
)
