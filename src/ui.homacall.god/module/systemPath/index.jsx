import { useEffect, useState } from 'react'
import { systemPath } from '../../utils/constants/routes/publicRoute'
import { Link, useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import TableActions from '../common/actionBody'
import { ToastAlert } from '../common/toastAlert'
import { serviceTypeColumn } from './constant/tableColumn'
import { GetAllSystemPath, DeleteSystemPath } from '../../service/systemPathService'

function SystemPath() {
  const [fetchAgain, setFetchAgain] = useState(false)
  const [dataL, setDataL] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null)
  const navigate = useNavigate()

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }
  useEffect(() => {
    GetAllSystemPath()
      .then(res => {
        if (res.data) setDataL(res.data)
      })
      .catch(e => ToastAlert.error('خطا در  ارتباط با سرور '))
  }, [fetchAgain])

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to={systemPath.create}>
          <Button label="ثبت مسیر جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const deleteSystemPath = systemID => {
    const formData = new FormData()
    formData.append('ID', systemID)
    DeleteSystemPath(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('حذف سیستم با موفقیت انجام شد')
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در حذف سیستم ')
        }
      })
      .catch(err => {
        console.log(err)
        ToastAlert.error('خطا در حذف سیستم ')
      })
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
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
          {serviceTypeColumn.map((col, index) => (
            <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
          ))}

          <Column
            field="action"
            header="عملیات"
            body={data => (
              <TableActions
                deleteAction={() => {
                  deleteSystemPath(data.sys_ID)
                }}
                hasDelete={true}
                hasUpdate={false}
                updateView={false}
                updateAction={() => {
                  navigate(systemPath.edit.concat(data.sys_ID))
                }}
                deleteLabel="حذف"
                updateLabel="ویرایش"
                deleteButtonClassName={'p-button-danger ml-2 text-xs rtl h-10 w-25 p-1'}
                updateButtonClassName={'p-button-warning text-xs rtl h-10 w-25 p-1'}
              >
                <Link to={'/systems-path/edit/' + data.sys_ID}>
                  <Button className="p-button-warning ml-2 rtl text-xs  h-10 w-25 p-1">ویرایش</Button>
                </Link>
              </TableActions>
            )}
          ></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default SystemPath
