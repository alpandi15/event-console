import { Console } from 'ems-component'
import Layout from '@/src/components/LayoutsEvent'
import { useForm } from 'react-hook-form'
import { NextSeo } from 'next-seo'
import FormBanner from './components/form.banner'
import SelfRegistration from './components/self_registration'
import Copywriting from './components/copywriting'
import MarketingFiles from './components/marketing_files'

const FormPage = () => {
  return (
    <div>
      <NextSeo title="Event Setup | Exhibition" noindex />
      <div className="mt-8 flex justify-between items-center">
        <div>
          <h2 className="mr-auto text-2xl font-medium">Exhibition</h2>
        </div>
        <Console.Button
          variant="dark"
          className="shadow-md px-6"
        >
          <Console.Lucide icon="Eye" className="w-5 h-5 mr-2" />
          Preview Page
        </Console.Button>
      </div>
      <div className="mt-6 box p-5">
        <FormBanner />
        <hr></hr>
        <SelfRegistration />
        <hr></hr>
        <Copywriting />
        <hr></hr>
        <MarketingFiles />
      </div>
    </div>
  )
}

FormPage.getLayout = (page) => {
  return (
    <Layout>{page}</Layout>
  )
}

export default FormPage
