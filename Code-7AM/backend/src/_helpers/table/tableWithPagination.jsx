import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import { GlobalFilter } from './globalFilter'
import { ColumnFilter } from './columnFilter'

export const TableWithPagination = (props) => {
    const data = props.data;
    const columns = props.columns;

    const defaultColumn = useMemo(() => {
        return {
            Filter: props.columnFilter ? ColumnFilter : ""
        }
    }, []);

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
    }, useFilters, useGlobalFilter, useSortBy, usePagination);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups, state, setGlobalFilter,
        page, nextPage, previousPage, canPreviousPage, canNextPage, pageOptions,
        gotoPage, pageCount, setPageSize } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table  {...getTableProps()} className="table table-bordered" >
                <thead>
                    {headerGroups.map(headerGroups => (
                        <tr  {...headerGroups.getHeaderGroupProps()} >
                            {
                                headerGroups.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                        {column.render('Header')}
                                        <span>
                                            {
                                                column.isSorted ?
                                                    column.isSortedDesc
                                                        ? '🔽'
                                                        : '🔼'
                                                    : ''
                                            }
                                        </span>
                                        <div>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>
                                    </th>
                                ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {
                                        row.cells.map(cell => {
                                            return <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div className='row align-items-center justify-content-between'>
                <div className='col-auto'>
                <span className='float-start me-3 mt-2'>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>

                <span className='float-start'>
                    <label className='float-start me-2 mt-2'> {' '} |  go to Page{' '}</label>
                    <input type='number' className='form-control float-start me-2' defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;

                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }} />
                        <select className='form-control float-start w-auto ' value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                    {[10, 20, 30, 50].map((val) => {
                        return <option key={val} value={val} >Show {val}</option>
                    })}
                </select>

                </span>
                {' '}
                </div>
                <div className='col-auto'>
                
                <button className='btn btn-primary me-1 float-start'  onClick={() => previousPage()} disabled={!canPreviousPage} >Previous</button>
                <button className='btn btn-primary float-start' onClick={() => nextPage()} disabled={!canNextPage} >Next</button>
                </div>
            </div>
        </>
    )
}
