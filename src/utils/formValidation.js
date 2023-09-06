import * as yup from 'yup'

const imageValidation = yup
  .mixed()
  .required("*Wajib")
  .test("fileSize", "Image too large, max 10mb", (value) => {
    if (typeof value === 'object') {
      return value && value?.size <= 10000000
    }
    return true
  })
  .test("type", "We only support jpeg", (value) => {
    if (typeof value === 'object') {
      let types = ['image/jpeg', 'image/jpg', 'image/png', 'image/JPG', 'image/JPEG']
      return value && types?.includes(value?.type)
    }
    return true
  })

const emailValidation = yup.string()
  .required('Email is required field')
  .matches(/^(([^<>()\\[\]\\.,;:_'\s@"]+(\.[^<>()\\[\]\\.,;:_'\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'You have entered as invalid e-mail address.')

const phoneValidation = yup.string().required('*Wajib')
  .matches(/^(^08|8)(\d{6,12}-?)$/, 'Gunakan format nomor Indonesia 08* or 8**')

export {imageValidation, emailValidation, phoneValidation}