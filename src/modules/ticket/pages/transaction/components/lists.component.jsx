import { ModernTable } from "ems-component";
import moment from "moment";

const ListComponent = ({
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
      label: 'ID',
      render: (row) => row.id
    },
    {
      label: 'First Name',
      render: (row) => row.participant?.first_name || '-'
    },
    {
      label: 'Last Name',
      render: (row) => row.participant?.last_name || '-'
    },
    {
      label: 'Ticket Name',
      render: (row) => row.product.detail_product.name
    },
    {
      label: 'Date Time',
      render: (row) => moment(row.transaction_date).format('DD-MM-YYYY HH:mm a')
    },
    {
      label: 'Phone No',
      render: (row) => row.participant?.phone_number || '-'
    },
    {
      label: 'Purchased by',
      render: (row) => row.order?.email || '-'
    }
  ]

  return (
    <div className="overflow-x-auto">
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

export default ListComponent