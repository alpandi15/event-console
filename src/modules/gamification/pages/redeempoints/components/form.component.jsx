import { Console } from 'ems-component'
import { useFormContext } from 'react-hook-form'
import clsx from 'clsx'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import ReactSelect from '@/src/components/Form/ReactSelect'
import redeempoint from '../../../services/redeempoint'
import ImageUploader from '@/src/components/Form/ImageUploader'
import { useEffect } from 'react'

const FormComponent = () => {
    const {
        control,
        register,
        formState: { errors },
        watch,
        setValue
    } = useFormContext()

    const { image } = watch()

    const fetchSponsor = async (e) => {
        const sponsors = []
        await redeempoint.apiSponsor({ search: e }).then((res) => {
            res.data.map((v) => {
                sponsors.push({
                    value: v.id,
                    label: `${v.brand_name} (${v.company_name})`
                })
            })
        }).catch((err) => {
            console.log(err)
        })
        return sponsors
    }

    useEffect(() => {
        console.log(errors)
    }, [errors])

    useEffect(() => {
        console.log(image)
    }, [image])
    return (
        <div className="space-y-4 mt-4">
            <Console.FormGroup className='w-full items-start' mode='horizontal' name="image" label="Upload Photo" required errors={errors.image}>
                <div className='w-1/4'>
                    <ImageUploader control={control} name="image" ratio="square" />
                </div>
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="giftName" label="Gift Name" required errors={errors.giftName}>
                <Console.FormInput
                    {...register("giftName")}
                    id="giftName"
                    name="giftName"
                    type="text"
                    className={clsx([
                        "block min-w-full",
                        { "!border-danger": errors.giftName }
                    ])}
                    placeholder="Gift Name"
                    autoComplete="off"
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="point_deduction" label="Points Deduction" required errors={errors.point_deduction}>
                <Console.FormInput
                    {...register("point_deduction")}
                    id="point_deduction"
                    name="point_deduction"
                    type="number"
                    className={clsx([
                        "block min-w-full",
                        { "!border-danger": errors.point_deduction }
                    ])}
                    placeholder="Points Deduction"
                    autoComplete="off"
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="stock" label="Stock" required errors={errors.stock}>
                <Console.FormInput
                    {...register("stock")}
                    id="stock"
                    name="stock"
                    type="number"
                    className={clsx([
                        "block min-w-full",
                        { "!border-danger": errors.stock }
                    ])}
                    placeholder="Stock"
                    autoComplete="off"
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="sponsored_by" label="Sponsored By" required>
                <ReactSelectAsync
                    id="sponsored_by"
                    name="sponsored_by"
                    control={control}
                    placeholder="Sponsored By"
                    defaultOptions={true}
                    loadOption={fetchSponsor}
                    errorMessage={errors.sponsored_by ? errors.sponsored_by.message : undefined}
                />
            </Console.FormGroup>
            <Console.FormGroup className='w-full' mode='horizontal' name="status" label="Status" required>
                <ReactSelect
                    id="status"
                    name="status"
                    control={control}
                    placeholder="Status"
                    options={[
                        {
                            value: 'draft',
                            label: 'Draft'
                        },
                        {
                            value: 'active',
                            label: 'Active'
                        },
                        {
                            value: 'inactive',
                            label: 'Inactive'
                        }
                    ]}
                    errorMessage={errors.status ? errors.status.message : undefined}
                />
            </Console.FormGroup>
        </div>
    )
}

export default FormComponent
