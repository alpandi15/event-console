import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Console } from 'ems-component'
import { debounce } from "lodash"
import ListComponent, { Filter } from '../components/list.component'
import { SwitchGridList } from '@/src/components/Base'
import Router, { useRouter } from 'next/router'
import FilterDate from '@/src/components/Base/FilterDate'
import Pagination from '@/src/components/Pagination'
import redeempoint from '../../../services/redeempoint'
import moment from 'moment'

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

    const fetchAll = useCallback(async () => {
        setLoading(true)
        await redeempoint.apiGetAll({
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
    }, [PageSize, currentPage, filterData])

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    return (
        <>
            <NextSeo title="Gamification | Visits | List" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gamification Redeem Points</h2>
                </div>
            </div>
            <div className="mt-8 flex items-center justify-start">
                <Console.Button
                    variant="primary"
                    className="shadow-md text-md"
                    onClick={() => Router.push(`${Router.asPath}/create`)}
                >
                    Add Redeem Point
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