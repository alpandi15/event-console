import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useState, useEffect, useCallback } from 'react'
import { Console, Toastify } from 'ems-component'
import ListComponent, { Filter } from '../components/list.component'
import Router from 'next/router'
import FilterDate from '@/src/components/Base/FilterDate'
import activities from '../../../services/activities'
import moment from 'moment'
import { useForm } from 'react-hook-form'

const ListPage = () => {
    const { register, watch } = useForm()
    const { search, status } = watch()
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
        await activities.apiGetAll({
            search: search || undefined,
            status: status || undefined,
            per_page: PageSize,
            page: currentPage,
            ...filterData
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
    }, [PageSize, currentPage, filterData, search, status])

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    const filterDate = (values) => {
        const { startDate, endDate } = values

        if (startDate && endDate) {
            setFilterData({
                ...filterData,
                start_date: moment(startDate).toISOString(),
                end_date: moment(endDate).toISOString()
            })
        }

        if (!startDate && !endDate) {
            setFilterData({
                ...filterData,
                start_date: undefined,
                end_date: undefined
            })
        }
    }
    return (
        <>
            <NextSeo title="Gamification | Activities | List" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Activities Point</h2>
                </div>
            </div>
            <div className="mt-8 flex items-center justify-start">
                <Console.Button
                    variant="primary"
                    className="shadow-md text-md"
                    onClick={() => Router.push(`${Router.asPath}/create`)}
                >
                    Add Activities
                </Console.Button>
            </div>
            <div className="py-4 mt-4 px-6 shadow border rounded-lg bg-white">
                <div className="flex items-center justify-end intro-y gap-4">
                    <div className="relative w-56">
                        <Console.FormInput
                            type="text"
                            className="w-56 pr-10"
                            placeholder="Search..."
                            {...register('search')}
                        />
                        <Console.Lucide
                            icon="Search"
                            className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                        />
                    </div>
                    <div className="ml-2">
                        <Console.FormSelect
                            {...register('status')}
                            className="cursor-pointer"
                            defaultValue=""
                        >
                            <option value="">All</option>
                            <option value="draft">Draft</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="live">Live</option>
                            <option value="ended">Ended</option>
                        </Console.FormSelect>
                    </div>
                    <div className="ml-2">
                        <FilterDate onChange={(e) => filterDate(e)} />
                    </div>
                </div>
                <div className="mt-6 relative z-[1]">
                    <div className="overflow-hidden mt-2">
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
        </>
    )
}

ListPage.getLayout = (page) => {
    return (
        <Layout>{page}</Layout>
    )
}

export default ListPage