//  let columns = [
//             {
//                 Header: 'Name',
//                 accessor: 'name'
//             },
//             {
//                 Header: 'Created Date',
//                 accessor: 'createdOn',
//                 disableFilters : true
//             }
//         ];


import Swal from 'sweetalert2'

const Captilize = (colName) => {
    return colName.charAt(0).toUpperCase() + colName.slice(1);
}

const getColumns = (tableColumns, isAction, editRow, deleteRow) => {
    let columns = [];
    let colName = "";

    for (let key of tableColumns) {
        if (key === 'createdOn') {
            colName = 'Created Date';
        } else if (key === 'isSave') {
            colName = 'Discount Value';
        } else if (key === 'imagePath') {
            colName = 'Image';
        } else {
            colName = key;
        }

        if (key === 'imagePath') {
            columns.push({
                Header: <b>{Captilize(colName)}</b>,
                accessor: key,
                disableFilters: true,
                Cell: (cell) => {
                    return <img alt='image' src={cell.row.original.imagePath} style={{ width: 50, height: 50 }} />
                },
                sortable: false
            });
        } else if (key === 'orderStatus'  || key === 'paymentStatus' ) {
            columns.push({
                Header: <b>{Captilize(colName)}</b>,
                accessor: key,
                Cell: (cell) => {
                    return <div dangerouslySetInnerHTML={{__html : cell.row.original[key]}} ></div>
                },
                sortable: false
            });
        }  else {
            columns.push({
                Header: <b>{Captilize(colName)}</b>,
                accessor: key
            });
        }
    }

    if (isAction) {
        columns.push({
            Header: <b>Actions</b>,
            accessor: 'actions',
            disableFilters: true,
            Cell: (cell) => {
                return (
                    <div>
                        <span onClick={() => {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: 'You will not be able to recover this record!',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonText: 'Yes, delete it!',
                                cancelButtonText: 'No, keep it'
                            }).then((result) => {
                                if (result.value) {
                                    deleteRow(cell.row.original.id)
                                    Swal.fire(
                                        'Deleted!',
                                        'Your record has been deleted.',
                                        'success'
                                    )
                                } else if (result.dismiss === Swal.DismissReason.cancel) {
                                    Swal.fire(
                                        'Cancelled',
                                        'Your record is safe :)',
                                        'error'
                                    )
                                }
                            }
                            )
                        }}>
                            <i className="fa fa-trash-o" style={{ width: 35, color: 'red' }} ></i>
                        </span>
                        <span onClick={() => {
                            editRow(cell.row.original)
                        }}>
                            <i className="fa fa-edit" style={{ width: 35, color: 'green' }} ></i>
                        </span>
                    </div>
                )
            }
        });
    }

    return columns;
}

export default getColumns;