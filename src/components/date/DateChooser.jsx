import { useState, useRef } from 'react'
import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { Console } from 'ems-component'
import "react-datepicker/dist/react-datepicker.css"
import cn from 'classnames'
import moment from 'moment'
import { useOutsideAlerter } from '@/src/utils/outside'

const ButtonClose = ({
    onClick
}) => {
    return (
        <button onClick={() => onClick('start', null)} className="w-3 h-3 bg-danger rounded-full flex items-center justify-center absolute right-2 top-3">
            <Console.Lucide icon="X" fontSize={10} className="w-3 h-3 text-white" />
        </button>
    )
}

const DateChooser = ({
    className,
    onChange
}) => {
    const [isStartOpen, setIsStartOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const wrapperRef = useRef(null)

    useOutsideAlerter(wrapperRef, () => {
        setIsStartOpen(false)
        setIsEndOpen(false)
    })

    const onChangeDate = (type, value) => {
        if (type === 'start') {
            setStartDate(value)
            setIsStartOpen(false)
        }
        if (type === 'end') {
            setEndDate(value)
            setIsEndOpen(false)
        }
        onChange({
            startDate: type === 'start' ? value : startDate,
            endDate: type === 'end' ? value : endDate
        })
    }

    const onReset = () => {
        setStartDate(null)
        setEndDate(null)
        onChange({
            startDate: null,
            endDate: null
        })
    }

    return (
        <div className={cn(
            "rounded-md flex items-center justify-end h-[38px] bg-white rounded-md relative",
            "relative transition duration-200 ease-in-out w-full text-sm border border-slate-200 shadow-sm"
        )}>
            <div className="px-4 cursor-pointer h-full flex flex-col leading-[10px] justify-center" onClick={() => setIsStartOpen(!isStartOpen)}>
                <div className={cn({ "text-[10px]": startDate, 'text-sm': !startDate })}>Start date</div>
                <div className="text-xs font-medium">{startDate ? moment(startDate).format('MM/DD/YYYY') : ''}</div>
            </div>
            <div className={cn("px-4 cursor-pointer h-full flex flex-col leading-[10px] justify-center border-l", { 'pr-8': startDate })} onClick={() => setIsEndOpen(!isStartOpen)}>
                <div className={cn({ "text-[10px]": endDate, 'text-sm': !endDate })}>End date</div>
                <div className="text-xs font-medium">{endDate ? moment(endDate).format('MM/DD/YYYY') : ''}</div>
            </div>
            {startDate ? <ButtonClose onClick={onReset} /> : null}
            {
                isStartOpen && (
                    <div
                        ref={wrapperRef}
                        className="absolute top-12 left-0 before:content-[''] before:absolute before:left-8 before:-top-3 before:z-[10] before:border-l-[12px] before:border-l-transparent before:border-b-[12px] before:border-b-[#aeaeae] before:border-r-[12px] before:border-r-transparent">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => onChangeDate('start', date)}
                            selectsStart
                            inline
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MM/dd/yyyy"
                            className={cn({
                                'disabled:opacity-75 bg-white appearance-none border-[1px] h-[40px] border-[#ECEDEF] rounded w-full py-2 px-4 text-strong-gray font-[400] leading-tight focus:outline-none focus:border-[#555555]': true,
                            }, className)}
                            placeholderText="Start Date"
                        />
                    </div>
                )
            }
            {
                isEndOpen && (
                    <div
                        ref={wrapperRef}
                        className="absolute top-12 left-0 before:content-[''] before:absolute before:right-20 before:-top-3 before:z-[10] before:border-l-[12px] before:border-l-transparent before:border-b-[12px] before:border-b-[#aeaeae] before:border-r-[12px] before:border-r-transparent"
                    >
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => onChangeDate('end', date)}
                            selectsEnd
                            inline
                            minDate={startDate}
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MM/dd/yyyy"
                            className={cn({
                                'disabled:opacity-75 bg-white appearance-none border-[1px] h-[40px] border-[#ECEDEF] rounded w-full py-2 px-4 text-strong-gray font-[400] leading-tight focus:outline-none focus:border-[#555555]': true,
                            }, className)}
                            placeholderText="End Date"
                        />
                    </div>
                )
            }
        </div>
    )
}

export default DateChooser
