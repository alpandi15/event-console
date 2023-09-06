import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { emailValidation } from '@/src/utils/formValidation'

export const createValidation = yupResolver(
  yup.object({
    startDate: yup.string().required('Time Start is required field'),
    endDate: yup.string().required('Time End is required field'),
    taskName: yup.string().required('Task Name is required field'),
    description: yup.string().required('Description Type is required field'),
    subtaskform: yup.array().of(
      yup.object().shape({
        subTask: yup.string().required("Sub Task Name is required field"),
        get_visit: yup.string().required("Please select visit category and get visit"),
        point: yup.string().required("Point is required")
      })
    ),
    get_visit: yup.string().when('subtaskform', {
      is: (subtaskform) => !subtaskform || subtaskform.length == 0,
      then: yup.string().required('Please select visit category and get visit').nullable(true)
    }),
    point: yup.mixed().when('subtaskform', {
      is: (subtaskform) => !subtaskform || subtaskform.length == 0,
      then: yup.string().required('Point is required field').nullable(true)
    })
  })
)
