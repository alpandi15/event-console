import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { Console } from 'ems-component'
import { useState } from 'react'
import Link from 'next/link'
import TabEventFAQ from './components/tab-event-faq.component'
import TabExhibitFAQ from './components/tab-exhibit-faq.component'

const ListPage = () => {
  const [tabIndex, setTabIndex] = useState(0)

  return (
    <>
      <NextSeo title="Event Setup | FAQ" noindex />
      <div className="mt-4 flex items-center justify-between">
        <Console.Tab.Group defaultIndex={tabIndex} onChange={(index) => setTabIndex(index)}>
          <Console.Tab.List variant="pills" className="">
            <Console.Tab fullWidth={false}>
              <Console.Tab.Button className="text-sm">Attendee</Console.Tab.Button>
            </Console.Tab>
            <Console.Tab fullWidth={false}>
              <Console.Tab.Button className="text-sm">Exhibitor</Console.Tab.Button>
            </Console.Tab>
          </Console.Tab.List>
        </Console.Tab.Group>
        <Console.Button as={Link} href="#" variant="dark" className="text-sm">
          <Console.Lucide icon="Eye" className="w-4 h-4 mr-1" />
          Preview Page
        </Console.Button>
      </div>
      {tabIndex === 0 ? <TabEventFAQ /> : null}
      {tabIndex === 1 ? <TabExhibitFAQ /> : null}
    </>
  )
}

ListPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default ListPage
