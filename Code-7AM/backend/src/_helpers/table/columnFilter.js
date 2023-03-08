import React from 'react'

export const ColumnFilter = ({ column }) => {
    const { filter, setFilter } = column;

    return (
        <span>
            <input className='form-control' placeholder='Search' value={filter || undefined} onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
}