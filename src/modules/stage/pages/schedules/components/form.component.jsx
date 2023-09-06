import { useState, useEffect } from 'react'
import { Console } from 'ems-component'
import clsx from 'clsx'
import { useFormContext } from 'react-hook-form'
import schedule from '../../../services/schedule'
import FormDateTime from '@/src/components/Form/Datepicker/DateInput'
import { useAuth } from '@/src/stores/authContext'
import moment from 'moment'
import ReactSelectCreatable from '@/src/components/Form/ReactSelect/Creatable'
import artist from '../../../services/artist'
import ReactSelectAsync from '@/src/components/Form/ReactSelect/Async'
import ReactSelectAsyncCreatable from '@/src/components/Form/ReactSelect/AsyncCreatable'
import session from '../../../services/session'
import CreateSpeakerComponent from './create.speaker.component'
import CreateSessionComponent from './create.session.component'

const FormComponent = () => {
  const {
    control,
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    setValue,
    getValues,
    watch,
  } = useFormContext()
  const { user } = useAuth()
  const eventDetail = user
  const d1 = new Date(eventDetail?.event?.event_start)
  const d2 = new Date(eventDetail?.event?.event_end)
  const { date, start_time, end_time, speakers_ids, session_ids } = watch()

  const [speakers, setSpeakers] = useState([])
  const [speakerLoading, setSpeakerLoading] = useState(false)
  const [sessions, setSessions] = useState([])
  const [sessionLoading, setSessionLoading] = useState(false)

  useEffect(() => {
    if (speakers_ids != undefined) {
      const speakerValues = []
      speakers_ids.split(',').map((v) => {
        const find = speakers.find((obj) => obj.value == v)
        speakerValues.push(find)
      })
      setValue('speakers_id', speakerValues)
    }
  }, [speakers_ids])

  useEffect(() => {
    if (session_ids != undefined) {
      const sessionValues = []
      session_ids.split(',').map((v) => {
        const find = sessions.find((obj) => obj.value == v)
        sessionValues.push(find)
      })
      setValue('session_id', sessionValues)
    }
  }, [session_ids])

  useEffect(() => {
    const diff = new Date(end_time) - new Date(start_time)
    const minutes = Math.round(diff / 60000)
    if (minutes) {
      setValue('duration', `${minutes} minutes`)
    }
  }, [start_time, end_time])

  const getSpeakers = async (e) => {
    const speakers = []
    await schedule.apiGetSpeakers({ search: e }).then((res) => {
      res.data.map((v) => {
        speakers.push({
          value: v.id,
          label: <div className="flex gap-2 items-center">
            <img src={v?.photo || '/assets/images/default-profile.jpg'} className="w-14" />
            {v.name}
          </div>
        })
      })
    })
    setSpeakers(setSpeakers)
    return speakers
  }

  const getSessions = async (e) => {
    const sessions = []
    await schedule.apiGetSessions({ search: e }).then((res) => {
      res.data.map((v) => {
        sessions.push({
          value: v.id,
          label: v.name
        })
      })
    })
    setSessions(sessions)

    return sessions
  }

  const filterPassedTime = (time) => {
    const currentDate = new Date(start_time.setDate(new Date().getDate()));
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const addToSelect = async (data) => {
    setSpeakerLoading(true)
    let newId = data.id
    let newName = data.name
    let newPhoto = data.photo_thumbnail || '/assets/images/default-profile.jpg'
    let current = getValues('speakers_id')
    if (current) {
      setValue('speakers_id', [...current,
      {
        value: newId,
        label: <div className="flex gap-2 items-center">
          <img src={newPhoto} className="w-14" />
          {newName}
        </div>
      }
      ])
    } else {
      setValue('speakers_id', [
        {
          value: newId,
          label: <div className="flex gap-2 items-center">
            <img src={newPhoto} className="w-14" />
            {newName}
          </div>
        }
      ])
    }
    setSpeakerLoading(false)
  }

  const addToSessionSelect = async (data) => {
    setSessionLoading(true)
    let newId = data.id
    let newName = data.name

    let current = getValues('session_id')
    if (current) {
      setValue('session_id', [...current, { value: newId, label: newName }])
    } else {
      setValue('session_id', [{ value: newId, label: newName }])
    }
    setSessionLoading(false)
  }

  return (
    <div className="w-full space-y-4">
      {/* BEGIN: Form Layout */}
      <Console.FormGroup className='w-full' mode='horizontal' name="title" label="Title" required errors={errors.title}>
        <Console.FormInput
          {...register("title")}
          id="title"
          name="title"
          type="text"
          className={clsx([
            "block !w-1/2",
            { "!border-danger": errors.title }
          ])}
          placeholder="eg: Grand Opening Show"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="date" label="Date" required errors={errors.date}>
        <FormDateTime
          name="date"
          placeholder="Date"
          icon="CalendarDays"
          minDate={d1}
          maxDate={d2}
          className={clsx([
            "!w-1/4",
            { "!border-danger": errors.date }
          ])}
          {...register('date')}
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-fit' mode='horizontal' label="Time" required>
        <div className="flex gap-4">
          <div className="!w-1/5">
            <FormDateTime
              name="start_time"
              showTimeSelectOnly
              placeholder="Start Time"
              timeIntervals={15}
              dateFormat="HH:mm a"
              icon="Timer"
              errorMessage={errors?.start_time?.message}
              className={clsx([
                { "!border-danger": errors.start_time }
              ])}
              {...register('start_time')}
            />
          </div>
          <div className="!w-1/5">
            <FormDateTime
              name="end_time"
              showTimeSelectOnly
              placeholder="End Time"
              timeIntervals={15}
              filterTime={filterPassedTime}
              dateFormat="HH:mm a"
              disabled={!start_time}
              icon="Timer"
              errorMessage={errors?.end_time?.message}
              className={clsx([
                { "!border-danger": errors.end_time }
              ])}
              {...register('end_time')}
            />
          </div>
          <Console.FormInput
            {...register("duration")}
            id="duration"
            name="duration"
            type="text"
            className='h-fit !w-fit'
            placeholder="Duration"
            autoComplete="off"
            disabled
          />
        </div>
      </Console.FormGroup>
      <Console.FormGroup className='w-full items-start' mode='horizontal' name="speakers_id" label="Speaker">
        <div className='flex gap-2'>
          <div className='!w-1/2'>
            <ReactSelectAsync
              id="speakers_id"
              name="speakers_id"
              control={control}
              isMulti={true}
              defaultOptions={true}
              placeholder="Speaker"
              loadOption={getSpeakers}
              disabled={speakerLoading}
              errorMessage={errors.speakers_id ? errors.speakers_id.message : undefined}
            />
            <span className='italic text-xs text-gray-500'>Multiple Select</span>
          </div>
          <CreateSpeakerComponent addToSelect={(data) => addToSelect(data)} />
        </div>
      </Console.FormGroup>
      <Console.FormGroup className='w-full items-start' mode='horizontal' name="session_id" label="Session">
        <div className='flex gap-2'>
          <div className='!w-1/2'>
            <ReactSelectAsync
              id="session_id"
              name="session_id"
              control={control}
              isMulti={true}
              defaultOptions={true}
              placeholder="Session"
              disabled={sessionLoading}
              loadOption={getSessions}
              errorMessage={errors.session_id ? errors.session_id.message : undefined}
            />
            <span className='italic text-xs text-gray-500'>Multiple Select</span>
          </div>
          <CreateSessionComponent addToSelect={(data) => addToSessionSelect(data)} />
        </div>
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="live_link" label="Live Link">
        <Console.FormInput
          {...register("live_link")}
          id="live_link"
          name="live_link"
          type="text"
          className={clsx([
            "block !w-1/2",
            { "!border-danger": errors.live_link }
          ])}
          placeholder="eg: https://zoom.us//performance"
          autoComplete="off"
        />
      </Console.FormGroup>
      <Console.FormGroup className='w-full' mode='horizontal' name="on_demand_link" label="On Demand Link">
        <Console.FormInput
          {...register("on_demand_link")}
          id="on_demand_link"
          name="on_demand_link"
          type="text"
          className={clsx([
            "block !w-1/2",
            { "!border-danger": errors.on_demand_link }
          ])}
          placeholder="eg: https://zoom.us//performance"
          autoComplete="off"
        />
      </Console.FormGroup>
    </div>
  )
}

export default FormComponent
