import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useForm, FormProvider } from 'react-hook-form'
import { Console, Toastify } from 'ems-component'
import FormComponent from '../components/form.component'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import activities from '../../../services/activities'
import { useRouter } from 'next/router'
import { createValidation } from '../components/validation'

const Form = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const id = router.query.id

    const methods = useForm({
        mode: 'onChange',
        resolver: createValidation,
        reValidateMode: 'onChange'
    })
    const fetchData = useCallback(async () => {
        await activities.apiDetail(id).then((res) => {
            methods.setValue('startDate', moment(res.data.start_time).toDate())
            methods.setValue('endDate', moment(res.data.end_time).toDate())
            methods.setValue('taskName', res.data.name)
            methods.setValue('description', res.data.description)
            methods.setValue('apply_tos', res.data.apply_to)
            if (res.data.subtasks.length > 0) {
                const subtaskform = []
                res.data.subtasks.map((v) => {
                    subtaskform.push({
                        id: v.id,
                        subTask: v.name,
                        visit_category: v.detail_visit.category,
                        getSelectedVisit: v.get_visit,
                        point: v.point,
                        score: v.score
                    })
                })
                methods.setValue('subtaskform', subtaskform)
            } else {
                methods.setValue('visit_category', res.data.detail_visit.category)
                methods.setValue('getSelectedVisit', res.data.get_visit)
                methods.setValue('point', res.data.point)
                methods.setValue('score', res.data.score)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id])

    const onSubmit = async (values) => {
        const formData = {
            start_time: moment(values?.startDate).toISOString(),
            end_time: moment(values?.endDate).toISOString(),
            name: values.taskName,
            description: values.description
        }
        if (values.applyTo?.length > 0) {
            const apply_to = []
            values.applyTo.map((v) => {
                apply_to.push(v.value)
            })
            formData['apply_to'] = apply_to.filter(e => e)
        }

        if (values.subtaskform.length > 0) {
            const subtasks = []
            values.subtaskform.map((v) => {
                subtasks.push({
                    id: v.id,
                    name: v.subTask,
                    get_visit: v.get_visit,
                    category: v.visit_category,
                    point: v.point
                })
            })
            formData['subtasks'] = subtasks
        } else {
            formData['get_visit'] = values.get_visit
            formData['point'] = values.point
        }
        setLoading(true)
        if (id) {
            await activities.apiUpdate(id, formData).then((res) => {
                Toastify({
                    text: 'Success update gamification activities',
                    type: 'success'
                });
                return router.push('/gamification/activities')
            }).catch((err) => {
                Toastify({
                    text: err?.response.data.message,
                    type: 'error'
                });
            })
        } else {
            await activities.apiCreate(formData).then((res) => {
                Toastify({
                    text: 'Success create gamification activities',
                    type: 'success'
                });
                return router.push('/gamification/activities')
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
            <NextSeo title={`Gamification | Activities | ${id ? 'Edit Activities' : 'Add Activities'}`} noindex />
            <div className="flex items-center my-8">
                <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit Activities' : 'Add Activities'}</h2>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='box p-4'>
                    <FormComponent />
                    <div className="flex flex-col justify-end gap-2 mt-16 md:!flex-row">
                        <Console.Button
                            type="button"
                            className="w-full py-2 border-slate-300 dark:border-darkmode-400 text-slate-500 md:!w-24"
                            onClick={() => router.push('/gamification/visit')}
                        >
                            Cancel
                        </Console.Button>
                        <Console.Button
                            variant="primary"
                            type="submit"
                            className="w-full py-2 md:!w-24"
                            disabled={methods?.formState?.isSubmitting || loading}
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