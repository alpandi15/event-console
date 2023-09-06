import _, { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import Pagination from "@/src/components/Pagination"
import { useSessionContext } from "@/src/stores/sessionContext"
import { NextSeo } from 'next-seo'
import ReactSelect from '@/src/components/Base/ReactSelect'
import Router from 'next/router'
import { useForm, FormProvider } from 'react-hook-form'
import ListComponent from './components/list-detail.component'
import FormComponent from './components/form-detail.component'
import ModalUpload from "./components/modal-upload.component";

let PageSize = 3

const FakeList = [
  { id: 0, name: 'Team Member', email: 'email@itrex.id', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 1, name: 'Team Member', email: 'email@itrex.id', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 2, name: 'Team Member', email: 'email@itrex.id', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 3, name: 'Team Member', email: 'email@itrex.id', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
  { id: 4, name: 'Team Member', email: 'email@itrex.id', company: "PT. BCA. Tbk", img: 'https://1.bp.blogspot.com/-lTJvQzNtTRw/XMTxH9UGFCI/AAAAAAAAPFQ/iVfu94tODOQ_AVuG1m-zN1Hl4NcipaCIACLcBGAs/w1200-h630-p-k-no-nu/event.png' },
]

const ListPage = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
  const [modalUpload, setModalUpload] = useState(false);
  const deleteButtonRef = useRef(null);
  const [lists, setLists] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterData, setFilterData] = useState({
    order_by: 'created_at',
    sort: 'desc',
    status: undefined
  })
  const [queryString, setQueryString] = useState(null)
  const [totalData, setTotalData] = useState(0)
  const { session: { user } } = useSessionContext()

  const methods = useForm({
    mode: 'onChange',
    // resolver: createValidation,
    reValidateMode: 'onChange'
  })

  const fetchAll = useCallback(async () => {
    // const res = await apiGetAll({
    //   search: queryString,
    //   per_page: PageSize,
    //   page: currentPage,
    //   ...filterData
    // })
    // if (res?.success) {
    //   setLists(res?.data)
    //   setTotalData(res?.meta?.total)
    //   setCurrentPage(res?.meta?.current_page)
    // }
  }, [])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  return (
    <>
      <NextSeo title="Mail Service | Recipient Detail" noindex />
      <h2 className="mt-4 text-2xl font-medium">Recipient Detail</h2>
      <div className="mt-2 flex items-center justify-end">
        <Console.Button
          variant="excel"
          className="shadow-md mr-2"
          type="button"
          onClick={() => setModalUpload(true)}
        >
          <Console.Lucide icon="FileUp" className="w-4 h-4 mr-2" />
          Upload File Excel
        </Console.Button>
        <Console.Button
          variant="primary"
          className="shadow-md"
          type="button"
          onClick={() => setDeleteConfirmationModal(true)}
        >
          <Console.Lucide icon="Plus" className="w-4 h-4 mr-2" />
          Add New
        </Console.Button>
      </div>
      <div className="py-4 mt-4">
        <div className="relative z-[1]">
          <div className="text-sm text-slate-700 font-medium intro-x">Total Data: 100</div>
          <div className="mt-2">
            <ListComponent lists={FakeList} />
            <div className="mt-4">
              <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
                <span className="font-medium">Description:</span>
                <div className="pl-4">
                  <ul className="list-disc">
                    <li>Each List can be uploaded with maximum 5,000 data.</li>
                    <li>Email of recipient list must be unique.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BEGIN: Pagination */}
        <div className="mt-8">
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalData}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
        {/* END: Pagination */}
      </div>
      {/* BEGIN: Delete Confirmation Modal */}
      <Console.Dialog
        staticBackdrop={true}
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false);
        }}
        initialFocus={deleteButtonRef}
      >
        <Console.Dialog.Panel>
          <FormProvider {...methods}>
            <Console.Dialog.Title>
              <h2 className="mr-auto text-base font-medium">
                Add Recipient
              </h2>
            </Console.Dialog.Title>
            <Console.Dialog.Description className="p-4">
              <div>
                <FormComponent />
              </div>
            </Console.Dialog.Description>
            <Console.Dialog.Footer>
              <Console.Button
                type="button"
                variant="outline-secondary"
                onClick={() => {
                  setDeleteConfirmationModal(false);
                }}
                className="w-20 mr-1"
              >
                Cancel
              </Console.Button>
              <Console.Button
                variant="primary"
                type="button"
                className="w-20"
              >
                Submit
              </Console.Button>
            </Console.Dialog.Footer>
          </FormProvider>
        </Console.Dialog.Panel>
      </Console.Dialog>
      {/* END: Delete Confirmation Modal */}

      <ModalUpload
        isOpen={modalUpload}
        onChange={setModalUpload}
      />
    </>
  )
}

ListPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListPage
