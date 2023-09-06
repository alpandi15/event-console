import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object({
    recipient_id: yup.mixed().required('This field is required'),
    template_id: yup.mixed().required('This field is required')
  })
)
