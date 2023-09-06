import { Console, Toastify } from "ems-component"
import { useCallback, useEffect, useState } from "react"
import ModalUpload from "./modals/modal-banner.component"
import ClassicImageUpload from "@/src/components/Form/ClassicImageUpload/ClassicImageUpload";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import home from "../../../services/home";
import clsx from "clsx";

const FormBanner = () => {
  const [slideContent, setSlideContent] = useState([]);
  const { control, watch, setValue, reset } = useForm()
  const [mode, setMode] = useState('desktop')
  const image = useWatch({
    control,
    name: "image",
  });

  const fetchData = useCallback(async () => {
    reset()
    await home.banner.get({ type: mode }).then((res) => {
      res.data.map((v) => {
        setValue(`image.${v.index - 1}`, JSON.stringify({ preview: v.banner, id: v.id, index: v.index }))
      })
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }, [mode])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  useEffect(() => {
    const slideContents = []
    image?.map((v, k) => {
      if (v) {
        if (typeof v == 'string') {
          slideContents.push({ image: JSON.parse(v).preview, index: k })
        } else {
          slideContents.push({ image: v.preview, index: k })
        }
      }
    })
    setSlideContent(slideContents)
  }, [image])

  const uploadBanner = async (e, type, index, id) => {
    const formData = new FormData()
    formData.append('banner', e)
    formData.append('type', type)
    formData.append('index', index)
    if (id) {
      return await home.banner.update(id, formData)
    } else {
      return await home.banner.upload(formData)
    }
  }

  const deleteBanner = async (id) => {
    return await home.banner.delete(id)
  }

  const refetchData = () => {
    fetchData()
  }

  return (
    <div className="grid grid-cols-12 gap-12 mt-4">
      <div className="col-span-12">
        <div className="p-5 box">
          <div className="flex gap-4">
            <span className={clsx(
              "cursor-pointer hover:text-primary",
              { "text-primary": mode == 'desktop' }
            )} onClick={() => setMode('desktop')}>Desktop</span>
            <span>|</span>
            <span className={clsx(
              "cursor-pointer hover:text-primary",
              { "text-primary": mode == 'mobile' }
            )} onClick={() => setMode('mobile')}>Mobile</span>
          </div>
          <div className="font-medium text-lg text-slate-700 mt-4">Main Banner</div>
          <span>Image banner will appear in your Landing Page website, Please upload file with jpg, png extension and size accordingly</span>
          <div className="mt-2 flex gap-4">
            <div className="bg-gray-100 w-1/4 flex flex-col gap-4 p-4 rounded items-center justify-center">
              <ClassicImageUpload size="wide" label="Main Image" control={control} key={0} name="image.0" type={mode} index="1" onChange={uploadBanner} onDelete={deleteBanner} refetch={refetchData} />
              <div className="flex gap-4 w-full">
                <ClassicImageUpload size="square" label="Image 2" control={control} key={1} name="image.1" type={mode} index="2" onChange={uploadBanner} onDelete={deleteBanner} refetch={refetchData} />
                <ClassicImageUpload size="square" label="Image 3" control={control} key={2} name="image.2" type={mode} index="3" onChange={uploadBanner} onDelete={deleteBanner} refetch={refetchData} />
              </div>
              <div className="flex gap-4 w-full">
                <ClassicImageUpload size="square" label="Image 4" control={control} key={3} name="image.3" type={mode} index="4" onChange={uploadBanner} onDelete={deleteBanner} refetch={refetchData} />
                <ClassicImageUpload size="square" label="Image 5" control={control} key={4} name="image.4" type={mode} index="5" onChange={uploadBanner} onDelete={deleteBanner} refetch={refetchData} />
              </div>
              {mode == 'desktop' ?
                <span className="text-sm">Maximum size 1520x800 pixel</span> :
                <span className="text-sm">Maximum size 425x200 pixel</span>
              }
            </div>
            {slideContent.length > 0 ?
              <Carousel className="w-3/4" itemsToShow={1} showArrows={true} showThumbs={false} autoPlay={true} infiniteLoop={true}>
                {slideContent.map((v, k) => (
                  <div className="h-96" key={k}>
                    <img src={v.image} className="w-full h-full object-cover" />
                  </div>
                ))}
              </Carousel> :
              <div className="w-3/4 h-96 flex items-center justify-center bg-gray-200">
                <h1>Banner Preview</h1>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormBanner