import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import ListComponent, { Filter } from '../components/list.component'
import { apiGetAll, apiGetGifts } from '../../../services/dataredeem'
import { useForm } from 'react-hook-form'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'

const ListPage = () => {
    const { register, control, watch } = useForm()
    const { search, gift_name } = watch()

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
        await apiGetAll({
            search: search || undefined,
            redeem_points_id: gift_name?.value || undefined,
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
    }, [PageSize, currentPage, filterData, search, gift_name])

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    const fetchGift = async (e) => {
        const gifts = []
        await apiGetGifts({ search: e }).then((res) => {
            res.data.map((v) => {
                gifts.push({
                    value: v.id,
                    label: v.name
                })
            })
        }).catch((err) => {
            console.log(err)
        })
        return gifts
    }

    return (
        <>
            <NextSeo title="Gamification | Data Redeem | List" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gamification Data Redeem</h2>
                </div>
            </div>
            <div className="py-4 mt-12 px-6 shadow border rounded-lg bg-white">
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
                    <div className="ml-2 w-44">
                        <ReactSelectAsync
                            id="gift_name"
                            name="gift_name"
                            control={control}
                            placeholder="Gift Name"
                            defaultOptions={true}
                            isClearable={true}
                            loadOption={fetchGift}
                        />
                    </div>
                </div>
                <div className="mt-6 relative z-[1]">
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