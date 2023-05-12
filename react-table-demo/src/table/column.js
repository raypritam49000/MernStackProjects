import { useMemo } from "react";
import { format } from 'date-fns'
import { ColumnFilter } from './columnFilter'

export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'id',
        Footer: 'Id',
        //Filter: ColumnFilter
    },
    {
        Header: 'Name',
        Footer: 'Name',
        columns: [
            {
                Header: 'First Name',
                accessor: 'first_name',
                Footer: 'First Name',
                Filter: ColumnFilter
            },
            {
                Header: 'Last Name',
                accessor: 'last_name',
                Footer: 'Last Name',
                //Filter: ColumnFilter
            }
        ]
    },
    {
        Header: 'Info',
        Footer: 'Info',
        columns: [
            {
                Header: 'Email',
                accessor: 'email',
                Footer: 'Email',
               // Filter: ColumnFilter
            },
            {
                Header: 'Fee',
                accessor: 'fee',
                Footer: Info => {
                    const total = useMemo(() => Info.rows.reduce((sum, row) => row.values.fee + sum, 0), [Info.rows])
                    return <>Total : {total}</>;
                },
               // Filter: ColumnFilter
            },
            {
                Header: 'DOB',
                accessor: 'dob',
                Footer: 'DOB',
                Cell: ({ value }) => { return format(new Date(value), 'dd-MM-yyyy') },
                //Filter: ColumnFilter,
                disableFilters : true
            }
        ]
    }
];


