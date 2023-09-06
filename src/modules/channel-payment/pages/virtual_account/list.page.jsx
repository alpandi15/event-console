import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useCallback, useEffect, useState } from 'react'
import TabClassic from "@/src/components/TabClassic"
import CardComponent from './components/card.component'
import virtual_account from '../../services/virtual_account'
import clsx from 'clsx'
import { Console, PerfectScrollbar } from 'ems-component'

const ChannelPayment = () => {
  const [isLoading, setLoading] = useState(false)
  const [isLoading2, setLoading2] = useState(false)
  const [activeKey, setActiveKey] = useState('')
  const [categories, setCategories] = useState([])
  const [lists, setLists] = useState([])
  const [activeLists, setActiveLists] = useState([])

  const fetchCategories = async () => {
    setLoading(true)
    await virtual_account.apiGetCategories().then((res) => {
      const result = res.data
      result.sort((a, b) => {
        if (a.sort < b.sort) {
          return -1;
        }
        if (a.sort > b.sort) {
          return 1;
        }
        return 0;
      })
      setCategories(result)
      setActiveKey(result[0].value)
    })
    setLoading(false)
  }

  const fetchPayment = async (key) => {
    setLoading2(true)
    await virtual_account.apiGetAll({ category: key }).then((res) => {
      setLists(res.data)
    }).catch((err) => {
      console.log(err)
    })
    setLoading2(false)
  }

  const changeTab = (v) => {
    setActiveKey(v)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchPayment(activeKey)
  }, [activeKey])
  return (
    <>
      <NextSeo title="Channel Payment" noindex />
      <h2 className="mt-6 text-2xl font-medium">Channel Payment</h2>
      <p className='text-gray-500 text-sm'>Please select your desire channel payment to activate the ticket. <br></br><i>*Please note channel payment will be off if your event is a free ticket</i></p>
      <div className='side-tab-box mt-8'>
        <div className='selector'>
          {categories && categories.map((v, k) =>
            <button onClick={() => changeTab(v.value)} className={clsx({ 'active': activeKey == v.value })} key={k}>
              {v.label}
              <Console.Lucide icon='ChevronRight' />
            </button>
          )}
        </div>
        <div className='content-container'>
          <PerfectScrollbar className='p-5'>
            <CardComponent lists={lists} isLoading={isLoading} />
          </PerfectScrollbar>
        </div>
      </div>
    </>
  )
}

ChannelPayment.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ChannelPayment
