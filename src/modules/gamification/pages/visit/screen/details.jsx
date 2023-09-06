import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { Console, Toastify } from 'ems-component'
import { useCallback, useEffect, useState } from 'react'
import visit from '../../../services/visit'
import { useRouter } from 'next/router'
import ListDetail from '../components/listDetail'

const Detail = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const id = router.query.id
    const [lists, setLists] = useState([])
    const [meta, setMetas] = useState([])
    const [PageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const fetchAll = useCallback(async () => {
        setLoading(true)
        await visit.apiGetParticipants(id, {
            per_page: PageSize,
            page: currentPage
        }).then((res) => {
            setLists(res?.data)
            setMetas(res.meta)
            setCurrentPage(res?.meta?.current_page)
        }).catch((err) => {
            Toastify({
                text: err?.response.data.message,
                type: 'error'
            });
        })
        setLoading(false)
    }, [PageSize, currentPage])

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    return (
        <div>
            <NextSeo title="Gamification | Visit | Detail" noindex />
            <div className="flex items-center my-8 gap-4">
                <Console.Button variant='dark' onClick={() => router.push('/gamification/visit')}>
                    <Console.Lucide icon='ArrowLeft' className='h-5 w-5' />
                </Console.Button>
                <h2 className="mr-auto text-2xl font-medium">Visit Detail</h2>
            </div>
            <div className='py-4'>
                <ListDetail
                    lists={lists}
                    meta={meta}
                    onRefresh={fetchAll}
                    isLoading={loading}
                    pageSize={PageSize}
                    onPageChange={setCurrentPage}
                    onChangeLimit={setPageSize}
                />
            </div>
        </div>
    )
}

Detail.getLayout = (page) => {
    return (
        <Layout>{page}</Layout>
    )
}

export default Detail 