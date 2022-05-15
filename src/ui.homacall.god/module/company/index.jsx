import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'

import TableActions from '../common/actionBody'
import { companyColumns } from './constant/tableColumn'
import PageToolbar from './constant/PageToolbar'
import { Alert } from '../common/alert'
import { GetAllLanguage } from '../../service/languageService'
import { GetAllCompanyInfo, DeleteCompany } from '../../service/companyService'


export const Company = () => {
  const [globalFilter, setGlobalFilter] = useState(null);
  const [companyInfo, setCompanyInfo] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')


  const fetchLanguage = () => {
    GetAllLanguage().then(res => {
      if (res.data || res.status === 200) {
        setLanguages(res.data.map(item => ({ id: item.lang_ID, name: item.lang_Name })))
      }
    })
  }

  useEffect(() => {
    fetchLanguage()
  }, [])

  useEffect(() => {
    GetAllCompanyInfo().then(res => {
      if (res.data || res.status === 200) {
        setCompanyInfo(res.data)
      }
    }).catch(err=> console.log("error: ", err))
  }, [fetchAgain])

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }

  const header = (
    <div className="table-header">
        <span className="p-input-icon-left">
            <i className="pi pi-search text-sm" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value) } placeholder="جستجو ..." className='h-10 text-sm' />
        </span>
    </div>
);

const handleDelete = compID => {
  const formData = new FormData()
  formData.append('ID', compID)
  DeleteCompany(formData)
    .then(res => {
      setShowMessage(true)
      if (res.data || res.status === 200) {
        setMessage('حذف شرکت با موفقیت انجام شد')
        fetchAgainHandler()
      } else {
        setMessage('خطا در حذف شرکت ')
      }
    })
    .catch(err => console.log(err))

}

  return (
    <>
     <div className="w-[95%] mt-4 m-auto container">
      <div className="card">
      
        <PageToolbar size={companyInfo.length} />
        <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />
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
          {companyColumns.map((col, index) => {
             if (col.field === 'CoIn_Logo') {
              return <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className} body={(rowData) => <img src={`/assets/img/`+rowData.coIn_Logo} alt="هماکال" />} />
             }else if(col.field === 'coIn_LangID'){
              return <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className} body={rowData => 
                languages.map((lang)=>{
                  if(lang.id === rowData.coIn_ID){
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
                deleteAction={() => { handleDelete(data.coIn_ID); }}
                hasDelete={true}
                hasUpdate={false}
                updateAction={() => {
                  alert(data.coIn_ID)
                }}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                deleteButtonClassName={'p-button-outlined p-button-danger  text-xs rtl h-10 w-25 py-1 px-3'}
                updateButtonClassName={'p-button-outlined p-button-warning mt-2  text-xs rtl h-10 w-25 py-1 px-3'}
              />
              <Link to={'/company/edit/'+data.coIn_ID}><Button  className='p-button-outlined p-button-warning mt-2  text-xs rtl h-10 w-25 py-1 px-3'>ویرایش</Button></Link>
             </>
            )}
            
          ></Column>
        </DataTable>
      </div>
    </div>
    </>
  )
}
