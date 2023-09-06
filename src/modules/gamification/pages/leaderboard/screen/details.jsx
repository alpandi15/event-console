import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { Console, Toastify } from 'ems-component'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { apiDetail, apiResetData } from '../../../services/leaderboard'
import ListDetail from '../components/listDetail'

const Detail = () => {
    const router = useRouter()
    const id = router.query.leaderboardId
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [resetModal, setResetModal] = useState(false);

    const fetchData = useCallback(async () => {
        setLoading(true)
        if (!id) return
        await apiDetail(id).then((res) => {
            setData(res.data)
            return
        }).catch((err) => {
            console.log(err)
        })
        setLoading(false)
    }, [id])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const resetData = () => {
        setResetModal(true)
    }
    const processResetData = async () => {
        await apiResetData(id).then((res) => {
            Toastify({
                text: 'Success Reset Data',
                type: 'success'
            })
        }).catch((err) => {
            Toastify({
                text: err?.response.data.message,
                type: 'error'
            });
        })
        setResetModal(false)
        router.push('/gamification/leaderboard')
    }
    return (
        <div>
            <NextSeo title="Gamification | Leaderboard | Detail" noindex />
            <div className="flex items-center my-8 gap-4">
                <Console.Button variant='dark' onClick={() => router.push('/gamification/leaderboard')}>
                    <Console.Lucide icon='ArrowLeft' className='h-5 w-5' />
                </Console.Button>
                <h2 className="mr-auto text-2xl font-medium">Leaderboard Detail</h2>
            </div>
            <div className=''>
                <div className='w-full flex pt-4 gap-4'>
                    <div className='w-1/4 space-y-4'>
                        <div className='box bg-primary p-4 flex flex-col items-center justify-center gap-4'>
                            <div className='w-32 h-32 rounded-full shrink-0 bg-black bg-opacity-20 p-4'>
                                <Console.Lucide icon='Gamepad2' className='w-full h-full' />
                            </div>
                            <div className='w-full flex flex-col'>
                                <span className='font-semibold'>{data.participant?.full_name}</span>
                                <span>{data.participant?.email}</span>
                                <span>{data.participant?.phone_number || '-'}</span>
                            </div>
                        </div>
                        <Console.Button variant='danger' onClick={resetData} className='w-full'>
                            RESET DATA
                        </Console.Button>
                    </div>
                    <div className='w-3/4'>
                        <div className='box shadow-md border p-4 flex flex-col justify-center items-center gap-4'>
                            <ListDetail
                                lists={data.task}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Console.Dialog
                open={resetModal}
                onClose={() => {
                    setResetModal(false);
                }}>
                <Console.Dialog.Panel>
                    <div className="p-5 text-center">
                        <Console.Lucide
                            icon="XCircle"
                            className="w-16 h-16 mx-auto mt-3 text-danger"
                        />
                        <div className="mt-5 text-3xl">Are you sure?</div>
                        <div className="mt-2 text-slate-500">
                            Do you really want to reset this data? <br />
                            This process cannot be undone.
                        </div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <Console.Button
                            variant="outline-secondary"
                            type="button"
                            onClick={() => {
                                setResetModal(false);
                            }}
                            className="w-24 mr-1">
                            Cancel
                        </Console.Button>
                        <Console.Button
                            variant="danger"
                            type="button"
                            className="w-24"
                            onClick={processResetData}>
                            Confirm
                        </Console.Button>
                    </div>
                </Console.Dialog.Panel>
            </Console.Dialog>
        </div>
    )
}

Detail.getLayout = (page) => {
    return (
        <Layout>{page}</Layout>
    )
}

export default Detail 