import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useState, useEffect, useCallback } from 'react'
import { Console, Toastify } from 'ems-component'
import ListComponent from '../components/list.component'
import { useRouter } from 'next/router'
import apiintegration from '../../../services/apiintegration'
import Link from 'next/link'

const ListPage = () => {
    const router = useRouter()
    const eventId = router.query.eventId
    const [lists, setLists] = useState([])
    const [meta, setMetas] = useState([])
    const [loading, setLoading] = useState(false)
    const [PageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCompany, setSelectedCompany] = useState('')
    const [generateModal, setGenerateModal] = useState(false)
    const [companies, setCompanies] = useState([])
    const [filterData, setFilterData] = useState({
        order_by: 'created_at',
        sort: 'desc',
    })

    const fetchAll = useCallback(async () => {
        setLoading(true)
        await apiintegration.apiGetAll(eventId, {
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

    const fetchCompany = useCallback(async () => {
        await apiintegration.apiGetCompanies({
            search: '',
        }).then((res) => {
            setCompanies(res.data)
        }).catch((err) => {
            console.log(err)
        })
    })

    const openGenerateModal = () => {
        setGenerateModal(true)
        fetchCompany()
    }

    useEffect(() => {
        (async () => {
            await fetchAll()
        })()
    }, [fetchAll])

    const closeGenerateModal = () => {
        setGenerateModal(false)
        setSelectedCompany('')
    }

    const generateSecretKey = async () => {
        console.log(selectedCompany)
        await apiintegration.apiCreate({ companys_id: selectedCompany }).then((res) => {
            Toastify({
                text: 'Success, Secret Key has been created',
                type: 'success'
            })
            setGenerateModal(false)
            setSelectedCompany('')
            fetchAll()
        }).catch((err) => {
            Toastify({
                text: err.message,
                type: 'error'
            })
        })
    }
    return (
        <>
            <NextSeo title="Gamification | Visits | List" noindex />
            <div className="mt-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Gamification API Integration</h2>
                </div>
            </div>
            <div className="mt-8 flex items-center gap-4">
                <Link href={`/${eventId}/gamification/api-integration`} className='text-primary font-semibold'>List</Link>
                <span>|</span>
                <Link href={`/${eventId}/gamification/api-integration/documentation`} className='hover:text-primary hover:underline'>Documentation</Link>
            </div>
            <div className="mt-8 flex items-center justify-start">
                <Console.Button
                    variant="primary"
                    className="shadow-md text-md"
                    onClick={openGenerateModal}
                >
                    Generate Key
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
                            <Console.Dialog open={generateModal} staticBackdrop={true}>
                                <Console.Dialog.Panel>
                                    <Console.Dialog.Title>
                                        <h2 className="mr-auto text-base font-medium">
                                            Generate Secret Key
                                        </h2>
                                    </Console.Dialog.Title>
                                    <div className='p-4 space-y-4'>
                                        <div className='flex items-center gap-4'>
                                            <label className='shrink-0'>Select Company</label>
                                            <Console.FormSelect defaultValue="" value={selectedCompany} onChange={(e) => setSelectedCompany(e?.target?.value)}>
                                                <option value="" disabled>Select Company</option>
                                                {companies && companies.map((v, k) => (
                                                    <option value={v.id} key={k}>{v.company_name}</option>
                                                ))}
                                            </Console.FormSelect>
                                        </div>
                                        <div className='flex gap-4 justify-end'>
                                            <Console.Button className="shadow-md text-md" onClick={closeGenerateModal}>Cancel</Console.Button>
                                            <Console.Button variant="dark" className="shadow-md text-md" onClick={generateSecretKey}>Generate</Console.Button>
                                        </div>
                                    </div>
                                </Console.Dialog.Panel>
                            </Console.Dialog>
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