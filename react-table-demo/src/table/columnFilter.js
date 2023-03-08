import React from 'react'

export const ColumnFilter = ({ column }) => {
    const { filter, setFilter } = column;

    return (
        <span>
            Search : {''}
            <input value={filter || undefined} onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
}