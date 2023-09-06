import _ from "lodash";
import { useState } from "react"
import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import TabClassic from "@/src/components/TabClassic"
import ListOnSales from './components/on-sales.component'
import ListOnCart from './components/on-cart.component'
import ListWaitingPayment from './components/waiting-payment.component'

const ListPage = () => {
  const [tab, setTab] = useState(0)
  return (
    <>
      <NextSeo title="Ticket Order | List" noindex />
      <h2 className="mt-6 text-2xl font-medium">Ticket Order</h2>
      <div className="mt-8">
        <TabClassic onChange={(index) => setTab(index)}>
          <TabClassic.Item>On Sales</TabClassic.Item>
          <TabClassic.Item>On Chart</TabClassic.Item>
          <TabClassic.Item>Waiting Payment</TabClassic.Item>
        </TabClassic>
      </div>
      <div>
        {tab === 0 ? (<ListOnSales />) : null}
        {tab === 1 ? (<ListOnCart />) : null}
        {tab === 2 ? (<ListWaitingPayment />) : null}
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
