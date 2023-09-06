import { Console, ModernPagination, Toastify } from "ems-component"
import { useCallback, useEffect, useState } from "react"
import clsx from "clsx"
import ModalSponorComponent from "./modals/modal-sponsor.component"
import home from "../../../services/home"

const Item = ({ data, refetch }) => {
  const [isLoading, setLoading] = useState()
  const deleteSponsor = async (id) => {
    setLoading(true)
    await home.sponsor.delete(id).then((res) => {
      Toastify({
        text: 'Success, Sponsor has been deleted',
        type: 'success'
      });
      refetch()
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
    setLoading(false)
  }
  return (
    <Console.Tippy
      content={data.name}
      className="w-full relative group z-10"
    >
      <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden border">
        {isLoading ?
          <div className="w-full h-full absolute bg-dark/70 backdrop-blur-sm p-5"><Console.LoadingIcon icon="bars" iconClass='text-primary' /></div> :
          <Console.Image
            src={data.logo}
            className="w-full h-full object-cover"
          />
        }
      </div>
      <div className="hidden group-hover:block !bg-opacity-50 absolute right-0 top-0 bottom-0 left-0 bg-white">
        <div className="w-full h-full flex items-center justify-center">
          {!isLoading &&
            <Console.Tippy content="Delete this sponsor?">
              <Console.Button type="button" variant="danger" onClick={() => deleteSponsor(data.id)}>
                <div className="flex items-center justify-center w-full h-full">
                  <Console.Lucide icon="Trash2" className="w-5 h-5" />
                </div>
              </Console.Button>
            </Console.Tippy>
          }
        </div>
      </div>
    </Console.Tippy>
  )
}

const FormBanner = () => {
  const [modalUpload, setModalUpload] = useState(false);
  const [items, setItems] = useState([])
  const [meta, setMetas] = useState([])
  const [PageSize, setPageSize] = useState(16)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState([])

  const fetchData = useCallback(async () => {
    setItems([])
    await home.sponsor.get({
      per_page: PageSize,
      page: currentPage
    }).then((res) => {
      setItems(res.data)
      setMetas(res.meta)
      setCurrentPage(res?.meta?.current_page)
      setTotalPage(Array.from(Array(res.meta.total_page).keys()))
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      });
    })
  }, [PageSize, currentPage])

  useEffect(() => {
    (async () => {
      await fetchData()
    })()
  }, [fetchData])

  const prevPage = () => {
    if (currentPage == 1) {
      setCurrentPage(meta.total_page)
    } else {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage == meta.total_page) {
      setCurrentPage(1)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="grid grid-cols-12 gap-12 mt-4">
      <div className="col-span-12">
        <div className="p-5 box">
          <div className="font-medium text-lg text-slate-700">Sponsors</div>
          <div className="flex gap-4">
            <p className="w-1/3">Sponsors Image, will appear in a section 3of the landing page and will order accordingly with this layout.Please upload imagewith 1:1 ratio and size minimum 300 x 300 and maximum 800x 800 px.</p>
            <div className="w-2/3 relative px-20 pb-5">
              <div className="w-full">
                <div className="grid grid-cols-4 gap-4">
                  {items && items.map((v, k) => (
                    <Item key={k} data={v} refetch={() => fetchData()} />
                  ))}
                  <div className="w-full ">
                    <div
                      className={clsx([
                        "aspect-square w-full rounded-lg overflow-hidden border border-dashed flex items-center justify-center",
                        "group cursor-pointer bg-gray-100 hover:bg-gray-200"
                      ]
                      )}
                      onClick={() => {
                        setModalUpload(true);
                      }}
                    >
                      <Console.Lucide icon="Plus" className="w-5 h-5 text-slate-500 group-hover:text-slate-700" />
                    </div>
                  </div>
                </div>
                <div className="w-full absolute h-fit top-0 bottom-0 my-auto flex justify-between left-0 right-0">
                  <div className="w-fit h-fit bg-primary opacity-40 hover:opacity-100 cursor-pointer p-2 rounded-full flex items-center group transition-all" onClick={prevPage}>
                    <Console.Lucide icon="ChevronLeft" />
                    <span className="w-0 opacity-0 transition-all group-hover:w-fit group-hover:opacity-100">Prev</span>
                  </div>
                  <div className="w-fit h-fit bg-primary opacity-40 hover:opacity-100 cursor-pointer p-2 rounded-full flex items-center group transition-all" onClick={nextPage}>
                    <span className="w-0 opacity-0 transition-all group-hover:w-fit group-hover:opacity-100">Next</span>
                    <Console.Lucide icon="ChevronRight" />
                  </div>
                </div>
                <div className="w-full absolute h-fit bottom-0 left-0 right-0 flex justify-center gap-2">
                  {totalPage && totalPage.map((v, k) => (
                    <div className={clsx(
                      "h-3 w-3 rounded-full bg-gray-200 border border-gray-500",
                      { "bg-gray-500": (k + 1) == currentPage }
                    )} key={k} ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <ModalSponorComponent
        isOpen={modalUpload}
        setShow={setModalUpload}
        refetchData={() => fetchData()}
      />
      {/* END: Delete Confirmation Modal */}
    </div>
  )
}

export default FormBanner