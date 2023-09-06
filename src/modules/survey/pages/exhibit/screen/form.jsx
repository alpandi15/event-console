import Layout from '@/src/components/LayoutsEvent'
import { NextSeo } from 'next-seo'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { Console, FormGroupComponent, Toastify } from 'ems-component'
import FormComponent from '../components/form.component'
import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import { apiCreate, apiDetail, apiUpdate } from '../../../services/exhibit'
import { useRouter } from 'next/router'
import { createValidation, createValidation2 } from '../components/validation'
import QuestionForm from '../components/questionForm'
import FormQuestion from '../components/form.question.component'

const Form = () => {
    const methods = useForm({
        mode: 'onChange',
        resolver: createValidation,
        reValidateMode: 'onChange'
    })

    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const id = router.query.id
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (id) {
            fetchData()
        }
    }, [id])

    const fetchData = useCallback(async () => {
        await apiDetail(id).then((res) => {
            const result = res.data
            methods.setValue('surveyName', result.name)
            methods.setValue('company_id', result.companys_id)
            methods.setValue('start_date', moment(result.time_start).toDate())
            methods.setValue('start_time', moment(result.time_start).toDate())
            methods.setValue('end_date', moment(result.time_end).toDate())
            methods.setValue('end_time', moment(result.time_end).toDate())
            const questions = []
            result.questions.map((v) => {
                const answers = []
                if (v.type != 'text' && v.type != 'rating') {
                    JSON.parse(v.answer).map((v2) => {
                        answers.push({ answer: v2 })
                    })
                }
                if (v.type == 'rating') {
                    answers.push(JSON.parse(v.answer))
                }
                questions.push({
                    rid: v.id,
                    answerform: answers,
                    question: v.question,
                    title: v.title,
                    type: v.type
                })
            })
            methods.setValue('question_forms', questions)
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

    const zeroPad = (value) => {
        return String(value).padStart(2, '0');
    }

    const saveDraft = async () => {
        setLoading(true)
        const values = methods.getValues()
        const d = new Date(values?.start_time)
        const startTime = `${zeroPad(d.getHours())}:${zeroPad(d.getMinutes())}:00`
        const e = new Date(values?.end_time)
        const endTime = `${zeroPad(e.getHours())}:${zeroPad(e.getMinutes())}:00`

        const formData = {
            name: values?.surveyName,
            time_start: moment(`${moment(values?.start_date).format('YYYY-MM-DD')} ${startTime}`).toISOString(),
            time_end: moment(`${moment(values?.end_date).format('YYYY-MM-DD')} ${endTime}`).toISOString(),
            status: 'draft'
        }

        if (values?.companys_id) {
            formData['companys_id'] = values?.companys_id?.value
        }

        const questionDatas = []
        questions.map((v) => {
            const questionForm = {}
            let q = {}
            v?.question_forms?.map((v2) => {
                if (v2) {
                    q = v2
                    if (v2.id) {
                        questionForm['id'] = v2.id
                    }
                    questionForm['title'] = v2.title
                    questionForm['question'] = v2.question
                    if (q.type == 'choice') {
                        if (v2.isMultiple == 'true') {
                            questionForm['type'] = 'multiple'
                        } else if (v2.isMultiple == 'false') {
                            questionForm['type'] = 'single'
                        }
                    } else {
                        questionForm['type'] = v2.type
                    }
                }
            })
            if (q.type == 'choice') {
                const answers = []
                q.answerform.map((v2) => {
                    answers.push(v2.answer)
                })
                questionForm['answer'] = answers
            } else if (q.type == 'rating') {
                questionForm['answer'] = q.level
            }
            questionDatas.push(questionForm)
        })
        formData['questions'] = questionDatas

        if (id) {
            await apiUpdate(id, formData).then((res) => {
                Toastify({
                    text: 'Success update exhibit survey',
                    type: 'success'
                });
                return router.push('/survey/exhibit-survey')
            }).catch((err) => {
                Toastify({
                    text: err?.response.data.message,
                    type: 'error'
                });
            })
        } else {
            await apiCreate(formData).then((res) => {
                Toastify({
                    text: 'Success create exhibit survey',
                    type: 'success'
                });
                return router.push('/survey/exhibit-survey')
            }).catch((err) => {
                Toastify({
                    text: err?.response.data.message,
                    type: 'error'
                });
            })
        }
        setLoading(false)
    }

    const onSubmit = async () => {
        if (questions.length == 0) {
            if (id) {
                setLoading(true)
                const values = methods.getValues()
                const d = new Date(values?.start_time)
                const startTime = `${zeroPad(d.getHours())}:${zeroPad(d.getMinutes())}:00`
                const e = new Date(values?.end_time)
                const endTime = `${zeroPad(e.getHours())}:${zeroPad(e.getMinutes())}:00`

                const formData = {
                    name: values?.surveyName,
                    time_start: moment(`${moment(values?.start_date).format('YYYY-MM-DD')} ${startTime}`).toISOString(),
                    time_end: moment(`${moment(values?.end_date).format('YYYY-MM-DD')} ${endTime}`).toISOString(),
                    status: 'live',
                    questions: []
                }

                if (values?.companys_id) {
                    formData['companys_id'] = values?.companys_id
                }

                if (id) {
                    await apiUpdate(id, formData).then((res) => {
                        Toastify({
                            text: 'Success update exhibit survey',
                            type: 'success'
                        });
                        return router.push('/survey/exhibit-survey')
                    }).catch((err) => {
                        Toastify({
                            text: err?.response.data.message,
                            type: 'error'
                        });
                    })
                } else {
                    await apiCreate(formData).then((res) => {
                        Toastify({
                            text: 'Success create exhibit survey',
                            type: 'success'
                        });
                        return router.push('/survey/exhibit-survey')
                    }).catch((err) => {
                        Toastify({
                            text: err?.response.data.message,
                            type: 'error'
                        });
                    })
                }
                setLoading(false)
            } else {
                methods.setError('questions', { minLength: 1, message: 'Please add at least one question!' })
            }
        } else {
            setLoading(true)
            const values = methods.getValues()
            const d = new Date(values?.start_time)
            const startTime = `${zeroPad(d.getHours())}:${zeroPad(d.getMinutes())}:00`
            const e = new Date(values?.end_time)
            const endTime = `${zeroPad(e.getHours())}:${zeroPad(e.getMinutes())}:00`

            const formData = {
                name: values?.surveyName,
                time_start: moment(`${moment(values?.start_date).format('YYYY-MM-DD')} ${startTime}`).toISOString(),
                time_end: moment(`${moment(values?.end_date).format('YYYY-MM-DD')} ${endTime}`).toISOString(),
                status: 'live'
            }

            if (values?.companys_id) {
                formData['companys_id'] = values?.companys_id
            }

            const questionDatas = []
            questions.map((v) => {
                const questionForm = {}
                let q = {}
                v?.question_forms?.map((v2) => {
                    if (v2) {
                        q = v2
                        if (v2.id) {
                            questionForm['id'] = v2.id
                        }
                        questionForm['title'] = v2.title
                        questionForm['question'] = v2.question
                        if (q.type == 'choice') {
                            if (v2.isMultiple == 'true') {
                                questionForm['type'] = 'multiple'
                            } else if (v2.isMultiple == 'false') {
                                questionForm['type'] = 'single'
                            }
                        } else {
                            questionForm['type'] = v2.type
                        }
                    }
                })
                if (q.type == 'choice') {
                    const answers = []
                    q.answerform.map((v2) => {
                        answers.push(v2.answer)
                    })
                    questionForm['answer'] = answers
                } else if (q.type == 'rating') {
                    questionForm['answer'] = q.level
                }
                questionDatas.push(questionForm)
            })
            formData['questions'] = questionDatas

            if (id) {
                await apiUpdate(id, formData).then((res) => {
                    Toastify({
                        text: 'Success update exhibit survey',
                        type: 'success'
                    });
                    return router.push('/survey/exhibit-survey')
                }).catch((err) => {
                    Toastify({
                        text: err?.response.data.message,
                        type: 'error'
                    });
                })
            } else {
                await apiCreate(formData).then((res) => {
                    Toastify({
                        text: 'Success create exhibit survey',
                        type: 'success'
                    });
                    return router.push('/survey/exhibit-survey')
                }).catch((err) => {
                    Toastify({
                        text: err?.response.data.message,
                        type: 'error'
                    });
                })
            }
            setLoading(false)
        }
    }
    return (
        <div>
            <NextSeo title={`Gamification | Exhibit Survey | ${id ? 'Edit' : 'Add'}`} noindex />
            <div className="flex items-center my-8">
                <h2 className="mr-auto text-2xl font-medium">{id ? 'Edit Exhibit Survey' : 'Add Exhibit Survey'}</h2>
            </div>
            <FormProvider {...methods}>
                <div className='box p-4'>
                    <FormComponent />
                </div>
                <FormQuestion questionValue={(val) => setQuestions(val)} />
                <div className="flex flex-col justify-end gap-2 mt-16 md:!flex-row">
                    <Console.Button
                        type="button"
                        variant='dark'
                        className="w-full py-2 md:!w-24"
                        onClick={() => router.push('/survey/exhibit-survey')}
                    >
                        Cancel
                    </Console.Button>
                    <Console.Button
                        variant="white"
                        type="button"
                        className="w-fit py-2"
                        disabled={methods?.formState?.isSubmitting || loading}
                        onClick={methods.handleSubmit(saveDraft)}
                        isLoading={loading}>
                        Save Draft
                    </Console.Button>
                    <Console.Button
                        variant="primary"
                        type="button"
                        className="w-fit py-2"
                        disabled={methods?.formState?.isSubmitting || loading}
                        onClick={methods.handleSubmit(onSubmit)}
                        isLoading={loading}
                    >
                        Submit
                    </Console.Button>
                </div>
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