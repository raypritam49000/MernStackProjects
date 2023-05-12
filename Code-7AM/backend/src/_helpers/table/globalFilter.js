import React from 'react'

export const GlobalFilter = ({ filter, setFilter }) => {
    return (
        <div className='row align-items-center justify-content-end mb-4 pe-3'>
           <label className='float-start col-auto'> Search : {''}</label>
            <input className='form-control col-auto w-auto' value={filter || undefined} onChange={(e) => setFilter(e.target.value)} />
        </div>
    )
}