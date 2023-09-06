import { useState, useEffect, useCallback } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import { apiGetAll as apiGetRoles } from '@/src/services/role.service'
import GrapesJSEditor from '@/src/components/Form/GrapesJs/grapes'
import dynamic from 'next/dynamic'
import templates from '../../../services/templates'

// const GrapesJSEditor = dynamic(() => import('@/src/components/Form/GrapesJs/grapes'), { ssr: false })

const FormComponent = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useFormContext()

  return (
    <div className="p-5 box mt-5 space-y-4">
      {/* BEGIN: Form Layout */}
      <Console.FormGroup className='w-full' mode='horizontal' name="template_name" label="Template Name" required errors={errors.template_name}>
        <Console.FormInput
          {...register("template_name")}
          id="template_name"
          name="template_name"
          type="text"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.template_name }
          ])}
          placeholder="Template Name"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="subject" label="Mail Subject" required errors={errors.subject}>
        <Console.FormInput
          {...register("subject")}
          id="subject"
          name="subject"
          type="text"
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.subject }
          ])}
          placeholder="Subject"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full items-start' mode='vertical' name="template_name" label="Template" required errors={errors.template_name}>
        <GrapesJSEditor
          name="template"
          control={control}
          endpoint={templates.apiUpload().endPoint}
          token={templates.apiUpload().token}
          className={clsx([
            "block min-w-full",
            { "!border-danger": errors.template }
          ])} />
      </Console.FormGroup>
    </div>
  )
}

export default FormComponent
