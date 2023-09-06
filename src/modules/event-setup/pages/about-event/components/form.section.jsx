import { Console, FormGroupComponent, Toastify } from "ems-component"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'
import { Carousel } from "react-responsive-carousel";
import about from "../../../services/about";

const FormSection = () => {
  const [section2Edit, setSection2Edit] = useState(false)
  const [section2Slide, setSection2Slide] = useState([])
  const [section2ImageUpload, setSection2ImageUpload] = useState([])
  const [section2Loading, setSection2Loading] = useState(false)

  const [section3Edit, setSection3Edit] = useState(false)
  const [section3Slide, setSection3Slide] = useState([])
  const [section3ImageUpload, setSection3ImageUpload] = useState([])
  const [section3Loading, setSection3Loading] = useState(false)

  const {
    control,
    register,
    watch,
    resetField,
    setValue
  } = useForm()
  const { section2description, section2ImageUploader, section3description, section3ImageUploader } = watch()

  const fetchDetail = async () => {
    await about.getDetails().then((res) => {
      const imageA = []
      const uploaderA = []
      const imageB = []
      const uploaderB = []

      if (res.data.image_a != null) {
        res.data.image_a.map((v) => {
          imageA.push(v.original)
          uploaderA.push({ file: undefined, preview: v.thumbnail, path: v.original })
        })
      }
      if (res.data.image_b != null) {
        res.data.image_b.map((v) => {
          imageB.push(v.original)
          uploaderB.push({ file: undefined, preview: v.thumbnail, path: v.original })
        })
      }
      setSection2Slide(imageA)
      setSection3Slide(imageB)
      setSection2ImageUpload(uploaderA)
      setSection3ImageUpload(uploaderB)
      setValue('section2description', res.data.description_a)
      setValue('section3description', res.data.description_b)
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }

  useEffect(() => {
    fetchDetail()
  }, [])

  useEffect(() => {
    if (section2ImageUploader) {
      if (section2ImageUploader.length) {
        const file = section2ImageUploader[0]
        if (file) {
          let reader = new FileReader();
          reader.onload = function (event) {
            setSection2ImageUpload([...section2ImageUpload, { file: file, preview: event.target.result, path: undefined }])
            setSection2Slide([...section2Slide, event.target.result])
            resetField('section2ImageUploader')
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }, [section2ImageUploader])

  useEffect(() => {
    if (section3ImageUploader) {
      if (section3ImageUploader.length) {
        const file = section3ImageUploader[0]
        if (file) {
          let reader = new FileReader();
          reader.onload = function (event) {
            setSection3ImageUpload([...section3ImageUpload, { file: file, preview: event.target.result, path: undefined }])
            setSection3Slide([...section3Slide, event.target.result])
            resetField('section3ImageUploader')
          }
          reader.readAsDataURL(file);
        }
      }
    }
  }, [section3ImageUploader])



  const saveSection2 = async () => {
    setSection2Loading(true)
    const formData = new FormData()

    formData.append('description_a', section2description)
    section2ImageUpload.map((v) => {
      formData.append('image_a', v.file)
    })

    await about.section2.upload(formData).then((res) => {
      Toastify({
        text: 'Success, Section 2 has been updated',
        type: 'success'
      });
      setSection2Edit(false)
      fetchDetail()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setSection2Loading(false)
  }
  const saveSection3 = async () => {
    setSection3Loading(true)
    const formData = new FormData()

    formData.append('description_b', section3description)
    section3ImageUpload.map((v) => {
      formData.append('image_b', v.file)
    })

    await about.section3.upload(formData).then((res) => {
      Toastify({
        text: 'Success, Section 3 has been updated',
        type: 'success'
      });
      setSection3Edit(false)
      fetchDetail()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setSection3Loading(false)
  }

  return (
    <div className="mt-8 p-5 box space-y-4">
      <div className="p-4 border rounded shadow">
        <div className="w-full flex justify-between items-center">
          <div className="font-medium text-lg">Section 2 Description</div>
          {section2Edit ? (
            <Console.Button variant="outline-primary" className="text-sm" onClick={saveSection2} isLoading={section2Loading} disabled={section2Loading}>
              <Console.Lucide icon="SaveIcon" className="w-5 h-5 mr-1" />
              Submit
            </Console.Button>
          ) : (
            <div>
              <Console.Tippy
                content="Update Banner ?"
              >
                <Console.Button
                  variant="outline-dark"
                  type="button"
                  onClick={() => setSection2Edit(true)}
                >
                  <Console.Lucide icon="Edit" className="w-4 h-4" />
                </Console.Button>
              </Console.Tippy>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/5">
            <Console.FormTextarea name="section2description" {...register('section2description')} className="h-52" placeholder="Max 3000 words..." readOnly={!section2Edit} />
            <Console.FormHelp className="text-right ml-auto">
              Maximum character {section2description?.length || 0}/3000
            </Console.FormHelp>
          </div>
          <div className="w-2/5">
            {section2Edit ?
              <div className="grid grid-cols-3 gap-2">
                {section2ImageUpload && section2ImageUpload.map((v, k) => (
                  <div className="aspect-[16/9] relative group" key={k}>
                    <img src={v.preview} className="w-full h-full object-cover" />
                    <div className="absolute top-0 w-full h-full bg-black/50 hidden group-hover:flex justify-center items-center">
                      <RemoveImage
                        section='section2'
                        index={k}
                        path={v.path}
                        imageUpload={section2ImageUpload}
                        slide={section2Slide}
                        setImageUpload={(val) => setSection2ImageUpload(val)}
                        setSlide={(val) => setSection2Slide(val)} />
                    </div>
                  </div>
                ))}
                {section2ImageUpload.length < 3 &&
                  <label className="aspect-[16/9] bg-gray-100 border border-gray-200 text-gray-400 flex flex-col items-center justify-center">
                    <Console.Lucide icon="Plus" />
                    <span>Add Image</span>
                    <input type="file" accept="image/*" {...register('section2ImageUploader')} className="hidden" />
                  </label>
                }
              </div> :
              section2Slide.length > 0 ?
                <Carousel className="w-full" itemsToShow={1} showArrows={true} showThumbs={false} autoPlay={false} infiniteLoop={true}>
                  {section2Slide.map((v, k) => (
                    <div className="w-full aspect-[16/9]" key={k}>
                      <img src={v} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </Carousel> :
                <div className="w-full aspect-[16/9] flex items-center justify-center bg-gray-200">
                  <h1>Banner Preview</h1>
                </div>
            }
          </div>
        </div>
      </div>
      <div className="p-4 border rounded shadow">
        <div className="w-full flex justify-between items-center">
          <div className="font-medium text-lg">Section 3 Description</div>
          {section3Edit ? (
            <Console.Button variant="outline-primary" className="text-sm" onClick={saveSection3} isLoading={section3Loading} disabled={section3Loading}>
              <Console.Lucide icon="SaveIcon" className="w-5 h-5 mr-1" />
              Submit
            </Console.Button>
          ) : (
            <div>
              <Console.Tippy
                content="Update Banner ?"
              >
                <Console.Button
                  variant="outline-dark"
                  type="button"
                  onClick={() => setSection3Edit(true)}
                >
                  <Console.Lucide icon="Edit" className="w-4 h-4" />
                </Console.Button>
              </Console.Tippy>
            </div>
          )}
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-2/5">
            {section3Edit ?
              <div className="grid grid-cols-3 gap-2">
                {section3ImageUpload && section3ImageUpload.map((v, k) => (
                  <div className="aspect-[16/9] relative group" key={k}>
                    <img src={v.preview} className="w-full h-full object-cover" />
                    <div className="absolute top-0 w-full h-full bg-black/50 hidden group-hover:flex justify-center items-center">
                      <RemoveImage
                        section='section3'
                        index={k}
                        path={v.path}
                        imageUpload={section3ImageUpload}
                        slide={section3Slide}
                        setImageUpload={(val) => setSection3ImageUpload(val)}
                        setSlide={(val) => setSection3Slide(val)} />
                    </div>
                  </div>
                ))}
                {section3ImageUpload.length < 3 &&
                  <label className="aspect-[16/9] bg-gray-100 border border-gray-200 text-gray-400 flex flex-col items-center justify-center">
                    <Console.Lucide icon="Plus" />
                    <span>Add Image</span>
                    <input type="file" accept="image/*" {...register('section3ImageUploader')} className="hidden" />
                  </label>
                }
              </div> :
              section3Slide.length > 0 ?
                <Carousel className="w-full" itemsToShow={1} showArrows={true} showThumbs={false} autoPlay={false} infiniteLoop={true}>
                  {section3Slide.map((v, k) => (
                    <div className="w-full aspect-[16/9]" key={k}>
                      <img src={v} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </Carousel> :
                <div className="w-full aspect-[16/9] flex items-center justify-center bg-gray-200">
                  <h1>Banner Preview</h1>
                </div>
            }
          </div>
          <div className="w-3/5">
            <Console.FormTextarea name="section3description" {...register('section3description')} className="h-52" placeholder="Max 3000 words..." readOnly={!section3Edit} />
            <Console.FormHelp className="text-right ml-auto">
              Maximum character {section3description?.length || 0}/3000
            </Console.FormHelp>
          </div>
        </div>
      </div>
    </div >
  )
}

const RemoveImage = ({ section, index, path, imageUpload, slide, setImageUpload, setSlide }) => {
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)

  const removeImage = async (s, i, p) => {
    setIsDeleteLoading(true)
    if (p == undefined) {
      const slideArray = [...slide];
      const uploadArray = [...imageUpload];
      slideArray.splice(i, 1);
      uploadArray.splice(i, 1);
      setImageUpload(uploadArray);
      setSlide(slideArray)
    } else {
      await about[s == 'section2' ? 'section2' : 'section3'].delete({ image_path: p }).then((res) => {
        const slideArray = [...slide];
        const uploadArray = [...imageUpload];
        slideArray.splice(i, 1);
        uploadArray.splice(i, 1);
        setImageUpload(uploadArray);
        setSlide(slideArray)
      }).catch((err) => {
        Toastify({
          text: err?.response.data.message,
          type: 'error'
        });
      })
    }
    setIsDeleteLoading(false)
  }

  return (
    isDeleteLoading ? <Console.LoadingIcon icon="bars" iconClass='text-primary' /> :
      <div className="bg-red-500 p-2 rounded cursor-pointer" onClick={() => removeImage(section, index, path)}>
        <Console.Lucide icon="Trash" className="text-white w-5 h-5" />
      </div>
  )
}
export default FormSection