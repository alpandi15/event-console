import { ModernTable } from 'ems-component'
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
            label: 'Survey Name',
            render: (row) => row.survey_name,
            class: 'whitespace-nowrap'
        },
        {
            label: 'Partcipants Email',
            render: (row) => row.participant_email
        },
        {
            label: 'First Name',
            render: (row) => row.fist_name,
        },
        {
            label: 'Last Name',
            render: (row) => row.last_name
        },
        {
            label: 'Responses',
            render: (row) => (
                <div className='flex flex-col gap-2'>
                    {row.responses.map((v, k) => (
                        <div className='flex flex-col' key={k}>
                            <span>{v.question}</span>
                            {typeof v.answer == 'object' ?
                                <div className='flex gap-2'>
                                    {v.answer.map((v2, k2) => (
                                        <span key={k2} className="font-semibold after:content-[','] last-of-type:after:content-none">{v2}</span>
                                    ))}
                                </div> :
                                <span className='font-semibold'>{v.answer}</span>
                            }
                        </div>
                    ))}
                </div>
            ),
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