import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Toolbar } from 'primereact/toolbar'

import { Alert } from '../common/alert'
import TableActions from '../common/actionBody'
import { serverConnectionColumns } from './constant/tableColumn'
import { GetAllServerConnections, DeleteServerConnections } from '../../service/serverConnectionService'


export const ServerConnection = () => {
  const [serverConnectionData, setServerConnectionData ] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null)
  const [fetchAgain, setFetchAgain] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    GetAllServerConnections()
      .then(res => {
        if (res.data) setServerConnectionData(res.data)
      })
      .catch(e => console.log(e))
  }, [fetchAgain])

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to="/server-connection/create">
          <Button label="ثبت جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

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



const handleDelete = id => {
  const formData = new FormData()
  formData.append('ID', id)
  DeleteServerConnections(formData)
    .then(res => {
      setShowMessage(true)
      if (res.data || res.status === 200) {
        setMessage('حذف پایگاه داده با موفقیت انجام شد')
        fetchAgainHandler()
      } else {
        setMessage('خطا در حذف پایگاه داده ')
      }
    })
    .catch(err => console.log(err))
}


  return (
    <>
    

     <div className="w-[95%] mt-4 m-auto container"> 
      <div className="card">
      <Alert message={message} setMessage={setMessage} setShowMessage={setShowMessage} showMessage={showMessage} />
      <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
        <DataTable
          value={serverConnectionData}
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
          {serverConnectionColumns.map((col, index) => {
              return <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
           })
          }
          
          <Column
            field="image"
            header="عملیات"
            body={(data) => (
              <>
              <TableActions
                deleteAction={()=> {handleDelete(data.serConn_ID);} }
                hasDelete={true}
                hasUpdate={false}
                updateAction={() => { }}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                deleteButtonClassName={'p-button-danger ml-1 rtl p-1 mb-2'}
                updateButtonClassName={'p-button-warning ml-1 text-xs rtl p-1'}
              />
              <Link to={'/server-connection/edit/'+data.serConn_ID}><Button className='p-button-warning ml-1 rtl p-1 ml-2 mb-2'>ویرایش</Button></Link>
             </>
            )}
            
          ></Column>
        </DataTable>
      </div>
    </div>
    </>
  )
}
