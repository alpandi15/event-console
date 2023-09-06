import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { debounce } from "lodash"
import ListComponent, { Filter } from '../components/list.component'
import { useRouter } from 'next/router'
import { apiGetAll } from '../../../services/leaderboard'
import moment from 'moment'

const ListPage = () => {
    const router = useRouter()
    const eventId = router.query.eventId
    const [lists, setLists] = useState([])
    const [meta, setMetas] = useState([])
    const [loading, setLoading] = useState(false)
    const [PageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterData, setFilterData] = useState({
        order_by: 'created_at',
        sort: 'desc',
    })
    const fetchAll = useCallback(async () => {
        setLoading(true)
        await apiGetAll(eventId, {
            per_page: PageSize,
            page: currentPage,
            ...filterData
        }).then((res) => {
            console.log(res)
            setLists(res?.data)
            setMetas(res.meta)
            setCurrentPage(res?.meta?.current_page)
        }).catch((err) => {
            console.log(err)
        })
        setLoading(false)
    }, [PageSize, currentPage, filterData])

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    return (
        <>
            <NextSeo title="Gamification | Leaderboard" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gamification Leaderboard</h2>
                </div>
            </div>
            <div className="py-4 mt-12 px-6 shadow border rounded-lg bg-white">
                <div className="mt-2 relative z-[1]">
                    <div className="overflow-hidden mt-2">
                        <div>
                            <ListComponent
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