import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { UpdateRoll } from './components/updateRoll'

import TableActions from '../common/actionBody'
import { routeColumns } from './constant/tableColumn'

export const RouteStretcher = () => {
  const [rollName, setRollName] = useState('')
  const [globalFilter, setGlobalFilter] = useState(null)

  const dataL = [
    {
      id: 1,
      name: 'Admin',
    },
    {
      id: 2,
      name: 'Employee',
    },
  ]
  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/create-stretcher">
          <Button label="ثبت جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستوجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )

  return (
    <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
        <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>

        <DataTable
          value={dataL}
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          emptyMessage="رکوردی یافت نشد"
          globalFilter={globalFilter}
          header={header}
          paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
          responsiveLayout="scroll"
          className="rtl"
        >
          {routeColumns.map((col, index) => (
            <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
          ))}

          <Column
            field="image"
            header="عملیات"
            body={data => (
              <TableActions
                deleteAction={() => {
                  alert(data.id)
                }}
                hasDelete={true}
                hasUpdate={true}
                updateAction={() => {
                  alert(rollName + ' ' + data.id)
                }}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                updateView={<UpdateRoll rollName={rollName} setRollName={setRollName} oldVal={data.name} />}
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
