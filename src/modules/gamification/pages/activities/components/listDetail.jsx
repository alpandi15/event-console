import { ModernTable } from 'ems-component'
import moment from 'moment';
import 'react-perfect-scrollbar/dist/css/styles.css';

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
            render: (row) => row.task.name,
            class: 'whitespace-nowrap'
        },
        {
            label: 'Sub Task Name',
            render: (row) => row.subtask?.name || '-'
        },
        {
            label: 'Email',
            render: (row) => row.participant.email,
        },
        {
            label: 'Phone No',
            render: (row) => row.participant.phone_number
        },
        {
            label: 'First Name',
            render: (row) => row.participant.first_name,
        },
        {
            label: 'Last Name',
            render: (row) => row.participant.last_name,
        },
        {
            label: 'Point',
            render: (row) => row.task.point,
        },
        {
            label: 'Date Action',
            render: (row) => moment(row.created_at).format('DD MMM YYYY HH:mm:SS'),
        }
    ]

    return (
        <div className="intro-y transition-all duration-500 group">
            <ModernTable
                datas={lists}
                items={items}
                metaData={meta}
                isLoading={isLoading}
                pageSize={pageSize}
                onPageChange={onPageChange}
                onChangeLimit={onChangeLimit}
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