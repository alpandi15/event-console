import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = ({ mode }) => {
  if (mode == 'edit') {
    return yupResolver(
      yup.object({
        gate_name: yup.string().required('This field is required'),
        areas_id: yup.mixed().required('This field is required'),
        tickets: yup.mixed().required('This field is required'),
        max_devices: yup.string().required('This field is required'),
        open_time: yup.string().required('This field is required'),
        close_time: yup.string().required('This field is required')
      })
    )
  } else {
    return yupResolver(
      yup.object({
        gate_name: yup.string().required('This field is required'),
        areas_id: yup.mixed().required('This field is required'),
        tickets: yup.mixed().required('This field is required'),
        pin: yup.string().length(4, 'Pin must be 4 digit number').required('This field is required'),
        pinConfirmation: yup.string().length(4, 'Pin must be 4 digit number').oneOf([yup.ref('pin'), null], 'Pin Confirmation not match').required('This field is required'),
        max_devices: yup.string().required('This field is required'),
        open_time: yup.string().required('This field is required'),
        close_time: yup.string().required('This field is required')
      })
    )
  }
}
