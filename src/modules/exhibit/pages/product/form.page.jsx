import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useForm, FormProvider } from 'react-hook-form'
import { Console, Toastify } from 'ems-component'
import FormComponent from './components/form.component'
import { useState } from 'react'
import { createValidation } from './components/validation'
import product from '../../services/product'
import { useRouter } from 'next/router'

const FormCreate = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const methods = useForm({
        mode: 'onChange',
        resolver: createValidation,
        reValidateMode: 'onChange'
    })

    const onSubmit = async (values) => {
        setLoading(true)
        const formData = {
            product_prices_id: values.id,
        }

        if (values.variants.length > 0) {
            const variants = []
            values.variants.map((v) => {
                if (v.sub_variants.length > 0) {
                    const subvariants = []
                    v.sub_variants.map((v2) => {
                        subvariants.push({
                            product_subvariants_id: v2.id,
                            price: v2.default_price,
                            stock: v2.stock
                        })
                    })
                    variants.push({
                        product_variants_id: v.id,
                        subvariants: subvariants
                    })
                } else {
                    variants.push({
                        product_variants_id: v.id,
                        price: v.default_price,
                        stock: v.stock
                    })
                }
            })
            formData['variants'] = variants
        } else {
            formData['price'] = values.price
            formData['stock'] = values.stock
        }

        await product.addProduct(formData).then((res) => {
            Toastify({
                text: 'Success, Product has been added',
                type: 'success'
            });
            return router.push('/exhibit/product')
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
            <NextSeo title="Exhibit | Product | Add" noindex />
            <div className="flex items-center mt-8">
                <h2 className="mr-auto text-2xl font-medium">Add Product</h2>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div>
                        <FormComponent />
                    </div>

                    <div className="flex flex-col justify-end gap-2 mt-5 md:!flex-row">
                        <Console.Button
                            type="button"
                            className="w-full py-3 border-slate-300 dark:border-darkmode-400 text-slate-500 md:!w-52"
                            onClick={() => router.push('/exhibit/product/list')}>
                            Cancel
                        </Console.Button>
                        <Console.Button
                            variant="primary"
                            type="submit"
                            className="w-full py-3 md:!w-52"
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

FormCreate.getLayout = (page) => {
    return (
        <Layout>{page}</Layout>
    )
}

export default FormCreate
