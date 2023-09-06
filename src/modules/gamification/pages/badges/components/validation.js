import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object({
    icon: yup.mixed().required('Icon is required'),
    badgeName: yup.string().required('This field is required'),
    point: yup.string().required('This field is required')
  })
)
