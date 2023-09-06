import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import ListComponent from '../components/list.component'
import Router from 'next/router'
import badges from '../../../services/badges'

const ListPage = () => {
    const [lists, setLists] = useState([])
    const [meta, setMetas] = useState([])
    const [loading, setLoading] = useState(false)
    const [PageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [filterData, setFilterData] = useState({
        order_by: 'created_at',
        sort: 'desc',
    })
    const [queryString, setQueryString] = useState(null)

    const fetchAll = useCallback(async () => {
        setLoading(true)
        await badges.apiGetAll({
            search: queryString,
            per_page: PageSize,
            page: currentPage,
            ...filterData
        }).then((res) => {
            setLists(res?.data)
            setMetas(res.meta)
            setCurrentPage(res?.meta?.current_page)
        }).catch((err) => {
            console.log(err)
        })
        setLoading(false)
    }, [PageSize, currentPage, filterData, queryString])

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    return (
        <>
            <NextSeo title="Gamification | Badges | List" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gamification Badges</h2>
                </div>
            </div>
            <div className="mt-8 flex items-center justify-start">
                <Console.Button
                    variant="primary"
                    className="shadow-md text-md"
                    onClick={() => Router.push(`${Router.asPath}/create`)}
                >
                    Add Badges
                </Console.Button>
            </div>
            <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
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