import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export const createValidation = yupResolver(
  yup.object({
    title: yup.string().required('This field is required'),
    date: yup.string().required('This field is required'),
    start_time: yup.string().required('This field is required'),
    end_time: yup.string().required('This field is required'),
    // live_link: yup.string().matches(
    //   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //   'Enter correct url!'
    // ).required('This field is required'),
    // on_demand_link: yup.string().matches(
    //   /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    //   'Enter correct url!'
    // ).required('This field is required'),
    // speakers_id: yup.array().required('This field is required'),
    // session_id: yup.array().required('This field is required'),
  })
)
