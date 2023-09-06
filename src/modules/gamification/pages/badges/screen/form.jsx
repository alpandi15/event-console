import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useForm, FormProvider } from 'react-hook-form'
import { Console, Toastify } from 'ems-component'
import FormComponent from '../components/form.component'
import { useCallback, useEffect, useState } from 'react'
import badges from '../../../services/badges'
import { useRouter } from 'next/router'
import { createValidation } from '../components/validation'

const Form = () => {
    const methods = useForm({
        mode: 'onChange',
        resolver: createValidation,
        reValidateMode: 'onChange'
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const id = router.query.id

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id])

    const fetchData = useCallback(async () => {
        await badges.apiDetail(id).then((res) => {
            methods.setValue('badgeName', res.data.name)
            methods.setValue('icon', res.data.icon)
            methods.setValue('point', res.data.point)
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

    const onSubmit = async (values) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('name', values?.badgeName)
        formData.append('point', values?.point)
        formData.append('icon', values?.icon)

        // console.log(formData)
        if (id) {
            await badges.apiUpdate(id, formData).then((res) => {
                Toastify({
                    text: 'Success, Badge has been updated',
                    type: 'success'
                });
                return router.push('/gamification/badges')
            }).catch((err) => {
                Toastify({
                    text: err?.response.data.message,
                    type: 'error'
                });
            })
        } else {
            await badges.apiCreate(formData).then((res) => {
                Toastify({
                    text: 'Success, Badge has been added',
                    type: 'success'
                });
                return router.push('/gamification/badges')
            }).catch((err) => {
                Toastify({
                    text: err?.response.data.message,
                    type: 'error'
                });
            })
        }
        setLoading(false)
    }
    return (
        <div>
            <NextSeo title={`Gamification | Badges | ${id ? 'Edit Badge' : 'Add Badge'}`} noindex />
            <div className="flex items-center my-8">
                <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit Badge' : 'Add Badge'}</h2>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='box p-4'>
                    <FormComponent />
                    <div className="flex flex-col justify-end gap-2 mt-16 md:!flex-row">
                        <Console.Button
                            type="button"
                            className="w-full py-2 border-slate-300 dark:border-darkmode-400 text-slate-500 md:!w-24"
                            onClick={() => router.push('/gamification/badges')}>
                            Cancel
                        </Console.Button>
                        <Console.Button
                            variant="primary"
                            type="submit"
                            className="w-full py-2 md:!w-24"
                            disabled={loading}
                            isLoading={loading}>
                            Submit
                        </Console.Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

Form.getLayout = (page) => {
    return (
        <Layout>{page}</Layout>
    )
}

export default Form 