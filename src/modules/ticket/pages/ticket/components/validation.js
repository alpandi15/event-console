import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object({
    name: yup.string().required('This field is required'),
    description: yup.string().required('This field is required'),
    discount_price: yup.string().when('discount_type', {
      is: (discount_type) => discount_type != undefined,
      then: yup.string().required('This field is required')
    }),
    variants: yup.array().of(
      yup.object().shape({
        variant_name: yup.string().required('This field is required'),
        subvariants: yup.array().of(
          yup.object().shape({
            variant_name: yup.string().required('This field is required'),
            bench_start: yup.string().required('This field is required'),
            bench_end: yup.string().required('This field is required'),
          })
        ),
        stock: yup.string().required('This field is required'),
        price: yup.string().required('This field is required'),
      })
    ),
    stock: yup.string().when(['variants', 'invitation'], {
      is: (variants, invitation) => variants?.length == 0 && !invitation,
      then: yup.string().required('This field is required')
    }),
    price: yup.string().when(['variants', 'invitation','isFree'], {
      is: (variants, invitation,isFree) => variants?.length == 0 && !invitation  && !isFree,
      then: yup.string().required('This field is required')
    }),
    start_sale_date: yup.string().when('invitation', {
      is: (invitation) => !invitation,
      then: yup.string().required('This field is required')
    }),
    start_sale_time: yup.string().when('invitation', {
      is: (invitation) => !invitation,
      then: yup.string().required('This field is required')
    }),
    end_sale_date: yup.string().when('invitation', {
      is: (invitation) => !invitation,
      then: yup.string().required('This field is required')
    }),
    end_sale_time: yup.string().when('invitation', {
      is: (invitation) => !invitation,
      then: yup.string().required('This field is required')
    }),
    entranceDate: yup.array().min(1, 'You must select at least one Entry Date').required('You must select at least one Entry Date').nullable()
  })
)
