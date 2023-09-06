import _, { debounce } from "lodash";
import clsx from "clsx";
import { useCallback, useEffect, useRef, useState, useMemo, memo } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { Console } from 'ems-component'
import Link from 'next/link'
import { apiGetAll } from './templates.service'
import Pagination from "@/src/components/Pagination";
import CardComponent from "./components/card.component";
import { NextSeo } from "next-seo";

const FakeList = [
  {
    "id": "6ff38c00-397f-41eb-9f21-aa1ced0062ab",
    "name": "Template 1",
    "account_type": "organizer",
    "image": "https://previews.123rf.com/images/droidworks/droidworks1607/droidworks160700155/60501353-website-design-template-all-in-one-set-for-website-design-website-templates-and-ux-ui-kit-for-websit.jpg"
  },
  {
    "id": "6ff38c00-397f-41eb-9f21-aa1ced0062ac",
    "name": "Template 2",
    "account_type": "organizer",
    "image": "https://colorlib.com/wp/wp-content/uploads/sites/2/confer-free-template-1.jpg"
  },
  {
    "id": "6ff38c00-397f-41eb-9f21-aa1ced0062ad",
    "name": "Template 1",
    "account_type": "organizer",
    "image": "https://themewagon.com/wp-content/uploads/2021/11/material-kit-2-2021-1.png"
  },
]

let PageSize = 3

const CompanyList = () => {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
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

  const fetchAll = useCallback(async () => {
    const res = await apiGetAll({
      search: queryString,
      per_page: PageSize,
      page: currentPage,
      ...filterData
    })
    if (res?.success) {
      setLists(res?.data)
      setTotalData(res?.meta?.total)
      setCurrentPage(res?.meta?.current_page)
    }
  }, [currentPage, filterData, queryString])

  useEffect(() => {
    (async () => {
      await fetchAll()
    })()
  }, [fetchAll])

  const onSearch = useMemo(
    () => debounce(async (q) => {
      setCurrentPage(1)
      setQueryString(q)
    }, 1500),
    []
  )

  return (
    <>
      <NextSeo title="Event Setup | Design Templates" noindex />
      <div className="flex items-center mt-8 intro-x">
        <h2 className="mr-auto text-2xl font-medium">Design Templates</h2>
      </div>
      <CardComponent lists={FakeList} />
    </>
  )
}

CompanyList.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default CompanyList
