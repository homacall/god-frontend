import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'


import TableActions from '../common/actionBody'
import { tableColumns } from './constant/tableColumn'
import PageToolbar from './constant/PageToolbar'

export const Company = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  
  //Get Tags List from server with api
  const companyInfo = [
    // {
    //   id: 1,
    //   name: 'homacall',
    // },
    
  ]

  const header = (
    <div className="table-header">
        <span className="p-input-icon-left">
            <i className="pi pi-search text-sm" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value) } placeholder="جستجو ..." className='h-10 text-sm' />
        </span>
    </div>
);

  return (
    <>
     <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
      
        <PageToolbar size={companyInfo.length} />

        <DataTable
          value={companyInfo}
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
          {tableColumns.map((col, index) => (
            <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
            ))}
          
          <Column
            field="image"
            header="عملیات"
            body={(data) => (
              <>
              <TableActions
                deleteAction={() => { alert(data.id); }}
                hasDelete={true}
                hasUpdate={true}
                updateAction={() => {
                  alert(data.id)
                }}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                // updateView={<UpdateTag tagName={tagName} setTagName={setTagName} oldVal={data.title} />}
                deleteButtonClassName={'p-button-outlined p-button-danger  text-xs rtl h-10 w-25 py-1 px-3'}
                updateButtonClassName={'p-button-outlined p-button-warning mt-2  text-xs rtl h-10 w-25 py-1 px-3'}
              />
             </>
            )}
            
          ></Column>
        </DataTable>
      </div>
    </div>
    </>
  )
}
