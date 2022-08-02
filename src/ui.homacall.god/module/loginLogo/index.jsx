import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Toolbar } from 'primereact/toolbar'
import { Image } from 'primereact/image'
import TableActions from '../common/actionBody'
import { ToastAlert } from '../common/toastAlert'
import { loginLogoColumn } from './constant/tableColumn'
import { loginLogo } from '../../utils/constants/routes/publicRoute'
import { GetAllLoginLogoBySP, DeleteLoginLogo } from '../../service/loginLogoService'

function LoginLogo() {
  const [fetchAgain, setFetchAgain] = useState(false)
  const [dataL, setDataL] = useState([])
  const [globalFilter, setGlobalFilter] = useState(null)

  const fetchAgainHandler = () => {
    setFetchAgain(perv => !perv)
  }

  useEffect(() => {
    GetAllLoginLogoBySP()
      .then(res => {
        const newData = []
        if (res.data && res.status === 200) {
          res.data.logosCompanys.forEach(comp =>
            newData.push({
              ...comp,
              logoCo_Name: (
                <Image
                  src={process.env.REACT_APP_GOD_FTP_SERVER + comp.logoCo_Name}
                  template="نمایش"
                  alt={comp.coIn_Name}
                  width={50}
                  height={50}
                  preview={true}
                  className="w-[50px] h-[50px] rounded-full"
                />
              ),
            }),
          )
          setDataL(newData)
        }
      })
      .catch(e => console.log(e))
  }, [fetchAgain])

  const rightToolbarTemplate = () => {
    return (
      <>
        <Link to={loginLogo.create}>
          <Button label="ثبت لوگو جدید" icon="pi pi-plus text-sm" className="p-button ml-2 text-sm rtl h-10" />
        </Link>
      </>
    )
  }

  const header = (
    <div className="table-header">
      <span className="p-input-icon-left">
        <i className="pi pi-search text-sm" />
        <InputText type="search" onInput={e => setGlobalFilter(e.target.value)} placeholder="جستجو ..." className="h-10 text-sm" />
      </span>
    </div>
  )

  const handleDeleteLoginLogo = loginLogoID => {
    const formData = new FormData()
    formData.append('ID', loginLogoID)
    DeleteLoginLogo(formData)
      .then(res => {
        if (res.data || res.status === 200) {
          ToastAlert.success('حذف  لوگو با موفقیت انجام شد')
          fetchAgainHandler()
        } else {
          ToastAlert.error('خطا در حذف لوگو  ')
        }
      })
      .catch(err => {
        console.log(err)
        ToastAlert.error('خطا در حذف لوگو  ')
      })
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
          emptyMessage="رکوردی یافت نشد"
          globalFilter={globalFilter}
          header={header}
          paginatorTemplate="NextPageLink LastPageLink PageLinks FirstPageLink PrevPageLink "
          responsiveLayout="scroll"
          className="rtl"
        >
          {loginLogoColumn.map((col, index) => (
            <Column field={col.field} header={col.header} sortable key={index} filterBy="#{data.name}" className={col.className}></Column>
          ))}

          <Column
            field="action"
            header="عملیات"
            body={data => (
              <TableActions
                deleteAction={() => {
                  handleDeleteLoginLogo(data.logoCo_ID)
                }}
                hasDelete={true}
                hasUpdate={false}
                deleteLabel="حذف"
                deleteButtonClassName={'p-button-danger ml-2 text-xs rtl h-10 w-25 p-1'}
              >
                <Link to={'/login-logo/edit/' + data.logoCo_ID}>
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

export default LoginLogo
