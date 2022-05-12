import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import TableActions from '../../common/actionBody'
import UpdateDialog from './updateLanguage'
import { languageColumns } from '../constant/tableColumn';

const Language = ({ data }) => {

    const [globalFilter, setGlobalFilter] = useState(null);
    const [dataTable, setDataTable] = useState([])

    useEffect(() => {
        const newData = []
        data.forEach(item =>
            newData.push({
                ...item,
                action: (
                    <TableActions
                        deleteAction={() => { }}
                        hasDelete={true}
                        hasUpdate={true}
                        updateAction={() => {
                            alert('edit')
                        }}
                        updateView={<UpdateDialog {...item} />}
                        deleteButtonClassName={' p-button-danger ml-1 text-xs rtl  p-1'}
                        updateButtonClassName={' p-button-warning ml-1 text-xs rtl  p-1'}
                        deleteLabel="حذف"
                        updateLabel="ویرایش"
                        deleteIcon={false}
                        updateIcon={false}
                    >
                    </TableActions>
                ),
            }),
        )
        setDataTable(newData)
    }, [data])

    const rightToolbarTemplate = () => {
        return (
            <>
                <Link to='/language/new-form'>
                    <Button label="ثبت زبان جدید"
                        icon="pi pi-plus text-sm"
                        className='p-button ml-2 text-sm rtl h-10' />
                </Link>
            </>
        )
    }

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search text-sm" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="جستوجو ..." className='h-10 text-sm' />
            </span>
        </div>
    );

    return (
        <div className="w-[95%] mt-4 m-auto container">

            <div className="card">
                <Toolbar className="mb-4" right={rightToolbarTemplate} ></Toolbar>

                <DataTable
                    value={dataTable}
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                    className='rtl'>
                    {languageColumns.map((col, index) => {
                        return (
                            <Column
                                key={index}
                                field={col.field}
                                header={col.header}
                                sortable
                                className={` pb-2 ${col.className} ${col.field === 'action' ? 'w-[25%]' : ''}`}
                                style={{ padding: '10px' }}
                            ></Column>
                        )
                    })}
                </DataTable>
            </div>
        </div>
    );
}

export default Language