import LayoutsEvent from "@/src/components/LayoutsEvent"
import { NextSeo } from "next-seo"

const DashboardHome = () => {
  return (
    <>
      <NextSeo title="Dashboard Event" noindex />
      <div className="h-screen">Dashboard</div>
    </>
  )
}

DashboardHome.getLayout = (page) => {
  return (
    <LayoutsEvent>{page}</LayoutsEvent>
  )
}

export default DashboardHome
