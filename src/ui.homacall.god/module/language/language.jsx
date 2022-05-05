import React, { useState, useRef } from 'react';
import {Link} from 'react-router-dom'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import data from '../../service/fakeData/data';
import ActionBodyTemplate from './actionBody';

const Language = () => {

    const [globalFilter, setGlobalFilter] = useState(null);
    
    


    const dataL = data;




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
    const actionBodyTemplate = () => {
        return (
            <>
               <ActionBodyTemplate/>
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
                        value={dataL}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
                        globalFilter={globalFilter}
                        header={header}
                        responsiveLayout="scroll"
                        className='rtl'>
                        <Column field="title" header="عنوان" sortable className='text-sm w-60 text-center' ></Column>
                        <Column field="layout" header="نوع چیدمان" sortable  className='text-sm w-60 text-center'></Column>
                        <Column field="image" header="عملیات" body={actionBodyTemplate}></Column>
                    </DataTable>
                </div>
            </div>
    );
}

export default Language