import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object({
    stock: yup.mixed().when('variants', {
      is: (variants) => variants.length == 0,
      then: yup.string().required('This field is required')
    }),
    price: yup.mixed().when('variants', {
      is: (variants) => variants.length == 0,
      then: yup.string().required('This field is required')
    }),
    variants: yup.array().of(
      yup.object().shape({
        default_price: yup.mixed().when('sub_variants', {
          is: (sub_variants) => sub_variants.length == 0,
          then: yup.string().required('This field is required')
        }).nullable(),
        stock: yup.mixed().when('sub_variants', {
          is: (sub_variants) => sub_variants.length == 0,
          then: yup.string().required('This field is required')
        }),
        sub_variants: yup.array().of(
          yup.object().shape({
            default_price: yup.string().required('This field is required'),
            stock: yup.string().required('This field is required')
          })
        )
      })
    ),

  })
)
