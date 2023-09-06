import _ from "lodash";
import Layout from '@/src/components/LayoutsEvent'
import { Console, Toastify } from 'ems-component'
import { NextSeo } from 'next-seo'
import Router from 'next/router'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import CardDrag from './components/dnd.component'
import { useState } from "react";
import ticket from "../../services/ticket";
import Link from "next/link";

const ListPage = () => {
  const [datas, setDatas] = useState([])
  const [isLoading, setLoading] = useState(false)
  const updateData = async () => {
    setLoading(true)
    const formData = {}
    datas.map((v, k) => {
      formData[`ids[${k}]`] = v.ev_subvariants_id ?? v.ev_variants_id ?? v.ev_products_id
    })
    await ticket.update(formData).then((res) => {
      Toastify({
        text: 'Success, Ticket has been updated',
        type: 'success'
      });
    }).catch((err) => {
      Toastify({
        text: err?.response.data.message,
        type: 'error'
      })
    })
    setLoading(false)
  }
  return (
    <>
      <NextSeo title="Event Setup | List" noindex />
      <div className="mt-6 flex justify-between items-center">
        <div>
          <h2 className="mr-auto text-2xl font-medium">Ticket</h2>
        </div>
        <Console.Button as={Link} href="#" variant="dark" className="text-sm">
          <Console.Lucide icon="Eye" className="w-4 h-4 mr-1" />
          Preview Page
        </Console.Button>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <Console.Button
          variant="primary"
          className="shadow-md px-4 rounded-lg"
          onClick={() => Router.push(`/ticket/create`)}
        >
          <Console.Lucide icon="Plus" className="w-5 h-5 mr-2" />
          Add Ticket
        </Console.Button>
        <Console.Button
          variant="warning"
          className="px-4 py-2 font-normal" onClick={updateData} isLoading={isLoading} disabled={isLoading}>
          <Console.Lucide icon="Save" className="mr-1" />
          Submit
        </Console.Button>
      </div>
      <div className="mt-2 relative z-[1] pt-4">
        <div className="">
          <DndProvider backend={HTML5Backend}>
            <CardDrag setDatas={(data) => setDatas(data)} />
          </DndProvider>
        </div>
        <div className="mt-6">
          <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
            <span className="font-medium">Drag and drop</span> to change position.
          </div>
        </div>
      </div>
    </>
  )
}

ListPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListPage
