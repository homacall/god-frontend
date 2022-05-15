import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import TableActions from '../common/actionBody'
import { tableColumns } from './constant/tableColumn'
import PageToolbar from './constant/PageToolbar'
import { getAllLanguages, getCompanyInfo, DeleteCompany } from './constant/Crud'

export const Company = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  
   //Get company info from database with api
   const companyInfo = getCompanyInfo();

   //Get all languages from database with api
   const languages = getAllLanguages();

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
          {tableColumns.map((col, index) => {
             if (col.field === 'logo') {
              return <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className} body={(rowData) => <img src={`/assets/img/`+rowData.logo} alt="هماکال" />} />
             }else if(col.field === 'language'){
              return <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className} body={rowData => 
                languages.map((lang)=>{
                  if(lang.id === rowData.language){
                     return lang.name
                  }
                  return null
                }
              )} />
             }else{
              return <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
             }
            
           })
          }
          
          <Column
            field="image"
            header="عملیات"
            body={(data) => (
              <>
              <TableActions
                deleteAction={() => { DeleteCompany(data.id); }}
                hasDelete={true}
                hasUpdate={false}
                updateAction={() => {
                  alert(data.id)
                }}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                deleteButtonClassName={'p-button-outlined p-button-danger  text-xs rtl h-10 w-25 py-1 px-3'}
                updateButtonClassName={'p-button-outlined p-button-warning mt-2  text-xs rtl h-10 w-25 py-1 px-3'}
              />
              <Link to={'/company/edit/'+data.id}><Button  className='p-button-outlined p-button-warning mt-2  text-xs rtl h-10 w-25 py-1 px-3'>ویرایش</Button></Link>
             </>
            )}
            
          ></Column>
        </DataTable>
      </div>
    </div>
    </>
  )
}
