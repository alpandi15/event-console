import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useForm, FormProvider } from 'react-hook-form'
import { Console, Toastify } from 'ems-component'
import FormComponent from '../components/form.component'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { createValidation } from '../components/validation'
import redeempoint from '../../../services/redeempoint'

const Form = () => {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const methods = useForm({
        mode: 'onChange',
        resolver: createValidation,
        reValidateMode: 'onChange'
    })

    const onSubmit = async (values) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', values?.image)
        formData.append('name', values?.giftName)
        formData.append('point_deduction', values?.point_deduction)
        formData.append('stock', values?.stock)
        formData.append('sponsored_by', values?.sponsored_by.value)
        formData.append('status', values?.status)

        await redeempoint.apiCreate(formData).then((res) => {
            Toastify({
                text: 'Success, Redem Points has been created',
                type: 'success'
            });
            return router.push('/gamification/redeem-points')
        }).catch((err) => {
            Toastify({
                text: err?.response.data.message,
                type: 'error'
            });
        })

        setLoading(false)
    }
    return (
        <div>
            <NextSeo title="Gamification | Redeem Points | Create" noindex />
            <div className="flex items-center my-8">
                <h2 className="mr-auto text-2xl font-medium">Add Redeem Points</h2>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='box p-4'>
                    <FormComponent />
                    <div className="flex flex-col justify-end gap-2 mt-16 md:!flex-row">
                        <Console.Button
                            type="button"
                            className="w-full py-2 border-slate-300 dark:border-darkmode-400 text-slate-500 md:!w-24"
                            onClick={() => router.push('/gamification/redeem-points')}>
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