import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './column'
import './table.css'
import { GlobalFilter } from './globalFilter'
import { ColumnFilter } from './columnFilter'

export const Table = () => {
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
        defaultColumn
    }, useFilters, useGlobalFilter, useSortBy);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups, state, setGlobalFilter } = tableInstance;

    const { globalFilter } = state;

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
                        rows.map((row, i) => {
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
        </>
    )
}
