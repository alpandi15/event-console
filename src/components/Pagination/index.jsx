import React from 'react'
import classnames from 'clsx'
import { Console } from 'ems-component'
// import {Console} from '../../../../ems_component/dist/cjs'
import { usePagination, DOTS } from './hooks'
import clsx from 'clsx'
import styles from './Pagination.module.css'


const Pagination = (props) => {
  const {
    onPageChange,
    onChangeLimit,
    totalCount,
    siblingCount = 1,
    currentPage,
    totalPage,
    pageSize,
    className
  } = props

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  // console.log('PAGINATION RANGRE ', currentPage, totalCount, pageSize, paginationRange)
  // if (currentPage === 0 || paginationRange?.length < 2) {
  //   return null
  // }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  let lastPage = totalPage

  const totalCountTable = (((currentPage - 1) * pageSize) + pageSize)

  return (
    <div className={clsx(
      [
        "py-2 flex items-center justify-between col-span-12 intro-y sm:flex-row sm:flex-nowrap",
        className
      ])}>
      <div className="hidden text-sm md:!block text-slate-500">
        {`Showing ${((currentPage - 1) * pageSize) + 1} to ${totalCount > totalCountTable ? totalCountTable : totalCount} of ${totalCount} entries`}
      </div>
      <div className="flex items-center justify-end">
        {totalCount >= pageSize ? (
          <div>
            <Console.FormSelect value={pageSize} onChange={(e) => onChangeLimit(e?.target?.value)}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </Console.FormSelect>
          </div>
        ) : null}
        <div>
          <Console.Pagination className="w-full sm:w-auto sm:mr-auto">
            <Console.Pagination.Link
              onClick={onPrevious}
              className={classnames({ 'pointer-events-none text-gray-400': currentPage === 1 })}
            >
              <Console.Lucide icon="ChevronLeft" className="w-4 h-4" />
            </Console.Pagination.Link>
            {paginationRange.map((pageNumber) => {
              if (pageNumber === DOTS) {
                return (
                  <Console.Pagination.Link key={Math.random()}>...</Console.Pagination.Link>
                )
              }

              return (
                <Console.Pagination.Link
                  key={Math.random()}
                  onClick={() => onPageChange(pageNumber)}
                  active={pageNumber === currentPage}
                  className="text-sm text-slate-700 hover:bg-slate-100"
                >
                  {pageNumber}
                </Console.Pagination.Link>
              )
            })}
            <Console.Pagination.Link
              onClick={onNext}
              className={classnames({ 'pointer-events-none text-gray-400': currentPage === lastPage })}
            >
              <Console.Lucide icon="ChevronRight" className="w-4 h-4" />
            </Console.Pagination.Link>
          </Console.Pagination>
        </div>
      </div>
    </div>
  )
}

export default Pagination
