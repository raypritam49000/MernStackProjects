import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './column'
import './table.css'
import { GlobalFilter } from './globalFilter'
import { ColumnFilter } from './columnFilter'

export const TableWithPagination = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter
        }
    }, [])

    const tableInstance = useTable({
        columns,
        data,
        defaultColumn,
        //initialState: { pageIndex: 5 }
    }, useFilters, useGlobalFilter, useSortBy, usePagination);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups, state, setGlobalFilter,
        page, nextPage, previousPage, canPreviousPage, canNextPage, pageOptions,
        gotoPage, pageCount, setPageSize } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <table  {...getTableProps()} >
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
                <tfoot>
                    {
                        footerGroups.map(group => (
                            <tr {...group.getFooterGroupProps()}>
                                {
                                    group.headers.map(column => (
                                        <td {...column.getFooterProps()}>
                                            {column.render('Footer')}
                                        </td>
                                    ))}
                            </tr>
                        ))}
                </tfoot>
            </table>
            <div>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                </span>

                <span>
                    {' '} |  go to Page{' '}
                    <input type='number' defaultValue={pageIndex + 1}
                        onChange={(e) => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;

                            gotoPage(pageNumber)
                        }}
                        style={{ width: '50px' }} />
                </span>
                {' '}
                {/* <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                    {[10, 20, 30, 50].map((val) =>  (
                        <option key={val} value={val} >Show {val}</option>
                    ))}
                </select> */}

                <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                    {[10, 20, 30, 50].map((val) =>  {
                       return <option key={val} value={val} >Show {val}</option>
                    })}
                </select>

                <button onClick={() => previousPage()} disabled={!canPreviousPage} >Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage} >Next</button>
            </div>
        </>
    )
}
