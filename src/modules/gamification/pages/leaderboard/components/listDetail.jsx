import { Console, Toastify, ModernTable } from 'ems-component'
import moment from 'moment';
import Link from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { useState, useRef } from 'react'
import { useRouter } from 'next/router';

const ListDetail = ({
    lists = [],
    meta = [],
    onRefresh,
    isLoading,
    pageSize,
    onPageChange,
    onChangeLimit
}) => {
    const items = [
        {
            label: 'Task Name',
            render: (row) => row.name,
            class: 'whitespace-nowrap'
        },
        {
            label: 'Sub Task Name',
            render: (row) => row.subtask?.name || '-'
        },
        {
            label: 'Date Time',
            render: (row) => '-',
        },
        {
            label: 'Point',
            render: (row) => row.point
        },
        {
            label: 'Score',
            render: (row) => row.score,
        }
    ]
    console.log(lists)
    return (
        <div className="intro-y transition-all duration-500 group">
            <ModernTable
                datas={lists}
                items={items}
                metaData={meta}
                isLoading={isLoading}
            />
        </div>
    )
}

export const Filter = ({ ...props }) => {
    return (
        <div className="mt-2 flex flex-wrap justify-between items-center col-span-12 sm:flex-nowrap pb-4">
            {props.children}
        </div>
    )
}

export default ListDetail