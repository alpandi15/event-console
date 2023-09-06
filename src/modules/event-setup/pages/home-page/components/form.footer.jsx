import { Console, Toastify } from "ems-component"
import { useEffect, useState } from "react"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import home from "../../../services/home"

const Tiktok = () => (
  <svg className="svg-inline--fa fa-tiktok h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="tiktok" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path className="" fill="currentColor" d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg>
)
const Email = () => (
  <svg className="svg-inline--fa fa-envelope h-4" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="envelope" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path className="" fill="currentColor" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path></svg>
)
const Instagram = () => (
  <svg className="svg-inline--fa fa-instagram h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path className="" fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
)
const Twitter = () => (
  <svg className="svg-inline--fa fa-twitter h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path className="" fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg>
)
const LinkedIn = () => (
  <svg className="svg-inline--fa fa-linkedin h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path className="" fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
)
const Facebook = () => (
  <svg className="svg-inline--fa fa-facebook h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path className="" fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
)

const FormFooter = () => {
  const { control, register, watch, resetField, getValues, setValue } = useForm()
  const { file } = watch()
  const [isLoading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState(false)
  const [preview, setPreview] = useState()
  const [editSocial, setEditSocial] = useState(false)

  const fetchData = async () => {
    await home.footer.get().then((res) => {
      setPreview(res.data.logo)
      setValue('instagram', res.data.footer.instagram)
      setValue('twitter', res.data.footer.twitter)
      setValue('linkedin', res.data.footer.linkedln)
      setValue('facebook', res.data.footer.facebook)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (file) {
      if (file.length) {
        uploadLogo(file[0])
      }
    }
  }, [file])

  const uploadLogo = async (file) => {
    setLoading(true)
    const formData = new FormData
    formData.append('logo', file)

    await home.footer.update(formData).then((res) => {
      Toastify({
        text: 'Success, Organized By Logo has been updated',
        type: 'success'
      });
      resetField('file')
      if (file) {
        let reader = new FileReader();
        reader.onload = function (event) {
          setPreview(event.target.result)
        }
        reader.readAsDataURL(file);
      }
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setLoading(false)
  }

  const saveSocial = async () => {
    setSocialLoading(true)
    const values = getValues()
    const formValue = {
      instagram: values.instagram,
      twitter: values.twitter,
      linkedln: values.linkedin,
      facebook: values.facebook
    }

    const formData = new FormData
    formData.append('footer', JSON.stringify(formValue))

    await home.footer.update(formData).then((res) => {
      Toastify({
        text: 'Success, Social media link has been updated',
        type: 'success'
      });
      setEditSocial(false)
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setSocialLoading(false)
  }

  return (
    <div className="w-full p-5 box mt-4">
      <div className="font-medium text-lg text-slate-700">Footer</div>
      <div className="flex gap-8">
        <p className="w-1/3 mt-4">Footer area will appear on every page of the website. You can full fill with Your company logo and Link to social media</p>
        <div className="w-2/3 flex gap-8">
          <div className="w-1/4 flex flex-col gap-2 py-4">
            <span>Organized By:</span>
            <label className="cursor-pointer">
              <div className={clsx(
                "w-full aspect-square bg-gray-100 rounded text-gray-400 transition-all hover:bg-primary hover:text-dark relative group",
                preview ? "p-0" : "p-4"
              )}>
                {preview ?
                  <img src={preview} className="w-full h-full object-cover" /> :
                  <Console.Lucide icon="FileImage" className="w-full h-full" />
                }
                <div className="w-full h-0 opacity-0 transition-all group-hover:h-full group-hover:opacity-100 absolute top-0 left-0 bg-black/60 flex justify-center items-center">
                  <Console.Lucide icon="Edit" className="text-white" />
                </div>
              </div>
              <input type="file" className="hidden" {...register('file')} accept="image/*" />
            </label>
            <span className="block text-center w-full">Upload Image 500x500</span>
          </div>
          <div className="flex flex-col w-3/4 h-fit gap-2 border p-4 rounded shadow">
            <div className="flex justify-between mb-4">
              <span>Social media Link</span>
              <Console.Lucide icon="Edit" className="h-5 w-5 cursor-pointer hover:text-primary" onClick={() => {
                editSocial ? setEditSocial(false) : setEditSocial(true)
              }} />
            </div>
            {/* <div className="flex gap-2 items-center">
              <Email />
              <Console.FormInput type="text" name="email" {...register('email')} placeholder="Email" />
            </div> */}
            <div className="flex gap-2 items-center">
              <Instagram />
              <Console.FormInput type="text" name="instagram" {...register('instagram')} placeholder="Instagram" readOnly={!editSocial} />
            </div>
            <div className="flex gap-2 items-center">
              <Twitter />
              <Console.FormInput type="text" name="twitter" {...register('twitter')} placeholder="Twitter" readOnly={!editSocial} />
            </div>
            <div className="flex gap-2 items-center">
              <LinkedIn />
              <Console.FormInput type="text" name="linkedin" {...register('linkedin')} placeholder="LinkedIn" readOnly={!editSocial} />
            </div>
            {/* <div className="flex gap-2 items-center">
              <Tiktok />
              <Console.FormInput type="text" name="tiktok" {...register('tiktok')} placeholder="Tiktok" />
            </div> */}
            <div className="flex gap-2 items-center">
              <Facebook />
              <Console.FormInput type="text" name="facebook" {...register('facebook')} placeholder="Facebook" readOnly={!editSocial} />
            </div>
            {editSocial &&
              <div className="flex gap-4 justify-end mt-4">
                <Console.Button
                  type="button"
                  variant="outline-secondary"
                  className="w-20 mr-1"
                  onClick={() => setEditSocial(false)}>
                  Cancel
                </Console.Button>
                <Console.Button
                  variant="primary"
                  type="button"
                  className="px-8"
                  onClick={saveSocial}
                  isLoading={socialLoading}
                  disabled={socialLoading}>
                  Submit
                </Console.Button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormFooter