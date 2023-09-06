import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

const Documentation = () => {

    return (
        <div>
            <NextSeo title="Gamification | Visits | List" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gamification API Integration Documentation</h2>
                </div>
            </div>
            <div className="mt-2 flex items-center gap-4">
                <Link href={`/${eventId}/gamification/api-integration`} className='hover:text-primary hover:underline'>List</Link>
                <span>|</span>
                <Link href={`/${eventId}/gamification/api-integration/documentation`} className='text-primary font-semibold'>Documentation</Link>
            </div>
        </div>
    )
}

Documentation.getLayout = (page) => {
    return (
        <Layout>{page}</Layout>
    )
}

export default Documentation 