import React from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'
import { UpdateUser } from './components/updateUser'

import TableActions from '../common/actionBody'
import { userColumns } from './constant/tableColumn'
export const CreateUser = () => {
  const dataL = [
    {
      id: 1,
      title: 'فارسی',
      layout: 'راست به چپ',
    },
    {
      id: 2,
      number: 5,
      title: 'انگلیسی',
      layout: 'چپ به راست',
    },
  ]
  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/language/new-form">
          <Button label="ثبت کاربر جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }
  return (
    <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

        <DataTable
          value={dataL}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
          responsiveLayout="scroll"
          className="rtl"
        >
          {userColumns.map((col, index) => (
            <Column field={col.field} header={col.header} sortable className={col.className}></Column>
          ))}
          {/* <Column field="layout" header="نوع چیدمان" sortable className="text-sm w-60 text-center"></Column> */}
          <Column
            field="image"
            header="عملیات"
            body={() => (
              <TableActions
                deleteAction={() => {}}
                hasDelete={true}
                hasUpdate={true}
                updateAction={() => {
                  alert('edit')
                }}
                updateView={<UpdateUser />}
                deleteButtonClassName={'p-button-outlined p-button-danger ml-2 text-xs rtl h-10 w-25 p-1'}
                updateButtonClassName={'p-button-outlined p-button-warning text-xs rtl h-10 w-25 p-1'}
              />
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  )
}
