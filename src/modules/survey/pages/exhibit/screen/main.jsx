import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Console, Toastify } from 'ems-component'
import ListComponent, { Filter } from '../components/list.component'
import { useRouter } from 'next/router'
import { apiGetAll } from '../../../services/exhibit'
import moment from 'moment'
import FormDateTime from '@/src/components/Form/Datepicker/DateInput'
import { useForm } from 'react-hook-form'

const SurveyExhibit = () => {
    const router = useRouter()
    const { register, watch, control } = useForm()
    const { search, date, status } = watch()
    const [lists, setLists] = useState([])
    const [meta, setMetas] = useState([])
    const [loading, setLoading] = useState(false)
    const [PageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)

    const fetchAll = useCallback(async () => {
        setLoading(true)
        let filters = {}
        if (search != '') {
            filters['search'] = search
        }
        if (date != undefined) {
            filters['date'] = moment(date).format('YYYY-MM-DD')
        }
        if (status != '') {
            filters['status'] = status
        }
        await apiGetAll({
            ...filters,
            per_page: PageSize,
            page: currentPage,
            order_by: 'created_at',
            sort: 'desc'
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
    }, [PageSize, currentPage, search, date, status])

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    return (
        <>
            <NextSeo title="Survey | Exhibit | List" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Exhibit Survey</h2>
                </div>
            </div>
            <div className="mt-8 flex items-center justify-start">
                <Console.Button
                    variant="primary"
                    className="shadow-md text-md"
                    onClick={() => router.push(`${router.asPath}/create`)}
                >
                    Add Survey
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
                            <option value="live">Live</option>
                            <option value="ended">Ended</option>
                        </Console.FormSelect>
                    </div>
                    <div className="ml-2">
                        <FormDateTime
                            name="date"
                            placeholder="Date"
                            icon="CalendarDays"
                            control={control}
                            clearable={true}
                            {...register('date')}
                        />
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

SurveyExhibit.getLayout = (page) => {
    return (
        <Layout>{page}</Layout>
    )
}

export default SurveyExhibit