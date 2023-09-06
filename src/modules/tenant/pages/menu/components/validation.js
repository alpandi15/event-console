import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object({
    price: yup.mixed().when('variants', {
      is: (variants) => variants.length == 0,
      then: yup.string().required('This field is required')
    }),
    variants: yup.array().of(
      yup.object().shape({
        default_price: yup.string().required('This field is required'),
      })
    ),

  })
)
