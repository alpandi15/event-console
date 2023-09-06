import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { emailValidation } from '@/src/utils/formValidation'

export const createValidation = yupResolver(
  yup.object({
    image: yup.mixed().required('Photo is required'),
    giftName: yup.string().required('This field is required'),
    point_deduction: yup.string().required('This field is required'),
    stock: yup.string().required('This field is required'),
    sponsored_by: yup.mixed().required('This field is required'),
    status: yup.mixed().required('This field is required')
  })
)
